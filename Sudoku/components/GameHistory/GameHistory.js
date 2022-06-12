import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import axios from 'axios';

//Fetch all games associated with userId. Check if the name of the winner is equal to passed props. If it is, then you won, otherwise you didn't
//Display current rating at top with games in scrollable list that does not show any delineation. 

const GameHistory = props => {
  console.log('props.route.params', props.route.params);
  const header = ['Date', 'Opponent', 'Opponent Rating', 'Result'];
  //const [games, setGames] = useState([]);
  const flexArr = [1, 1, 1, 1]
  games = [];
  for (let i = 0; i < 4; i++) {
    let arr = [];
    for (let j = 0; j < 4; j++) {
      arr.push(`row: ${i}, col: ${j}`);
    }
    games.push(arr);
  }
  return (
    <SafeAreaView style={styles.gameHistory}>
      <View style={styles.ratingHeader}>
        <Text style={styles.rating}>Rating: {props.route.params.rating}</Text>
      </View>
      <ScrollView style={styles.table}>
        <View>
          <Table borderStyle = {styles.tableBorder}>
            <Row style={styles.header} data={header} flexArr={flexArr} textStyle={styles.tableText}/>
          </Table>
          <ScrollView style={styles.dataList}>
            <Table borderStyle={styles.tableBorder}>
              {
                games.map((game, index) => {
                  <Row
                    key={index}
                    data={game}
                    flexArr={flexArr}
                    style={[styles.row, index % 2 && styles.colorSwitch]}
                    textStyle={styles.tableText}
                  />
                })
              }
            </Table>
          </ScrollView>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  gameHistory: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    //justifyContent: 'center',
  },
  ratingHeader: {
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 10
  },
  table: {
    flex: 4
  },
  header: {
    height: 50,
    backgroundColor: '#ffffff'
  },
  tableText: {
    textAlign: 'center',
    fontWeight: 200
  },
  tableBorder: {
    borderColor: '#C1C0B9'
  },
  dataList: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA'
  },
  colorSwitch: {
    backgroundColor: '#ffffff'
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