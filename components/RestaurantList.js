'use strict';

const RestaurantListBase = require('./RestaurantListBase');
const styles = require('../styles.js')

import React, { Component } from 'react';

class RestaurantList extends RestaurantListBase {

  getFireBaseTableName() {
    return 'restaurants';
  }

}
module.exports = RestaurantList;
