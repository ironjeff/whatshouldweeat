import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27

const RecipeList = require('./components/RecipeList');
const Restaurant = require('./components/Restaurant');
const Recipe = require('./components/Recipe');
const RestaurantList = require('./components/RestaurantList');
const RestaurantListTODO = require('./components/RestaurantListTODO');
const TODOList = require('./components/TODOList');
const MealTypeSelector = require('./components/MealTypeSelector');
const styles = require('./styles.js');

const RootStack = StackNavigator(
  {
    MealTypeSelector: {
      screen: MealTypeSelector,
    },
    RecipeList: {
      screen: RecipeList,
    },
    RestaurantList: {
      screen: RestaurantList,
    },
    RestaurantListTODO: {
      screen: RestaurantListTODO,
    },
    Restaurant: {
      screen: Restaurant,
    },
    Recipe: {
      screen: Recipe,
    },
  },
  {
    initialRouteName: 'MealTypeSelector',
  }
);

export default class App extends React.Component {
  render() {
    console.log("hello");
    return (
      <SafeAreaView style={styles.container}>
        <RootStack />
      </SafeAreaView>
    );
  }
}
