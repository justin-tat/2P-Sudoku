import React from 'react';
import {StyleSheet, View} from 'react-native';
import Row from '../Row.js';

const BottomRow = props => {
  return (
    <View style={styles.bottomRow}>
      {props.board[1].map((row, rowIndex) => {
        if (rowIndex >= 6) {
          if()
            return (
              <Row
                currRow={row}
                index={rowIndex}
                key={rowIndex}
                ycor={rowIndex}
                clickCell={props.clickCell}
              />
            );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    flex: 7,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
});

export default BottomRow;
