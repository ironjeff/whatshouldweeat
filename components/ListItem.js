const styles = require('../styles.js')

import React, { Component } from 'react';
import {
	View, 
	TouchableHighlight, 
	Text 
} from 'react-native';

class ListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
