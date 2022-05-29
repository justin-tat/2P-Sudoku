import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Cell = props => {
  const {onPress, title = props.title} = props;
  let isSelected;
  let player = props.isAnswerable ? 'player' : '';
  if (props.xcor === props.selectedTile[0] && props.ycor === props.selectedTile[1]) {
    isSelected = 'isSelected';
  }

  return (
    <TouchableOpacity
      style={[styles.button, styles[isSelected]]}
      onPress={() => {
        if (props.isAnswerable) {
          props.selectTile(props.xcor, props.ycor);
        }
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
    //paddingHorizontal: 2,
    paddingVertical: 10,
    flexBasis: 33,
    //backgroundColor: '#27ae60',
    backgroundColor: '#2ecc71',
    //backgroundColor: '#95a5a6',
    margin: 1,
  },
  isOption: {
    backgroundColor: 'powderblue',
  },
  isSelected: {
    backgroundColor: 'pink',
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
});

export default Cell;
