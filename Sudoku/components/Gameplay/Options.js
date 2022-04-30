import React from 'react';
import {StyleSheet, View} from 'react-native';
import OptionCell from './OptionCell.js';

const Options = props => {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={styles.options}>
      {options.map((number, index) => {
        return (
          <OptionCell
            title={JSON.stringify(number)}
            style="option"
            key={'option: ' + index}
            isOption={true}
            selectOption={props.selectOption}
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
