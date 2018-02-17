// React
import React from 'react'

// React Native
import { Text, View, TextInput, Button, AsyncStorage, StyleSheet, Image } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (text, field) {
    let newState = this.state
    newState[field] = text
    this.setState(Object.assign({}, this.state, newState))
  }

  async handleSubmit () {
    const { navigate } = this.props.navigation
    this.props.mutate({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then((response) => {
      try {
        AsyncStorage.setItem('UserToken', response.data.signinUser.token)
        AsyncStorage.setItem('UserEmail', this.state.email)
      } catch (error) {
        console.log('Storing user token failed.'+ error)
      }
      navigate('Home')
    })
  }

  render () {
    const { navigate } = this.props.navigation

    return (
      <View>
        <View style={styles.container} >
          <Text style={styles.text}> Welcome to TASK GURU!</Text>
          <Image style={styles.image}
            source={require('./../images/Slice.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <TextInput style={styles.heading} placeholder='Email' value={this.state.email} onChangeText={(text) => this.handleChange(text, 'email')} />
          <TextInput style={styles.heading} placeholder='Password' secureTextEntry value={this.state.password} onChangeText={(text) => this.handleChange(text, 'password')} />
          <View style={styles.buttonContainer}>
            <View style={styles.button} >
              <Button title='New User' onPress={() => navigate('UserRegistration')} />
            </View>
            <View style={styles.button}>
              <Button title='Login' onPress={this.handleSubmit} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '500',
    paddingBottom: 15,
    paddingTop: 10
  },
  image: {
    marginTop: 5
  },
  container: {
    alignItems: 'center',
    height: 'auto',
    overflow: 'visible'
  },
  loginContainer: {
    marginTop: 15,
    width: 'auto'
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    margin: 15,
    width: 'auto',
    padding: 5
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 125,
    height: 40
  }
})

export default graphql(signinUser)(LoginScreen)
