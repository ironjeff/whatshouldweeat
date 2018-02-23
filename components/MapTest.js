'use strict';

const Firebase = require('firebase');
const StatusBar = require('./StatusBar');
const ActionButton = require('./ActionButton');
const ListItem = require('./ListItem');
const styles = require('../styles.js')

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  MapView,
} from 'react-native';


var _watchID = undefined;
var _lastTimeWritten = 0;
const WriteIntervalMS = 10000;

const FirebaseUrl = 'https://dazzling-heat-3503.firebaseio.com/';

class MapTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      mapRegionInput: undefined,
      annotations: [],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
    this.itemsRef = this.getRef().child('locations');
  }

  getRef() {
    return new Firebase(FirebaseUrl);
  }

  componentDidMount() {
    this._onRegionChange.bind(this);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(_watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Map" />
        <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange.bind(this)}
          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          showsUserLocation={true}
          followUserLocation={true}
        />
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    )
  }

  _getAnnotations(region) {
    return {
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    };
  }

  shouldWritePosition(timestamp) {
    return timestamp - _lastTimeWritten > WriteIntervalMS;
  }

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        var timestamp = position['timestamp'];
        if (this.shouldWritePosition(timestamp)) {
          this.itemsRef.push(
            { time: timestamp, lat: position['coords']['latitude'], long: position['coords']['longitude']}
          );
          _lastTimeWritten = timestamp;
        }
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    _watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });

  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        //annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      //annotations: this._getAnnotations(region),
    });
  }


}
module.exports = MapTest;
