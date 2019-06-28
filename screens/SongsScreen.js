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
import {LinearGradient} from "expo-linear-gradient";
import {Audio} from "expo-av";
import {FlatList} from "react-navigation";

//Created Components
import SongItem from "../components/SongItem";
import RoundedButton from "../components/RoundedButton";
import NowPlaying from "../components/NowPlaying";

//Icons
import {MaterialIcons} from "@expo/vector-icons";

//Services
import {getAllSongs} from "../services/SongService";

//Constants
import Colors from "../constants/Colors";

export default class SongsScreen extends Component{
    constructor(props){
      super(props);
      const sound= new Audio.Sound();
      this.state={
        songs:[],
          isPaused:false,
          sound:sound,
          currentSong:undefined,
          isSongLoading:false,
      };
    }

    async componentWillMount(){
      let songs = await getAllSongs();
      //console.log("Songs : "+JSON.stringify(songs));
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
                      //Multiple songs hai ya renderSongs bana usko  bind kar iske sath ya yeh method use kar JSX wala!
                      renderItem={({item})=> <SongItem song={item} songClicked={this.playSong.bind(this)}/>}/>
            </LinearGradient>
              {typeof this.state.currentSong!=='undefined' ? <NowPlaying isPaused={this.state.isPaused}
                                                                            song={this.state.currentSong}
                                                                            onToggle={this.togglePause.bind(this)}/>
                                                                        :null}

          </View>
      );
    }
    async playSong(song){
        console.log(typeof this.state.currentSong);
        let songLoaded=(typeof this.state.currentSong) !=="undefined";
        if(!this.state.isSongLoading &&
            (!songLoaded || this.state.currentSong.id !== song.id)){
            console.log("im here ");
            this.setState({
                isSongLoading:true
            });

            if(songLoaded){
                await this.state.sound.unloadAsync();
            }
            console.log("Loading song");
            await this.state.sound.loadAsync({uri:song.location}, {},false);
            console.log("Playing song");
            await this.state.sound.playAsync();
            this.setState({
                currentSong:song,
                isSongLoading:false
            });
        }
    }

    async togglePause(){
        console.log("TogglePause called");
        if(this.state.currentSong){
            console.log("Going to pause current song: " + this.state.currentSong);
            let isPaused = !this.state.isPaused;
            if(isPaused){
                console.log("Pausing song");
                await this.state.sound.pauseAsync();
                console.log("Paused");
            }
            else{
                console.log("Playing song");
                await this.state.sound.playAsync();
                console.log("Played");
            }
            this.setState({
                isPaused: isPaused
            });
        }
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
