import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const LandingPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.LandingPage}>
      <TouchableOpacity
        style={[styles.landingPageOption, styles.makeAccount]}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.landingPageText}>Make An Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.landingPageOption, styles.login]}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.landingPageText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.landingPageOption, styles.activeGame]}
        onPress={() => {
          navigation.navigate('ActiveGame');
        }}>
        <Text style={styles.landingPageText}>Proceed Without An Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LandingPage: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  landingPageOption: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  landingPageText: {
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

export default LandingPage;
