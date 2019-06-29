import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Icons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import * as Font from "expo-font";
import Colors from "./constants/Colors";
import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import {LinearGradient} from "expo-linear-gradient";
import {Audio} from "expo-av";
import SONGS_LIST from "./services/mock/songs";
import {getAllSongs} from "./services/SongService";

export default class App extends React.Component{
    constructor(props){
      super(props);

      const sound = new Audio.Sound();
      this.state={
        fontLoaded: false,
        isPaused: false,
        sound:sound,
          songs:[],
          duration:0,
          position:0,
          currentSong:{},
          // currentSong:SONGS_LIST[0],
          isSongLoading:false,
      };
    }

    async componentWillMount(){
     await Font.loadAsync({
       'fira-regular':require("./assets/fonts/Fira_Sans/FiraSans-Regular.ttf"),
        'fira-semibold' :require("./assets/fonts/Fira_Sans/FiraSans-SemiBold.ttf")
     });
     let songs = await getAllSongs();
     this.setState({
       fontLoaded:true,
         songs:songs
     });
    }

    async componentDidMount(){
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true
        });
        this.state.sound.setOnPlaybackStatusUpdate(this.updatePosition.bind(this));
    }

    render(){
        console.log(Object.keys(this.state.currentSong).length !== 0);
        console.log("render called");
      if(this.state.fontLoaded){
        return(
            <LinearGradient colors={[Colors.PrimaryGradientStart, Colors.PrimaryGradientEnd]}
                            start={[0,0]}
                            end={[1,1]}
                            style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
                <AppNavigator screenProps={{
                    currentSong: this.state.currentSong,
                    isSongActive: (item)=>this.isSongActive(item),
                    isSongSelected: ()=>this.isSongSelected(),
                    playSong: async (song) => this.playSong(song),
                    previousSong: () => this.previousSong(),
                    nextSong: () => this.nextSong(),
                    duration: this.state.duration,
                    position: this.state.position,
                    seek: (positionInPercentage) => this.seek(positionInPercentage),
                    togglePause: async ()=>this.togglePause(),
                    isPaused: this.state.isPaused,

                }}/>
            </LinearGradient>


        );
      }
      return null;
    }

    isSongActive(item){
        return (this.isSongSelected() && this.state.currentSong.id === item.id);
    }

    isSongSelected(){
        return (Object.keys(this.state.currentSong).length !== 0);
    }


    async playSong(song){

        // console.log(typeof this.state.currentSong);
        let songLoaded = Object.keys(this.state.currentSong).length !== 0;
        if(!this.state.isSongLoading &&
            (!songLoaded || this.state.currentSong.id !== song.id)){
            this.setState({
                isSongLoading: true
            });

            if(songLoaded){
                await this.state.sound.unloadAsync();
            }
            console.log("Loading song");
            await this.state.sound.loadAsync({uri:song.location},{}, false);
            console.log("Playing song");
            await this.state.sound.playAsync();
            this.setState({
                currentSong: song,
                isSongLoading: false,
                isPauses: false
            });
        }
    }

    nextSong(){
        if(this.isSongSelected()){
            let currentIndex = this.indexOfSong(this.state.currentSong);
            let nextSong = this.state.songs[(currentIndex+1)%this.state.songs.length];
            this.playSong(nextSong);
        }
    }

    previousSong(){
        if(this.isSongSelected()){
            let currentIndex = this.indexOfSong(this.state.currentSong);
            let nextSong = this.state.songs[(currentIndex-1)%this.state.songs.length];
            this.playSong(nextSong);
        }
    }

    async togglePause(){
        console.log("TogglePause called");
        if(this.state.currentSong){
            console.log("Going to pause current song: "+this.state.currentSong);
            let isPaused = !this.state.isPaused;
            if(isPaused){
                console.log("Pausing song");
                await this.state.sound.pauseAsync();
                console.log("Paused");
            }else{
                console.log("Playing song");
                await this.state.sound.playAsync();
                console.log("Played");
            }
            this.setState({
                isPaused: isPaused
            });
        }
    }

    indexOfSong(song){
        for(let i=0;i<this.state.songs.length;i++){
            if(song.id === this.state.songs[i].id)
                return i
        }
        return -1;
    }

    seek(positionInPercentage){
        let positionInMillis = (positionInPercentage * this.state.duration) / 100;
        this.state.sound.setPositionAsync(positionInMillis);
        this.setState({
            positionInMillis: positionInPercentage
        });
    }

    updatePosition({durationMillis, positionMillis}){
        if((typeof durationMillis !== 'undefined' && (typeof positionMillis !== 'undefined'))){
            let positionInPercentage = (positionMillis/durationMillis)*100;
            console.log(`Duration in millis: ${durationMillis}, position : ${positionInPercentage}, position in millis`);
            this.setState({
                duration: durationMillis,
                position: positionInPercentage
            })
        }
    }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     paddingTop: responsiveHeight(4)
  },
});
