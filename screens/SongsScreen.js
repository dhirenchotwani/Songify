import * as WebBrowser from 'expo-web-browser';
import React,{Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";

import NowPlaying from "../components/NowPlaying";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";

import {getAllSongs} from "../services/SongService";
import {FlatList} from "react-navigation";
import SongItem from "../components/SongItem";
import RoundedButton from "../components/RoundedButton"
import {MaterialIcons} from "@expo/vector-icons";

export default class SongsScreen extends Component{
    constructor(props){
      super(props);
      this.state={
        songs:[]
      };
    }

    async componentWillMount(){
      let songs = await getAllSongs();
      console.log("Songs : "+JSON.stringify(songs));
      this.setState({
        songs:songs
      });
    }


    render(){
      return(
          <View style={styles.container}>
            <LinearGradient colors={[Colors.PrimaryGradientStart, Colors.PrimaryGradientEnd]}
                            start={[0,0]}
                            end={[1,1]}
                            style={{flex:1}}>

                     <View style={styles.buttonGroup}>
                       <RoundedButton icon={<MaterialIcons name={'play-arrow'} size={responsiveFontSize(3)} color={'#fff'}/>}
                                      onPress={()=>console.log("Play Songs")}
                                      title={"Play All"}/>

                       <RoundedButton icon={<MaterialIcons name={'shuffle'} size={responsiveFontSize(3)} color={'#fff'}/>}
                                      onPress={()=>console.log("Play Songs")}
                                      title={"Shuffle"}/>
                     </View>
            <FlatList data={this.state.songs}
                      style={{flex:1}}
                      keyExtractor={(data)=>data.id+""}
                      renderItem={({item})=> <SongItem song={item}/>}/>
            </LinearGradient>
            <NowPlaying/>
          </View>
      );
    }

}

SongsScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonGroup:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    paddingVertical: responsiveHeight(2)
  }

});
