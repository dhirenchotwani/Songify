import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import {MaterialIcons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";
import * as GlobalStyles from "../styles";
import SearchScreen from "../screens/SearchScreen";


export default class NowPlaying extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <LinearGradient colors={[Colors.accentGradientStart, Colors.accentGradientEnd]}
                            start={[0, 0]}
                            end={[1, 1]}>


                {/*ProgressBar*/}
                <TouchableWithoutFeedback onPress={this.nowPlayingClicked.bind(this)} >
                    <View style={styles.nowPlayingContainer}>
                        <View style={[styles.progressBar, {width: responsiveWidth((this.props.currentPosition))}]}/>
                        {/*end of progress bar*/}

                        <View style={styles.controlContainer}>
                            <View style={GlobalStyles.styles.songContainer}>
                                <Image
                                    source={{uri: this.props.song.thumbnail}}
                                    style={GlobalStyles.styles.albumArt}/>
                                <View style={GlobalStyles.styles.infoContainer}>
                                    <Text style={[GlobalStyles.styles.songTitle, {color: Colors.headingColor}]}>{this.props.song.title}</Text>
                                    <Text style={GlobalStyles.styles.albumText}>{this.props.song.album} - {this.props.song.artist}</Text>
                                </View>
                            </View>
                            {/*<MaterialIcons name={'play-arrow'} color={Colors.headingColor} size={responsiveFontSize(6)}/>*/}
                            <TouchableOpacity onPress={()=>this.props.onToggle()}>
                                {this.renderPlayButton()}
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>




            </LinearGradient>
        );


    }



    nowPlayingClicked(){
        this.props.navigation.navigate("NowPlaying");
    }


    renderPlayButton(){
        if(this.props.isPaused){
            return(
                <MaterialIcons name={'play-arrow'} color={Colors.headingColor} size={responsiveFontSize(6)}/>
            );
        }
        return (
            <MaterialIcons name={'pause'} color={Colors.headingColor} size={responsiveFontSize(6)}/>
        );
    }
}




const styles = StyleSheet.create({
    nowPlayingContainer:{
        height: responsiveHeight(10),
    },
    progressBar:{
        height: responsiveHeight(0.7),
        backgroundColor: Colors.headingColor,
        borderRadius: responsiveWidth(1)
    },
    controlContainer:{
        flex:1,
        alignSelf:'stretch',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:responsiveWidth(6),
        alignItems:'center'
    },
    songContainer:{
        // alignSelf:'stretch',
        // alignItems:'center'
        flexDirection: 'row'
    },
    albumArt:{
        width:responsiveWidth(7),
        height:responsiveHeight(7),
        borderRadius: responsiveHeight(1),
        marginRight:responsiveWidth(5)
    },
    infoContainer:{
        justifyContent: 'center'
    },
    songTitle:{
        fontFamily:'fira-regular',
        color:Colors.headingColor,
        fontSize: responsiveFontSize(2.3),
        marginBottom:responsiveHeight(0.3),
    },
    albumText:{
        fontFamily:'fira-regular',
        color: Colors.geryColor,
        fontSize: responsiveFontSize(1.7)
    }

});
