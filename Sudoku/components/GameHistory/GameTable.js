import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DataTable} from 'react-native-paper';
import axios from 'axios';

const GameTable = props => {
  const header = ['Date', 'Opponent', 'Opponent Rating', 'Result'];

  
  
  return (

      <View style={styles.table}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.tableText}>Date</DataTable.Title>
            <DataTable.Title textStyle={styles.tableText}>Opponent</DataTable.Title>
            <DataTable.Title textStyle={styles.tableText}>Opp. Rating</DataTable.Title>
            <DataTable.Title textStyle={styles.tableText}>Result</DataTable.Title>
          </DataTable.Header>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {
              props.games.map((game, index) => {
                return(
                  <DataTable.Row style={[styles.row, index % 2 && styles.colorSwitch]} key={index}>
                    <DataTable.Cell > {game.date} </DataTable.Cell>
                    <DataTable.Cell> {game.opponent} </DataTable.Cell>
                    <DataTable.Cell > {game.opponentRating} </DataTable.Cell>
                    <DataTable.Cell> {JSON.stringify(game.win)} </DataTable.Cell>
                  </DataTable.Row>
                )
              })
            }

          
          </ScrollView>
        </DataTable>
      </View>
  )
}

const styles = StyleSheet.create({
  table: {
    flex: 9,
    backgroundColor: 'powderblue',
    width: '90%',
    alignItems: 'center',
    //alignSelf: 'stretch'
  },
  contentContainer: {
    paddingBottom: 50
  },
  tableText: {
    textAlign: 'center',
    fontWeight: 'bold'
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

export default GameTable