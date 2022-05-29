import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SubmitButton = props => {
  //const navigation = useNavigation();
  return (
    <TouchableOpacity
      style = {styles.button}
      onPress={() => {
        props.isCorrect(false);
      }}
      >
        <Text style={styles.childText}> Submit </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.7,
    backgroundColor: '#5d9db9',
    margin: 10
  }, 
  childText: {
    fontWeight: 'bold',
    fontSize: 15,
  }
})

export default SubmitButton;