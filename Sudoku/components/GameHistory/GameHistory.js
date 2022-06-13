import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import GameTable from './GameTable.js';
import {myIP} from '@env';

import axios from 'axios';

//Fetch all games associated with userId. Check if the name of the winner is equal to passed props. If it is, then you won, otherwise you didn't
//Display current rating at top with games in scrollable list that does not show any delineation. 

const GameHistory = props => {
  console.log('props.route.params', props.route.params);
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get(myIP + '/users/gameHistory', {
      params: {
        userId: props.route.params.id
      }
    })
    .then(response => {
      console.log('Response from Game History get request', response.data);
    })
  })

  return (
    <SafeAreaView style={styles.gameHistory}>
      <View style={styles.ratingHeader}>
        <Text style={styles.rating}>Rating: {props.route.params.rating}</Text>
      </View>
      <GameTable games={games}/>

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
  ratingHeader: {
    flex: 1,
    borderRadius: 10
  },
  rating: {
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    color: 'red',
    fontSize: 30
  }
})

export default GameHistory