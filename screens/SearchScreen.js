import React from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import {responsiveHeight, responsiveWidth, responsiveFontSize} from "react-native-responsive-dimensions";
import {MaterialIcons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import Colors from "../constants/Colors";
import * as GlobalStyles from "../styles";

import {filterSong} from "../services/SongService";
import  SongItem from "../components/SongItem";
import NowPlaying from "../components/NowPlaying";

export default class SearchScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      term: "",
      songs: []
    };
  }

  render(){
    return (
        <View style={GlobalStyles.styles.container}>
          <LinearGradient colors={[Colors.PrimaryGradientStart, Colors.PrimaryGradientEnd]}
                          start={[0,0]}
                          end={[1,1]}
                          style={{flex:1}}>

            <View style={styles.searchContainer}>
              <Text style={styles.searchLabel}>Search : </Text>
              <TextInput placeholderTextColor={Colors.placeholderColor}
                          onChangeText={this.searchSong.bind(this)}
                          placeholder={"Search any song"}
                          style={styles.searchInput}/>

                  <FlatList data={this.state.songs}
                            style={{flex:1}}
                            keyExtractor={(data) => data.id + ""}
                            renderItem={({item})=> <SongItem song={item}
                                                             isActive={this.props.screenProps.isSongActive(item)}
                                                             navigation={this.props.navigation}
                                                             songClicked={this.props.screenProps.playSong.bind(this)}/>}/>
            </View>
            {Object.keys(this.props.screenProps.currentSong).length !== 0 ?
                <NowPlaying isPaused={this.props.screenProps.isPaused}
                            navigation={this.props.navigation}
                            currentPosition={this.props.screenProps.position}
                            song={this.props.screenProps.currentSong}
                            onToggle={this.props.screenProps.togglePause.bind(this)}/>

                         : null}
          </LinearGradient>
        </View>
    );
  }

  searchSong(text){
    filterSong(text).then((songs) => {
      console.log("SONGS : "+JSON.stringify(songs));
      this.setState({songs: songs})
    });
  }

}

SearchScreen.navigationOptions = {
  // title: 'Links',
  header: null
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: responsiveWidth(6)
  },
  searchLabel: {
    paddingTop: responsiveHeight(2),
    color: Colors.headingColor,
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(1),
    fontFamily: 'fira-regular'
  },
  searchInput: {
    backgroundColor: Colors.blueColor,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    fontSize: responsiveFontSize(2.2),
    borderRadius: responsiveWidth(2),
    fontFamily: 'fira-semibold',
    color: Colors.headingColor
  }
});
