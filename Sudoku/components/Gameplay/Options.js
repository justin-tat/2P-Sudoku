import React from 'react';
import {StyleSheet, View} from 'react-native';
import Cell from './Cell.js';

const Options = () => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.options}>
      {options.map((number, index) => {
        return (
          <Cell
            title={JSON.stringify(number)}
            style="option"
            key={'option: ' + index}
            isOption={true}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 3,
  },
});

export default Options;
