import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import axios from 'axios';

//Fetch all games associated with userId. Check if the name of the winner is equal to passed props. If it is, then you won, otherwise you didn't
//Display current rating at top with games in scrollable list that does not show any delineation. 

const GameTable = props => {
  const header = ['Date', 'Opponent', 'Opponent Rating', 'Result'];
  //const [games, setGames] = useState([]);
  const flexArr = [1, 2, 1, 1]
  const games = [];
  const widthArr = [];
  for (let i = 0; i < 4; i++) {
    let arr = [];
    for (let j = 0; j < 4; j++) {
      arr.push(`(${i},${j})`);
    }
    games.push(arr);
    widthArr.push(80)
  }
  
  return (
      <View style={styles.table}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle = {styles.tableBorder}>
              <Row style={styles.header} data={header} flexArr={flexArr} textStyle={styles.tableText} widthArr={widthArr}/>
            </Table>
            <ScrollView style={styles.dataList}>
              <Table borderStyle={styles.tableBorder}>
                {
                  games.map((game, index) => {
                    return(
                      <Row
                        key={index}
                        data={game}
                        flexArr={flexArr}
                        style={[styles.row, index%2 && styles.colorSwitch]}
                        textStyle={{textAlign: 'center', fontWeight: '200'}}
                      />
                    )
                  })
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  table: {
    flex: 9,
    backgroundColor: 'blue',
    width: '80%',
    alignItems: 'center'
  },
  header: {
    height: 50,
    backgroundColor: '#ffffff',
    width: '100%'
  },
  tableText: {
    textAlign: 'center',
    fontWeight: '200'
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