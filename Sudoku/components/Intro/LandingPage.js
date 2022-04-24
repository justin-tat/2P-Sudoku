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
          Alert.alert('Trying to make an account');
          navigation.navigate('SignUp');
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          Alert.alert('Trying to login');
          navigation.navigate('Login');
        }}
      />
      <Button
        title="Proceed Without An Account"
        color="#F62626"
        onPress={() => {
          Alert.alert('Here is where the fun begins');
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
