import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from './MainMenu.js';
import ActiveGame from '../Gameplay/ActiveGame.js';
import GameHistory from '../GameHistory/GameHistory.js';

const Stack = createNativeStackNavigator();

const MainMenuLandingPage = ({route, navigation}) => {
  return (
    <Stack.Navigator initalRouteName="MainMenu">
      <Stack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{headerShown: false}}
        initialParams={route.params}
      />
      <Stack.Screen
        name="ActiveGame"
        component={ActiveGame}
        options={{headerShown: false}}
        initialParams={route.params}
      />
      {/* <Stack.Screen
        name="GameHistory"
        component={GameHistory}
        options={{headerShown: true}}
      /> */}
        {/* <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{headerShown: false}}
        /> */}
    </Stack.Navigator>
  );
};

export default MainMenuLandingPage;
