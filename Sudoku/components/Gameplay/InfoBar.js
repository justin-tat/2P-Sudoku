import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const InfoBar = props => {
  return (
    <View style={styles.infoBar}>
      <View style={styles.infoBarChild}>
        <Text style={styles.childText}>Your Rating: {props.rating}</Text>
      </View>
      <View style={styles.infoBarChild}>
        <Text style={styles.childText}>Mistakes Made: {props.numMistakes}</Text>
      </View>
      <View style={styles.infoBarChild}>
        <Text style={styles.childText}>Current Game Time: {props.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 0.7,
    marginBottom: 10,
    backgroundColor: 'black',
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
    fontSize: 10,
  },
});

export default InfoBar;
