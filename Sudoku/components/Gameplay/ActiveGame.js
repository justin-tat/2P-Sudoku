import React from 'react';
import {generateUniqueBoard} from '../globals.js';
import Board from './Board.js';
import Options from './Options.js';
import {View, StyleSheet, Text, Alert} from 'react-native';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: generateUniqueBoard(15),
      cellSelected: '',
    };
    this.clickCell = this.clickCell.bind(this);
  }
  clickCell(event) {
    Alert.alert('test');
    Alert.alert(event);
    console.log('hello');
  }

  render() {
    return (
      <View style={styles.gameScreen}>
        <Board board={this.state.board} clickCell={this.clickCell} />
        <Text> Cell Selected: {}</Text>
        <Options />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export default ActiveGame;
