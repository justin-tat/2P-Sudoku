/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, Alert} from 'react-native';
import { OutlinedTextField } from 'rn-material-ui-textfield'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const Login = () => {
  const [username, typeUsername] = React.useState('');
  const [password, typePassword] = React.useState('');

  return (
    <View style={styles.login}>
      <Text style={styles.title}>
        Username
      </Text>
      <OutlinedTextField
        label="Username"
        containerStyle={styles.field}
        onChange={(text) => {
          typeUsername(text.nativeEvent.text);
        }}
        autoCapitalize="none"
      />
      <Text style={styles.title}>
        Password
      </Text>
      <OutlinedTextField
        label="Password"
        containerStyle={styles.field}
        onChange={(text) => {
          typePassword(text.nativeEvent.text);
        }}
        autoCapitalize="none"
      />
      <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Alert.alert(username + " " + password);
      }}>
      <Text style={styles.title}>Login</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
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

export default Login;
