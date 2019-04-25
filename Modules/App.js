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

import SplashScreen from '../Modules/Screens/SplashScreen';
import MegaMillion from '../Modules/Screens/MegaMillion';
import HomeScreen from '../Modules/Screens/HomeScreen';
import RandomList from '../Modules/Screens/RandomList';
import NormalDistribution from '../Modules/Screens/NormalDistribution';
import AddNewList from '../Modules/Screens/AddNewList'
import List from '../Modules/Screens/List'
export default createStackNavigator({
  Splash : SplashScreen,
  HomeScreen:HomeScreen,
  About: AboutScreen,
  NormalDistribution:NormalDistribution,
  RandomNumber: RandomNumberScreen,
  MegaMillion:MegaMillion,
  RandomList:RandomList,
  AddNewList:AddNewList,
  List: List
});
