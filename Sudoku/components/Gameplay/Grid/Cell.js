import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Cell = props => {
  const {onPress, title = props.title} = props;
  let isSelected;
  let isHighlighted;
  let player = props.isAnswerable ? 'player' : '';
  let tileStatus = props.isIncorrect ? 'incorrect' : '';
  if (props.xcor === props.selectedTile[0] && props.ycor === props.selectedTile[1]) {
    isSelected = 'isSelected';
  } else if (props.xcor === props.selectedTile[0]) {
    isHighlighted = 'highlight';
  } else if (props.ycor === props.selectedTile[1]) {
    isHighlighted = 'highlight'
  }
  return (
    <TouchableOpacity
      style={[styles.button, styles[isSelected], styles[isHighlighted]]}
      onPress={() => {
        if (props.isAnswerable) {
          props.selectTile(props.xcor, props.ycor);
        }
      }}>
      <Text style={[styles[props.style], styles.cellText, styles[tileStatus]]}>{title}</Text>
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
  highlight: {
    backgroundColor: '#95a5a6'
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
  incorrect: {
    color:'red'
  }
});

export default Cell;
