import React from 'react';
import {StyleSheet, View} from 'react-native';
import Row from './Row.js';
import RowSet from './RowSet.js';

const Board = props => {
  const board = props.board;
  return (
    <View style={styles.board}>
      <RowSet
        board={board[1]}
        startingRow={0}
        key={'RowSet 1'}
        clickCell={props.clickCell}
      />
      <RowSet
        board={board[1]}
        startingRow={3}
        key={'RowSet 2'}
        clickCell={props.clickCell}
      />
      <RowSet
        board={board[1]}
        startingRow={6}
        key={'RowSet 3'}
        clickCell={props.clickCell}
      />

      {/* {board[1].map((row, rowIndex) => {
        return (
          <Row
            currRow={row}
            index={rowIndex}
            key={rowIndex}
            ycor={rowIndex}
            clickCell={props.clickCell}
          />
        );
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 7,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

export default Board;
