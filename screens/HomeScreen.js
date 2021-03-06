import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import NowPlaying from "../components/NowPlaying";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";

export default function SongScreen() {
  return (
  <View style={styles.container}>
    <LinearGradient colors={[Colors.PrimaryGradientStart, Colors.PrimaryGradientEnd]}
    start={[0,0]} end={[1,1]} style={{flex:1}}/>
    <NowPlaying/>

  </View>
);
}

SongScreen.navigationOptions = {
  header: null,
};

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }

});