import React from 'react';
import {StyleSheet, View} from 'react-native';
import Cell from './Cell.js';

const SubGridRow = props => {
  let colIndex = parseInt(props.startingCol, 10);
  let rowIndex = parseInt(props.startingRow, 10);
  let isZero = [];
  let nums = [];
  let isAnswerable = [];
  for (let i = colIndex; i < colIndex + 3; i++) {
    let temp = props.answerableCells[rowIndex][i] === 0 ? 'player' : 'starter';
    let currNum = props.board[rowIndex][i] === 0 ? '_' : props.board[rowIndex][i];
    let answerable = props.answerableCells[rowIndex][i] === 0 ? true : false;
    isZero.push(temp);
    nums.push(currNum);
    isAnswerable.push(answerable);
  }
  return (
    <View style={styles.subGridRow}>
      <Cell
        style={isZero[0]}
        //title={props.board[rowIndex][colIndex]}
        title={nums[0]}
        key={`RowIndex: ${props.startingRow} columnIndex: ${props.startingCol}`}
        xcor={colIndex}
        ycor={rowIndex}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        isAnswerable = {isAnswerable[0]}
      />
      <Cell
        style={isZero[1]}
        //title={props.board[rowIndex][colIndex + 1]}
        title={nums[1]}
        key={`RowIndex: ${props.startingRow} columnIndex: ${colIndex + 1}`}
        xcor={colIndex + 1}
        ycor={rowIndex}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        isAnswerable = {isAnswerable[1]}
      />
      <Cell
        style={isZero[2]}
        //title={props.board[rowIndex][colIndex + 2]}
        title={nums[2]}
        key={`RowIndex: ${props.startingRow} columnIndex: ${colIndex + 2}`}
        xcor={colIndex + 2}
        ycor={rowIndex}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        isAnswerable = {isAnswerable[2]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default SubGridRow;
