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
      currentBoard: board[1],
      solutionBoard: board[2],
      answerableCells: board[1],
      selectedTile: [],
      selectedOption: 0,
      numMistakes: 0,
      tilesLeft: holes,
      time: 0,
      timerID: 0,
      loadingScreen: false,
    };
    this.selectTile = this.selectTile.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.userInfo = props.route.params;
  }
  componentDidMount() {
    this.socket = io(myIP);
    if (this.userInfo.board_id === "0") {
      this.socket.emit("findGame", this.userInfo);

      this.socket.on('waitingForOpponent', () => {
        this.setState({loadingScreen: true});
      });

      this.socket.on('makeRecord', opponent => {
        this.opponent = opponent
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
        axios.post(myIP + '/games/makeGame', {
          params: {
            playerOne: playerOneParam,
            playerTwo: opponentParam
          }
        })
        .then(board => {
          console.log('board after makeGame: ', board.data);
          let response = JSON.parse(JSON.stringify(board.data));
          let solution = JSON.parse(response.boardSolution);
          let currentState = JSON.parse(response.boardState);
          let numHoles = parseInt(response.holes);
          this.setState({
            currentBoard: currentState,
            solution: solution,
            answerableCells: currentState,
            tilesLeft: numHoles,
          });
          let info = {
            opponent: this.opponent,
            currentBoard: currentState,
            solution: solution,
            tilesLeft: numHoles,
            answerableCells: currentState,
          }
          this.socket.emit('gameRecordCreated', info);
        })
      });

      this.socket.on('startGame', (info) => {
        this.setState({loadingScreen: false});
        //Start timer
        const timerID = setInterval(() => {
          let currTime = this.state.time + 1;
          this.setState({time: currTime});
        }, 1000);
        this.setState({
          currentBoard: info.currentBoard,
          solution: info.solution,
          answerableCells: info.answerableCells,
          tilesLeft: info.tilesLeft,
          timerID: timerID
        });
      });
    } else {
      //console.log('ip from activeGame: ', myIP);
      axios.get(myIP + '/games/getGame', {
        params: {boardId: this.userInfo.board_id}
      })
      .then(board => {
        let temp = JSON.parse(JSON.stringify(board.data));
        let solution = JSON.parse(temp.board_solution);
        let boardState = JSON.parse(temp.board_state);
        let answerableCells = JSON.parse(temp.answerable_cells);
        let numHoles = parseInt(temp.holes);
        console.log('Board.data ', board.data);

        const timerID = setInterval(() => {
          let currTime = this.state.time + 1;
          this.setState({time: currTime});
        }, 1000);
        this.setState({
          currentBoard: boardState,
          solution: solution,
          tilesLeft: numHoles,
          timerID: timerID,
          answerableCells: answerableCells,
          tilesLeft: numHoles
        });
      })
      .catch(err => {
        console.log('Errored in client side getGame get request', err);
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
    this.setState({
      loadingScreen: false,
    });
    this.socket.emit('end');
    this.socket.close();
    axios.put(myIP + '/games/updateGame', {
      params: {
        boardState: this.state.currentBoard,

      }
    })
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

  // Always update cell with the entered number
  // On submittal, iterate through the currentState of the board, adding all incorrect tiles to correctness object. If there is any incorrect, pass this down to cell and display the incorrect ones. 
  selectOption(num) {
    // if (+num === this.state.solutionBoard[this.state.selectedTile[1]][this.state.selectedTile[0]]) {
    //   let updatedBoard = this.state.currentBoard;
    //   updatedBoard[this.state.selectedTile[1]][this.state.selectedTile[0]] = +num;

    //   this.setState({
    //     currentBoard: updatedBoard,
    //     selectedTile: [],
    //   });
    // } else {
    //   let updatedMistakes = this.state.numMistakes;
    //   updatedMistakes++;
    //   this.setState({
    //     numMistakes: updatedMistakes,
    //     selectedTile: [],
    //   });
    // }
    //Put in what happens if you're wrong here
    let updatedBoard = this.state.currentBoard;
    let delta = this.state.tilesLeft;
    if (updatedBoard[this.state.selectedTile[1]][this.state.selectedTile[0]] === 0) {
      delta--;
    }
    updatedBoard[this.state.selectedTile[1]][this.state.selectedTile[0]] = +num;
    this.setState({
      currentBoard: updatedBoard,
      selectedTile: [],
      tilesLeft: delta,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.gameScreen}>
        <View style={styles.container}>
          {!this.state.loadingScreen && 
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
                answerableCells = {this.state.answerableCells}
              />
              <Options selectOption={this.selectOption} />
            </View>
          }
          {this.state.loadingScreen && 
            <GameLoadingScreen/>
          }
        </View>
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
  container: {
    flexGrow: 1,
  }
});

export default ActiveGame;
