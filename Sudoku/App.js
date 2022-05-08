/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './components/Auth/Login.js';
import LandingPage from './components/Auth/LandingPage.js';
import SignUp from './components/Auth/SignUp.js';
import ActiveGame from './components/Gameplay/ActiveGame.js';
import MainMenuLandingPage from './components/MainMenu/MainMenuLandingPage.js';

console.ignoredYellowBox = [
  'Warning: ViewPropTypes will be removed from React Native',
];

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ActiveGame"
            component={ActiveGame}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainMenu"
            component={MainMenuLandingPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
