import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {MaterialIcons} from "@expo/vector-icons";

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {responsiveFontSize, responsiveHeight} from "react-native-responsive-dimensions";
import Colors from "../constants/Colors";
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
   <MaterialIcons name={'music-note'} size={responsiveFontSize(5)} color={Colors.accentColor}/>
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
      <MaterialIcons name={'search'} size={responsiveFontSize(5)} color={Colors.accentColor}/>
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
      <MaterialIcons name={'person'} size={responsiveFontSize(5)} color={Colors.accentColor}/>
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
},{
 tabBarOptions:{
     showLabel:false,
     style:{
         backgroundColor:Colors.primaryColor,
         height:responsiveHeight(10),

     },
 }
});

tabNavigator.path = '';

export default tabNavigator;

