import React from 'react';
import {generateUniqueBoard} from '../globals.js';
import Board from './Board.js';
import Options from './Options.js';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: generateUniqueBoard(25),
      cellSelected: '',
    };
    this.clickCell = this.clickCell.bind(this);
  }
  clickCell(xcor, ycor) {
    this.setState({
      cellSelected: [xcor, ycor],
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.gameScreen}>
        <Board board={this.state.board} clickCell={this.clickCell} />
        <Text>
          {' '}
          Cell Selected:{' '}
          {`row ${this.state.cellSelected[1]} column: ${this.state.cellSelected[0]} `}
        </Text>
        <Options />
      </SafeAreaView>
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
