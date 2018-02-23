'use strict';

const RestaurantListBase = require('./RestaurantListBase');

const styles = require('../styles.js')

import React, { Component } from 'react';

class RestaurantListTODO extends RestaurantListBase {

  getFireBaseTableName() {
    return 'restaurants_to_try';
  }

}
module.exports = RestaurantListTODO;
