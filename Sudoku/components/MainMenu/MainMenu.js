import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';

const MainMenu = ({route, navigation}) => {
  const userInfo = route.params;
  return (
    <SafeAreaView style={styles.mainMenu}>

      {parseInt(userInfo.board_id, 10) === 0 && (
        <TouchableOpacity
          style={[styles.mainMenuOption, styles.makeAccount]}
          onPress={() => {
            navigation.navigate('ActiveGame', userInfo);
          }}>
          <Text style={styles.mainMenuText}>Start a New Game</Text>
        </TouchableOpacity>
      )}

      {parseInt(userInfo.board_id, 10) !== 0 && (
        <TouchableOpacity
          style={[styles.mainMenuOption, styles.login]}
          onPress={() => {
            navigation.navigate('ActiveGame', userInfo);
          }}>
          <Text style={styles.mainMenuText}>Continue Game</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.mainMenuOption, styles.activeGame]}
        onPress={() => {
          Alert.alert('Not implemented yet!');
        }}>
        <Text style={styles.mainMenuText}>See Game History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.mainMenuOption, styles.activeGame]}
        onPress={() => {
          navigation.navigate('LandingPage');
        }}>
        <Text style={styles.mainMenuText}> Log Out </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainMenu: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  mainMenuOption: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  mainMenuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  makeAccount: {
    backgroundColor: '#f194ff',
  },
  login: {
    backgroundColor: '#359d73',
  },
  activeGame: {
    backgroundColor: '#5d9db9',
  },
});

export default MainMenu;
