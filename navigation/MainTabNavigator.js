import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SongsScreen from '../screens/SongsScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import {MaterialIcons} from "@expo/vector-icons";
import NowPlayingScreen from "../screens/NowPlayingScreen"

import Colors from "../constants/Colors";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: SongsScreen,
    NowPlaying : NowPlayingScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarIcon:({focused})=>(
      <MaterialIcons name={'music-note'} size={responsiveFontSize(4)} color={Colors.accentColor}/>
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: SearchScreen,
    NowPlaying: NowPlayingScreen
  },
  config
);

LinksStack.navigationOptions = {
    tabBarIcon:({focused})=>(
        <MaterialIcons name={'search'} size={responsiveFontSize(4)} color={Colors.accentColor}/>
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
    tabBarIcon:({focused})=>(
        <MaterialIcons name={'person'} size={responsiveFontSize(4)} color={Colors.accentColor}/>
    ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
},{
    tabBarOptions:{
      showLabel: false,
      style:{
          backgroundColor:Colors.primaryColor,
          height: responsiveHeight(10)
      },
    },
});

tabNavigator.path = '';

export default tabNavigator;

