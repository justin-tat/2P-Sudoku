import React from 'react';
import {StyleSheet, View} from 'react-native';
import Row from './Row.js';

const Board = props => {
  const board = props.board;
  return (
    <View style={styles.board}>
      {board[1].map((row, rowIndex) => {
        return (
          <Row
            currRow={row}
            index={rowIndex}
            key={rowIndex}
            clickCell={props.clickCell}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 7,
    justifyContent: 'space-evenly',
  },
});

export default Board;
