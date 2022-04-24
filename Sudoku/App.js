/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';
import Login from './components/Intro/Login.js';
import LandingPage from './components/Intro/LandingPage.js';
import SignUp from './components/Intro/SignUp.js';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  // return (
  //   <
  //   <SafeAreaView>
  //     <Header
  //       leftComponent={
  //         <Button
  //           title="MakeAnAccount"
  //           onPress={() => {
  //             Alert.alert('Trying to make an account');
  //           }}
  //         />
  //       }
  //       centerComponent={
  //         <Button
  //           title="Login"
  //           onPress={() => {
  //             Alert.alert('Trying to login');
  //           }}
  //         />
  //       }
  //     />
  //   </SafeAreaView>
  // );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#fff',
  },
});

export default App;
