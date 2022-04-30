import React from 'react';
import {StyleSheet, View} from 'react-native';
import Row from './Row.js';
import RowSet from './RowSet.js';

const Board = props => {
  const board = props.board;
  return (
    <View style={styles.board}>
      <RowSet
        board={board}
        startingRow={0}
        key={'RowSet 1'}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
      />
      <RowSet
        board={board}
        startingRow={3}
        key={'RowSet 2'}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
      />
      <RowSet
        board={board}
        startingRow={6}
        key={'RowSet 3'}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 7,
    justifyContent: 'space-evenly',
    //justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

export default Board;
