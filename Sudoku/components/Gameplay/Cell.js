import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Cell = props => {
  const {onPress, title = props.title} = props;
  let isOption = props.isOption === true ? 'isOption' : undefined;
  return (
    <TouchableOpacity
      style={[styles.button, styles[isOption]]}
      onPress={() => {
        props.clickCell(props.xcor, props.ycor);
      }}>
      <Text style={[styles[props.style], styles.cellText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    //Elevation
    // shadowColor: 'rgba(0,0,0, .4)', // IOS
    // shadowOffset: {height: 3, width: 3}, // IOS
    // shadowOpacity: 1, // IOS
    // shadowRadius: 1, //IOS
    //Actual Cell
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#2ecc71',
  },
  isOption: {
    backgroundColor: 'powderblue',
  },
  cellText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  starter: {
    color: 'white',
  },
  player: {
    color: 'black',
  },
  option: {
    color: 'green',
  },
});

export default Cell;
