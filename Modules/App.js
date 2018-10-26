/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AboutScreen from '../Modules/Screens/About'
import RandomNumberScreen from '../Modules/Screens/RandomNumber';

export default createStackNavigator({
  Home: AboutScreen,
  RandomNumber: RandomNumberScreen,
});