import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';

const SignUp = () => {
  const [newUsername, makeNewUsername] = React.useState('');
  const [newPassword, makeNewPassword] = React.useState('');
  const [confirmedPassword, confirmPassword] = React.useState('');
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Username</Text>
      <OutlinedTextField
        label="Username"
        containerStyle={styles.field}
        onChange={text => {
          makeNewUsername(text.nativeEvent.text);
        }}
        autoCapitalize="none"
      />
      <Text style={styles.title}>Password</Text>
      <OutlinedTextField
        label="Password"
        containerStyle={styles.field}
        onChange={text => {
          makeNewPassword(text.nativeEvent.text);
        }}
        autoCapitalize="none"
      />
      <Text style={styles.title}>Confirm Password</Text>
      <OutlinedTextField
        label="Password"
        containerStyle={styles.field}
        onChange={text => {
          confirmPassword(text.nativeEvent.text);
        }}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(`${newUsername} ${newPassword} ${confirmedPassword}`);
        }}>
        <Text style={styles.title}>Sign Me Up!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  field: {
    width: '80%',
    padding: 10,
  },
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

export default SignUp;
