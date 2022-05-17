import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

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
            navigation.navigate('Login');
          }}>
          <Text style={styles.mainMenuText}>Continue Game</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.mainMenuOption, styles.activeGame]}
        onPress={() => {
          navigation.navigate('ActiveGame', userInfo);
        }}>
        <Text style={styles.mainMenuText}>Proceed Without An Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.mainMenuOption, styles.activeGame]}
        onPress={() => {
          navigation.navigate('LandingPage');
        }}>
        <Text style={styles.mainMenuText}> Home </Text>
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