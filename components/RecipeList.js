'use strict';

const ActionButton = require('./ActionButton');
const ListItem = require('./ListItem');
const styles = require('../styles.js');
import firebase from 'firebase';

import React, { Component } from 'react';
import {
  AlertIOS,
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBcVopEV5dP0BEAksLUvF40Wu8oEuPP448",
  authDomain: "dazzling-heat-3503.firebaseapp.com",
  databaseURL: "https://dazzling-heat-3503.firebaseio.com",
  projectId: "dazzling-heat-3503",
  storageBucket: "dazzling-heat-3503.appspot.com",
  messagingSenderId: "940507740977"
};

class RecipeList extends React.Component {

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
    this.recipesRef = this.getRef().child('recipes');
  }


  getRef() {
    return this.firebaseApp.database().ref();
  }

  listenForRecipes(recipesRef) {
    recipesRef.on('value', (snap) => {

      // get children as an array
      var recipes = [];
      snap.forEach((child) => {
        recipes.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(recipes)
      });

    });
  }

  componentDidMount() {
    this.listenForRecipes(this.recipesRef);
  }

  render() {

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}
        />

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />
      </View>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Name of Meal',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.recipesRef.push({ title: text })
          }
        },
        {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      this.props.navigation.navigate('Recipe', {recipe: item});
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}
module.exports = RecipeList;
