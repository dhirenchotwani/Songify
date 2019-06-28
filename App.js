import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Icons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import {responsiveHeight} from "react-native-responsive-dimensions";
import {LinearGradient} from "expo-linear-gradient";

//Colors
import Colors from "./constants/Colors";

//Font
import * as Font from "expo-font";

export default class App extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fontLoaded: false
      };
    }

    async componentWillMount(){
     await Font.loadAsync({
       'fira-regular':require("./assets/fonts/Fira_Sans/FiraSans-Regular.ttf"),
        'fira-semibold' :require("./assets/fonts/Fira_Sans/FiraSans-SemiBold.ttf")
     });
     this.setState({
       fontLoaded:true
     });
    }

    render(){
      if(this.state.fontLoaded){
        return(
            <LinearGradient colors={[Colors.PrimaryGradientStart, Colors.PrimaryGradientEnd]}
                            start={[0,0]}
                            end={[1,1]}
                            style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
                <AppNavigator/>
            </LinearGradient>


        );
      }
      return null;
    }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     paddingTop: responsiveHeight(4)
  },
});
