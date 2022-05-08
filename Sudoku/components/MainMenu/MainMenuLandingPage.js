import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainMenu} from './MainMenu.js';

const Stack = createNativeStackNavigator();

const MainMenuLandingPage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="MainMenu">
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{headerShown: false}}
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
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 1,
  },
});

export default MainMenuLandingPage;
