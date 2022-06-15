import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import GameTable from './GameTable.js';
import {myIP} from '@env';

import axios from 'axios';

//Fetch all games associated with userId. Check if the name of the winner is equal to passed props. If it is, then you won, otherwise you didn't
//Display current rating at top with games in scrollable list that does not show any delineation. 

const GameHistory = props => {
  console.log('props.route.params', props.route.params);
  const [games, setGames] = useState([]);
  const [error, markError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(myIP + '/users/gameHistory', {
      params: {
        userId: props.route.params.id,
        username: props.route.params.name
      }
    })
    .then(response => {
      console.log('Response from Game History get request', response.data);
      setGames(response.data);
      //markError(false);
    })
    .catch((err) => {
      markError(true);
    })
  }, []);

  return (
    <SafeAreaView style={styles.gameHistory}>
      <View style={styles.ratingHeader}>
        <Text style={styles.rating}>Elo Rating: {props.route.params.rating}</Text>
      </View>
      <GameTable games={games}/>
      <TouchableOpacity
        style={[styles.infoBarChild]}
        onPress={() => {
          navigation.navigate('LandingPage');
        }}>
        <Text style={styles.childText}> Home </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  gameHistory: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  infoBarChild: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#5d9db9',
  },
  ratingHeader: {
    flex: 1,
    borderRadius: 10
  },
  rating: {
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 30
  }
})

export default GameHistory