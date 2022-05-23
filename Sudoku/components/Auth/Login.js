/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, Alert, ScrollView} from 'react-native';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import axios from 'axios';
import {myURL, myIP} from '@env';

// const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
      },
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.prefixes = {
      username: 'Username',
      password: 'Password',
    };
    console.log('My Address: ', myIP);
  }
  onChangeText(event, field) {
    this.setState({[field]: event.nativeEvent.text});
  }
  submitLogin() {
    let errorsDupe = this.state.errors;
    let isValid = true;
    Object.keys(this.prefixes).forEach(field => {
      if (this.state[field].length === 0) {
        errorsDupe[field] = this.prefixes[field] + ' cannot be empty';
        isValid = false;
      } else if (this.state[field].includes(' ')) {
        errorsDupe[field] = this.prefixes[field] + ' cannot include spaces';
        isValid = false;
      } else if (this.state[field].length > 30) {
        errorsDupe[field] = this.prefixes[field] + ' cannot be more than 30 characters';
        isValid = false;
      } else {
        errorsDupe[field] = '';
      }
    });
    this.setState({
      errors: errorsDupe,
    });
    //don't need to contact db if entries are invalid
    if (!isValid) {
      return;
    }
    console.log('Firing axios call');
    console.log(myIP + '/users/getAccount');
    axios.get(myIP + '/users/getAccount', {
      params: {username: this.state.username, password: this.state.password},
    })
    .then((info) => {
      this.props.navigation.navigate('MainMenuLandingPage', info.data);
    })
    .catch(err => {
      if (err.response.data === 'Username not found') {
        errorsDupe.username = err.response.data;
      } else if (err.response.data === 'Password did not match that account') {
        errorsDupe.password = err.response.data;
      }
      this.setState({
        errors: errorsDupe,
      });
    });

  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.login} keyboardShouldPersistTaps='handled'>
        <Text style={styles.title}> 
          Username
        </Text>
        <OutlinedTextField
          label="Username"
          containerStyle={styles.field}
          onChange={text => {
            this.onChangeText(text, 'username');
          }}
          autoCapitalize="none"
          error={this.state.errors.username}
        />
        <Text style={styles.title}>
          Password
        </Text>
        <OutlinedTextField
          label="Password"
          containerStyle={styles.field}
          onChange={(text) => {
            this.onChangeText(text, 'password');
          }}
          autoCapitalize="none"
          error={this.state.errors.password}
        />
        <TouchableOpacity
        style={styles.button}
        onPress={this.submitLogin}>
        <Text style={styles.title}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('LandingPage')}>
          <Text style={styles.title}> Home </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

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
