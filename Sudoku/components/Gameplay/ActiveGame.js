import React from 'react';
import {generateUniqueBoard} from '../globals.js';
import Board from './Grid/Board.js';
import Options from './Options.js';
import InfoBar from './InfoBar.js';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    const board = generateUniqueBoard(25);
    this.state = {
      rating: 1000,
      currentBoard: board[1],
      solutionBoard: board[2],
      selectedTile: [],
      selectedOption: 0,
      numMistakes: 0,
      tilesLeft: 25, //Same number as generate Unique Board
      time: 0,
      timerID: 0,
    };
    this.selectTile = this.selectTile.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }
  componentDidMount() {
    const timerID = setInterval(() => {
      let currTime = this.state.time + 1;
      this.setState({time: currTime});
    }, 1000);
    this.setState({
      timerID: timerID,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
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
      });
    } else {
      let updatedMistakes = this.state.numMistakes;
      updatedMistakes++;
      this.setState({
        numMistakes: updatedMistakes,
        selectedTile: [],
      });
    }
    //Put in what happens if you're wrong here
  }

  render() {
    return (
      <SafeAreaView style={styles.gameScreen}>
        <InfoBar
          rating={this.state.rating}
          numMistakes={this.state.numMistakes}
          time={this.state.time + this.state.numMistakes * 10}
        />
        <Board
          board={this.state.currentBoard}
          selectTile={this.selectTile}
          selectedTile={this.state.selectedTile}
        />
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
