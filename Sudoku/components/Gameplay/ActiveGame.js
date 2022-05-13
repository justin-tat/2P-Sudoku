import React from 'react';
import Board from './Grid/Board.js';
import Options from './Options.js';
import InfoBar from './InfoBar.js';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import io from "socket.io-client";
import {myIP} from '@env';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1000,
      currentBoard: [],
      solutionBoard: [],
      selectedTile: [],
      selectedOption: 0,
      numMistakes: 0,
      tilesLeft: 0,
      time: 0,
      timerID: 0,
    };
    this.selectTile = this.selectTile.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.userInfo = props.route.params;
    console.log('From ActiveGame: ', props.route.params);
  }
  componentDidMount() {
    const timerID = setInterval(() => {
      let currTime = this.state.time + 1;
      this.setState({time: currTime});
    }, 1000);
    this.setState({
      timerID: timerID,
    });
    if (this.userInfo.board_id === "0") {
      const socket = io(myIP);

      axios.post(myIP + '/games/findGame', null, {
        params: {
          playerId: this.userInfo.id,
          
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  isCorrect() {
    let playerBoard = this.state.currentBoard;
    let solBoard = this.state.solutionBoard;
    let correctness = {isIncorrect: false, incorrectTiles: []};

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (playerBoard[row][col] !== solBoard[row][col]) {
          correctness.incorrectTiles.push({row: row, col: col});
          correctness.isIncorrect = true;
        }
      }
    }
    return correctness;
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
        {/* <Board
          board={this.state.currentBoard}
          selectTile={this.selectTile}
          selectedTile={this.state.selectedTile}
        />
        <Options selectOption={this.selectOption} /> */}
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
