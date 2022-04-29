import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubGridRow from './SubGridRow.js';

const SubGrid = props => {
  return (
    <View style={styles.subGrid}>
      <SubGridRow
        board={props.board}
        startingRow={props.startingRow}
        clickCell={props.clickCell}
        startingCol={props.startingCol}
      />
      <SubGridRow
        board={props.board}
        startingRow={parseInt(props.startingRow, 10) + 1}
        clickCell={props.clickCell}
        startingCol={props.startingCol}
      />
      <SubGridRow
        board={props.board}
        startingRow={parseInt(props.startingRow, 10) + 2}
        clickCell={props.clickCell}
        startingCol={props.startingCol}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  subGrid: {
    flexDirection: 'column',
    //backgroundColor: '#BEBEBE',
    backgroundColor: '#2ecc71',
    justifyContent: 'space-evenly',
  },
});

export default SubGrid;
