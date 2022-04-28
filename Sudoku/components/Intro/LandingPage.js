import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, View, StyleSheet, Alert} from 'react-native';

const LandingPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.LandingPage}>
      <Button
        title="Make An Account"
        color="#f194ff"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button
        title="Proceed Without An Account"
        color="#F62626"
        onPress={() => {
          navigation.navigate('ActiveGame');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LandingPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingPage;
