import React from 'react';
import Board from './Grid/Board.js';
import Options from './Options.js';
import InfoBar from './InfoBar.js';
import GameLoadingScreen from './GameLoadingScreen.js';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import io from "socket.io-client";
import {myIP, myURL} from '@env';
import {generateUniqueBoard} from '../globals.js';

class ActiveGame extends React.Component {
  constructor(props) {
    super(props);
    let holes = 0;
    const board = generateUniqueBoard(holes);
    this.state = {
      rating: 1000,
      //currentBoard: [],
      //solutionBoard: [],
      currentBoard: board[1],
      solutionBoard: board[2],
      selectedTile: [],
      selectedOption: 0,
      numMistakes: 0,
      //tilesLeft: 0,
      tilesLeft: holes,
      time: 0,
      timerID: 0,
      loadingScreen: false,
    };
    this.selectTile = this.selectTile.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.userInfo = props.route.params;
    this.socket = io(myIP);
    //this.socket = io(myURL);
  }
  componentDidMount() {
    console.log('UserInfo from activeGame: ', this.userInfo);
    //this.socket = io(myURL)
    if (this.userInfo.board_id === "0") {
      //this.socket = io(myIP).emit("Find Game", {difficulty: });
      //this.socket = io(myIP + "/");
      this.socket.emit("findGame", this.userInfo);

      this.socket.on('waitingForOpponent', () => {
        this.setState({loadingScreen: true});
      });

      this.socket.on('startGame', () => {
        this.setState({loadingScreen: false});
        //Start timer
        const timerID = setInterval(() => {
          let currTime = this.state.time + 1;
          this.setState({time: currTime});
        }, 1000);
        this.setState({
          timerID: timerID,
        });
      });
      
      this.socket.on('makeRecord', opponent => {
        let parsedOpponent = opponent.split(' ');
        let opponentParam = {
          rating: parseInt(parsedOpponent[0], 10),
          id: parseInt(parsedOpponent[1]),
          name: parsedOpponent[2]
        };
        let playerOneParam = {
          rating: this.userInfo.rating,
          id: this.userInfo.id,
          name: this.userInfo.name,
        }
        axios.post(myURL + 'games/makeGame', null, {
          params: {
            playerOne: playerOneParam,
            playerTwo: opponentParam
          }
        })
        .then(() => {
          this.socket.emit('gameRecordCreated', );
        })
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
    this.socket.emit('end');
    this.socket.close();
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
        {this.state.loadingScreen && 
          <View style={styles.activeGame}>
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
          </View>
        }
        {this.state.loadingScreen && 
          <GameLoadingScreen/>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  activeGame: {
    flex: 1,
  },
});

export default ActiveGame;
