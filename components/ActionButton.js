'use strict';

const styles = require('../styles.js')
const constants = styles.constants;

import React, { Component } from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TouchableHighlight
} from 'react-native';

class ActionButton extends React.Component {
  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.props.onPress}>
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = ActionButton;
