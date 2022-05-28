import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubGrid from './SubGrid.js';

const RowSet = props => {
  return (
    <View style={styles.rowSet}>
      <SubGrid
        board={props.board}
        startingRow={props.startingRow}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        startingCol={0}
        answerableCells = {props.answerableCells}
      />
      <SubGrid
        board={props.board}
        startingRow={props.startingRow}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        startingCol={3}
        answerableCells = {props.answerableCells}
      />
      <SubGrid
        board={props.board}
        startingRow={props.startingRow}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        startingCol={6}
        answerableCells = {props.answerableCells}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowSet: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //justifyContent: 'center',
  },
});

export default RowSet;
