import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import axios from 'axios';
import {myURL, myIP} from '@env';

class SignUp extends React.Component {
  constructor(props) {
    
    super(props);
    this.state = {
      newUsername: '',
      newEmail: '',
      newPassword: '',
      confirmedPassword: '',
      errors: {
        newUsername: '',
        newEmail: '',
        newPassword: '',
        confirmedPassword: '',
      },
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
    this.prefixes = {
      newUsername: 'Username',
      newEmail: 'Email',
      newPassword: 'Password',
      confirmedPassword: 'Confirmed Password',
    };
  }
  onChangeText(event, field) {
    this.setState({[field]: event.nativeEvent.text});
  }
  submitSignUp() {
    let errorsDupe = this.state.errors;
    let isValid = true;
    Object.keys(this.prefixes).forEach(field => {
      if (this.state[field].length === 0) {
        errorsDupe[field] = this.prefixes[field] + ' cannot be empty';
        isValid = false;
      } else if (this.state[field].includes(' ')) {
        errorsDupe[field] = this.prefixes[field] + ' cannot contain spaces';
        isValid = false;
      } else if (this.state[field].length > 30) {
        errorsDupe[field] =
          this.prefixes[field] + ' cannot be more than 30 characters';
        isValid = false;
      } else {
        errorsDupe[field] = '';
      }
    });
    if (this.state.newPassword !== this.state.confirmedPassword) {
      errorsDupe.confirmedPassword = 'Passwords must match';
      isValid = false;
    }
    //Regex to parse valid email address taken from https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
    // eslint-disable-next-line prettier/prettier
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(this.state.newEmail)) {
      errorsDupe.newEmail = 'Please enter a valid email address';
      isValid = false;
    }
    this.setState({
      errors: errorsDupe,
    });
    if (!isValid) {
      return;
    }
    axios
      .get(myIP + '/users/verifyAccount', {
        params: {username: this.state.newUsername, email: this.state.newEmail},
      })
      .then(() => {
        return axios.post(myIP + '/users/makeAccount', {
            params: {
              username: this.state.newUsername,
              email: this.state.newEmail,
              password: this.state.newPassword,
            },
          },
        );
      })
      .catch(err => {
        console.log('Errored validating account info: ', err.response.data);
        if (err.response.data === 'Username is already taken') {
          errorsDupe.newUsername = err.response.data;
          this.setState({
            errors: errorsDupe,
          });
        } else if (err.response.data === 'Email has an account') {
          errorsDupe.newEmail = err.response.data;
          this.setState({
            errors: errorsDupe,
          });
        }
        throw new Error(err.response.data);
      })
      .then(response => {
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('Failed trying to make account', err);
      });
    this.setState({
      errors: errorsDupe,
    });
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.center} keyboardShouldPersistTaps='handled'>
        <Text style={styles.title}>Username</Text>
        <OutlinedTextField
          label="Username"
          containerStyle={styles.field}
          autoCorrect={false}
          onChange={text => {
            this.onChangeText(text, 'newUsername');
          }}
          error={this.state.errors.newUsername}
          autoCapitalize="none"
        />
        <Text style={styles.title}>Email Address</Text>
        <OutlinedTextField
          label="Email Address"
          containerStyle={styles.field}
          autoCorrect={false}
          onChange={text => {
            this.onChangeText(text, 'newEmail');
          }}
          keyboardType="email-address"
          error={this.state.errors.newEmail}
          autoCapitalize="none"
        />
        <Text style={styles.title}>Password</Text>
        <OutlinedTextField
          label="Password"
          containerStyle={styles.field}
          autoCorrect={false}
          onChange={text => {
            this.onChangeText(text, 'newPassword');
          }}
          error={this.state.errors.newPassword}
          autoCapitalize="none"
        />
        <Text style={styles.title}>Confirm Password</Text>
        <OutlinedTextField
          label="Password"
          containerStyle={styles.field}
          autoCorrect={false}
          onChange={text => {
            this.onChangeText(text, 'confirmedPassword');
          }}
          error={this.state.errors.confirmedPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.submitSignUp}>
          <Text style={styles.title}>Sign Me Up!</Text>
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
