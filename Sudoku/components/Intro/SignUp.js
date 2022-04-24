import React from 'react';
import {StyleSheet, TextInput, View, Text, Button, Alert} from 'react-native';

const SignUp = () => {
  const [newUsername, makeNewUsername] = React.useState('');
  const [newPassword, makeNewPassword] = React.useState('');
  const [confirmedPassword, confirmPassword] = React.useState('');
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Make an Account</Text>
      <View style={styles.row}>
        <Text style={styles.field}> Username </Text>
        <TextInput
          style={styles.input}
          placeholder={'username'}
          onChangeText={typedNewUsername => makeNewUsername(typedNewUsername)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.field}> Password </Text>
        <TextInput
          style={styles.input}
          placeholder={'password'}
          onChangeText={typedNewPassword => makeNewPassword(typedNewPassword)}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.field}> Confirm Password </Text>
        <TextInput
          style={styles.input}
          placeholder={'password'}
          onChangeText={copiedPassword => confirmPassword(copiedPassword)}
        />
      </View>
      <Button
        title="Make Your Account"
        onPress={() => {
          Alert.alert(
            `Username: ${newUsername} Password: ${newPassword} ConfirmedPassword: ${confirmedPassword} `,
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  field: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f194ff',
  },
});

export default SignUp;
