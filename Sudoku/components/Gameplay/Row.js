import React from 'react';
import Cell from './Cell.js';
import {View, StyleSheet, Alert} from 'react-native';

const Row = props => {
  return (
    <View style={styles.row}>
      {props.currRow.map((number, colIndex) => {
        let currStyle = number === 0 ? 'starter' : 'player';
        return (
          <Cell
            style={currStyle}
            title={number}
            key={JSON.stringify([props.rowIndex, colIndex])}
            onPress={() => {
              Alert.alert('Number was pressed');
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Row;
