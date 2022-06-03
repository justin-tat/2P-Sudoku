import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import Row from './Row.js';
import RowSet from './RowSet.js';

const Board = props => {
  const interpolated = props.animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0]
  });
  const wiggle = {
    transform: [{translateX: interpolated}]
  }
  const board = props.board;
  return (
    <Animated.View style={[wiggle, styles.board]}>
      <RowSet
        board={board}
        startingRow={0}
        key={'RowSet 1'}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        answerableCells = {props.answerableCells}
        incorrectTiles={props.incorrectTiles}
      />
      <RowSet
        board={board}
        startingRow={3}
        key={'RowSet 2'}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        answerableCells = {props.answerableCells}
        incorrectTiles = {props.incorrectTiles}
      />
      <RowSet
        board={board}
        startingRow={6}
        key={'RowSet 3'}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        answerableCells = {props.answerableCells}
        incorrectTiles = {props.incorrectTiles}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 7,
    justifyContent: 'space-evenly',
    //justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#708090',
    marginBottom: 15
  },
});

export default Board;
