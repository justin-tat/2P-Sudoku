import React from 'react';
import {StyleSheet, View} from 'react-native';
import SubGrid from './SubGrid.js';

const RowSet = props => {
  return (
    <View style={styles.rowSet}>
      <SubGrid
        board={props.board}
        startingRow={props.startingRow}
        clickCell={props.clickCell}
        startingCol={0}
      />
      <SubGrid
        board={props.board}
        startingRow={props.startingRow}
        clickCell={props.clickCell}
        startingCol={3}
      />
      <SubGrid
        board={props.board}
        startingRow={props.startingRow}
        clickCell={props.clickCell}
        startingCol={6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowSet: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RowSet;
