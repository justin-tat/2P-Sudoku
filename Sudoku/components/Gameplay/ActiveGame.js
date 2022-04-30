import React from 'react';
import {generateUniqueBoard} from '../globals.js';
import Board from './Grid/Board.js';
import Options from './Options.js';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    const board = generateUniqueBoard(25);
    this.state = {
      currentBoard: board[1],
      solutionBoard: board[2],
      selectedTile: [],
      selectedOption: 0,
    };
    this.selectTile = this.selectTile.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }
  selectTile(xcor, ycor) {
    this.setState({
      selectedTile: [xcor, ycor],
    });
  }
  selectOption(num) {
    // eslint-disable-next-line prettier/prettier
    if (+num === this.state.solutionBoard[this.state.selectedTile[1]][this.state.selectedTile[0]]) {
      let updatedBoard = this.state.currentBoard;
      // eslint-disable-next-line prettier/prettier
      updatedBoard[this.state.selectedTile[1]][this.state.selectedTile[0]] = +num;
      this.setState({
        currentBoard: updatedBoard,
        selectedTile: [],
        selectedOption: num,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.gameScreen}>
        <Board
          board={this.state.currentBoard}
          selectTile={this.selectTile}
          selectedTile={this.state.selectedTile}
        />
        <Text>
          {' '}
          Cell Selected:{' '}
          {`row ${this.state.selectedTile[1]} column: ${this.state.selectedTile[0]} `}
        </Text>
        <Text> Option Selected: {this.state.selectedOption}</Text>
        <Options selectOption={this.selectOption} />
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
