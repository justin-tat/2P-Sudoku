import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from './MainMenu.js';

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
      {/* <Stack.Screen
          name="newGame"
          component={}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{headerShown: false}}
        /> */}
    </Stack.Navigator>
  );
};

export default MainMenuLandingPage;
