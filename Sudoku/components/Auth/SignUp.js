import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import axios from 'axios';

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
      } else if (this.state[field].length > 30) {
        errorsDupe[field] =
          this.prefixes[field] + ' cannot be more than 30 characters';
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
    if (!isValid) {
      this.setState({
        errors: errorsDupe,
      });
      return;
    }
    axios
      .get('http://localhost:3000/users/getAccount', {
        params: {username: this.state.newUsername, email: this.state.newEmail},
      })
      .then(response => {
        console.log('Results: ', response);
      });
  }
  render() {
    return (
      <View style={styles.center}>
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
      </View>
    );
  };
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