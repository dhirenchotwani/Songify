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
    FlatList
} from 'react-native';

import {Audio} from "expo-av";

import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";

import NowPlaying from "../components/NowPlaying";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";

import {getAllSongs} from "../services/SongService";

import SongItem from "../components/SongItem";
import RoundedButton from "../components/RoundedButton"
import {MaterialIcons} from "@expo/vector-icons";

export default class SongsScreen extends Component{
    constructor(props){
        super(props);
        const sound = new Audio.Sound();
        this.state={
            songs:[],
            isPaused: false,
            sound: sound,
            currentSong: undefined,
            isSongLoading: false,
        };
    }

    async componentWillMount(){
        let songs = await getAllSongs();
        console.log("Songs : "+JSON.stringify(songs));
        this.setState({
            songs:songs
        });
    }

    async componentDidMount() {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true
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
                              renderItem={({item})=> <SongItem song={item}
                                                               isActive={this.isSongActive(item)}
                                                               songClicked={this.playSong.bind(this)}/>}/>
                </LinearGradient>
                { typeof this.state.currentSong!== 'undefined' ? <NowPlaying isPaused={this.state.isPaused}
                                                                             song={this.state.currentSong}
                                                                             onToggle={this.togglePause.bind(this)}/>
                    : null}
            </View>
        );
    }


    isSongActive(item){
        return (this.isSongSelected() && this.state.currentSong.id === item.id)
    }


    isSongSelected(item){
        return (typeof this.state.currentSong !== 'undefined');
    }

    async playSong(song){

        console.log(typeof this.state.currentSong);
        let songLoaded = (typeof this.state.currentSong) !== 'undefined';
        if(!this.state.isSongLoading &&
            (!songLoaded || this.state.currentSong.id !== song.id)){
            this.setState({
                isSongLoading: true,

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
                isPaused:false
            });
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
