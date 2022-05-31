import React from 'react';
import Board from './Grid/Board.js';
import Options from './Options.js';
import InfoBar from './InfoBar.js';
import GameLoadingScreen from './GameLoadingScreen.js';
import SubmitButton from './SubmitButton.js';
import OutcomeMessage from './OutcomeMessage.js';
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
      incorrectTiles: [],
      selectedOption: 0,
      numMistakes: 0,
      tilesLeft: holes,
      time: 0,
      timerID: 0,
      loadingScreen: false,
      gameId: 0,
      gameStatus: '',
    };
    this.selectTile = this.selectTile.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.isCorrect = this.isCorrect.bind(this);
    this.userInfo = props.route.params;
    //console.log("userInfo", this.userInfo);
  }
  componentDidMount() {
    this.socket = io(myIP);
    if (this.userInfo.board_id === "0") {
      this.socket.emit("findGame", this.userInfo);

      this.socket.on('waitingForOpponent', () => {
        this.setState({loadingScreen: true});
      });

      this.socket.on('makeRecord', opponent => {
        console.log('======Making a record======');
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
          let response = JSON.parse(JSON.stringify(board.data));
          let solution = JSON.parse(response.boardSolution);
          let currentState = JSON.parse(response.boardState);
          let numHoles = parseInt(response.holes);
          let gameId = parseInt(response.game_id);
          console.log('Response from makeGame: ', gameId);
          this.setState({
            currentBoard: currentState,
            solutionBoard: solution,
            answerableCells: currentState,
            tilesLeft: numHoles,
            gameId: gameId
          });
          let info = {
            opponent: this.opponent,
            currentBoard: currentState,
            solutionBoard: solution,
            tilesLeft: numHoles,
            answerableCells: currentState,
            gameId: gameId
          }
          this.socket.emit('gameRecordCreated', info);
        })
      });

      this.socket.on('startGame', (info) => {
        console.log('Info:', info);
        this.setState({loadingScreen: false});
        //Start timer
        const timerID = setInterval(() => {
          let currTime = this.state.time + 1;
          this.setState({time: currTime});
        }, 1000);
        this.setState({
          currentBoard: info.currentBoard,
          solutionBoard: info.solutionBoard,
          answerableCells: info.answerableCells,
          tilesLeft: info.tilesLeft,
          timerID: timerID,
          gameId: info.gameId
        });
      });
    } else {
      axios.get(myIP + '/games/getGame', {
        params: {
          boardId: this.userInfo.board_id, 
          userId: this.userInfo.id
        }
      })
      .then(board => {
        if(board.data === 'You lost') {
          throw new Error(board.data);
        }
        let temp = JSON.parse(JSON.stringify(board.data));
        let solution = JSON.parse(temp.board_solution);
        let boardState = JSON.parse(temp.board_state);
        let answerableCells = JSON.parse(temp.answerable_cells);
        let numHoles = parseInt(temp.holes);
        let gameId = parseInt(temp.game_id);

        const timerID = setInterval(() => {
          let currTime = this.state.time + 1;
          this.setState({time: currTime});
        }, 1000);

        this.setState({
          currentBoard: boardState,
          solutionBoard: solution,
          tilesLeft: numHoles,
          timerID: timerID,
          answerableCells: answerableCells,
          tilesLeft: numHoles,
          gameId: gameId
        }, () => {
          this.isCorrect(true);
        });
        throw new Error('You still in the game');
      })
      .catch(err => {
        console.log('err from get Game', err);
        if (String(err) === 'Error: Player lost') {
          return axios.get(myIP + '/users/getAccount', {
            params: {username: this.userInfo.name, password: this.userInfo.password},
          })
        } else if (String(err) === 'Error: You still in the game') {
          throw new Error('Skip the next one');
        }
      })
      .then((result) => {
        this.setState({
          gameStatus: 'You lost',
        });
        console.log('result.data from losing get request', result.data);
        this.userInfo = result.data;
      })
      .catch(err => {
        if (String(err) !== 'Error: You still in the game') {
          console.log('Game should still be ongoing');
        }
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
    // axios.put(myIP + '/games/updateGame', {
    //   params: {
    //     boardState: this.state.currentBoard,

    //   }
    // })
  }

  isCorrect(mounting) {
    let playerBoard = this.state.currentBoard;
    let solBoard = this.state.solutionBoard;
    let incorrectTiles = {};

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (playerBoard[row][col] != solBoard[row][col]) {
          let string = row.toString() + col.toString();
          incorrectTiles[string] = true;
        }
      }
    }
    if (Object.keys(incorrectTiles).length !== 0) {
      this.setState({
        incorrectTiles: incorrectTiles
      });
      if (!mounting) {
        axios.put(myIP + '/games/updateGame', {
          params: {
            boardState: this.state.currentBoard,
            incorrectTiles: incorrectTiles,
            boardId: this.userInfo.board_id
          }
        })
      }
    } else {
      axios.put(myIP + '/games/finishGame', {
        params: {
          boardId: this.userInfo.board_id,
          gameId: this.state.gameId,
          userId: this.userInfo.id,
        }
      }).then((status) => {
        return Promise.all([axios.get(myIP + '/users/getAccount', {
          params: {username: this.userInfo.name, password: this.userInfo.password},
          }), 
          status.data
        ])
      })
      .then(arr => {
        this.setState({
          gameStatus: arr[1]
        });
        //console.log('arr[0].data: ', arr[0].data);
        this.userInfo = arr[0].data;
      })
      .catch((err) => {
        console.log('Errored in finishGame', err);
      })
    }
  }

  selectTile(xcor, ycor) {
    this.setState({
      selectedTile: [xcor, ycor],
    });
  }

  // Always update cell with the entered number
  // On submittal, iterate through the currentState of the board, adding all incorrect tiles to correctness object. If there is any incorrect, pass this down to cell and display the incorrect ones. 
  selectOption(num) {
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
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.gameScreen}>
        <View style={styles.container}>
          {!this.state.loadingScreen && this.state.gameStatus === '' &&
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
                incorrectTiles = {this.state.incorrectTiles}
              />
              <Options selectOption={this.selectOption} />
              <SubmitButton isCorrect={this.isCorrect}/>
            </View>
          }
          {this.state.loadingScreen && 
            <GameLoadingScreen/>
          }
          {
            this.state.gameStatus !== '' && 
            <OutcomeMessage userInfo={this.userInfo} status={this.state.gameStatus}/>
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
