'use strict';

const ActionButton = require('./ActionButton');
const ListItem = require('./ListItem');
const styles = require('../styles.js')
import firebase from 'firebase';

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBcVopEV5dP0BEAksLUvF40Wu8oEuPP448",
  authDomain: "dazzling-heat-3503.firebaseapp.com",
  databaseURL: "https://dazzling-heat-3503.firebaseio.com",
  projectId: "dazzling-heat-3503",
  storageBucket: "dazzling-heat-3503.appspot.com",
  messagingSenderId: "940507740977"
};

class RestaurantListBase extends React.Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
        this.firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      this.firebaseApp = firebase.apps[0];
    }
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    var tableName = this.getFireBaseTableName();
    this.itemsRef = this.getRef().child(tableName);
    this.completedItemsRef = this.getRef().child('complete');
  }

  getRef() {
    return this.firebaseApp.database().ref();
  }

  getFireBaseTableName() {}

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />
      </View>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Restaurant Name',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
        {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      this.props.navigation.navigate('Restaurant', {restaurant: item});
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}
module.exports = RestaurantListBase;
