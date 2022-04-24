/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TextInput, View, Text} from 'react-native';

const Login = () => {
  const [username, typeUsername] = React.useState('');
  const [password, typePassword] = React.useState('');
  return (
    <View>
      <Text style={styles.title}>
        Login
      </Text>
      <Text style={styles.field}> Username </Text>
      <TextInput
        styles={styles.field}
        placeholder={'username'}
        onChangeText={typedUsername => typeUsername(typedUsername)}
      />
      <Text style={styles.field}> Password </Text>
      <TextInput
        styles={styles.input}
        placeholder={'password'}
        onChangeText={typedPassword => typePassword(typedPassword)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  field: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#64F1DB',
  },
});

export default Login;
