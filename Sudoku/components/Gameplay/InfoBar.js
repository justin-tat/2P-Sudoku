import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const InfoBar = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.infoBar}>
      <View style={styles.infoBarChild}>
        <Text style={styles.childText}>Mistakes Made: {props.numMistakes}</Text>
      </View>
      <View style={styles.infoBarChild}>
        <Text style={styles.childText}>Current Game Time: {props.time}</Text>
      </View>
      <TouchableOpacity
        style={[styles.infoBarChild]}
        onPress={() => {
          navigation.navigate('LandingPage');
        }}>
        <Text style={styles.mainMenuText}> Home </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.7,
    marginBottom: 10,
    //backgroundColor: 'black',
  },
  infoBarChild: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#5d9db9',
  },
  childText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default InfoBar;
