import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubGridRow from './SubGridRow.js';

const SubGrid = props => {
  return (
    <View style={styles.subGrid}>
      <SubGridRow
        board={props.board}
        startingRow={props.startingRow}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        startingCol={props.startingCol}
      />
      <SubGridRow
        board={props.board}
        startingRow={parseInt(props.startingRow, 10) + 1}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        startingCol={props.startingCol}
      />
      <SubGridRow
        board={props.board}
        startingRow={parseInt(props.startingRow, 10) + 2}
        selectTile={props.selectTile}
        selectedTile={props.selectedTile}
        startingCol={props.startingCol}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subGrid: {
    flexDirection: 'column',
    //backgroundColor: '#BEBEBE',
    backgroundColor: '#27ae60',
    //backgroundColor: '#718c8d',
    justifyContent: 'space-evenly',
  },
});

export default SubGrid;
