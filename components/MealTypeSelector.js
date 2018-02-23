'use strict';

const RecipeList = require('./RecipeList');
const RestaurantList = require('./RestaurantList');
const RestaurantListTODO = require('./RestaurantListTODO');
const styles = require('../styles.js');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  TabBarIOS,
} from 'react-native';

import { NavigationBar } from 'react-navigation'; // 1.0.0-beta.27
import { 
	Divider,
	ImageBackground,
	ListView,
	Tile,
	Title,
	Subtitle,
 } from '@shoutem/ui';


class MealTypeSelector extends React.Component {
  static navigationOptions = {
    title: 'What Should We Eat?',
  };

  constructor(props) {
    super(props);
	this.renderRow = this.renderRow.bind(this);

    this.state = {
      eatOptions: [
      	{
      		"name": "Eat In",
      		"subtitle": "Dishes you can make",
	        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
	        "navKey": "RecipeList",
      	},
      	{
      		"name": "Favorite Restaurants",
      		"subtitle": "Your go-to restaurants",
  	        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
	        "navKey": "RestaurantList",
      	},
      	{
      		"name": "Try a new place",
      		"subtitle": "Restaurants you want to try",
	        "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
	        "navKey": "RestaurantListTODO",
      	},
      ],
    };
  }

renderRow(eatOption) {
  return (
    <TouchableHighlight
    	onPress={() => this.props.navigation.navigate(eatOption.navKey)}
    >
    <View>
      <ImageBackground
        styleName="large-banner"
        source={{ uri: eatOption.image.url }}
      >
        <Tile>
          <Title styleName="md-gutter-bottom">{eatOption.name}</Title>
          <Subtitle styleName="sm-gutter-horizontal">{eatOption.subtitle}</Subtitle>
        </Tile>
      </ImageBackground>
      <Divider styleName="line" />
     </View>
    </TouchableHighlight>
  );
}

  render() {
    return (
	    <View>
	      <ListView
	        data={this.state.eatOptions}
	        renderRow={this.renderRow}
	      />
	    </View>
    )
  }

}
module.exports = MealTypeSelector;
