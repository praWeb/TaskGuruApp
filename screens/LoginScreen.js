// React
import React from 'react'

// React Native
import { Text, View, TextInput, Button, AsyncStorage } from 'react-native'

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
        console.log("Storing user token failed."+ error)
      }
      navigate('Home')
    })
  }

  render () {
    return (
      <View>
        <Text> Login </Text>
        <View>
          <TextInput placeholder='Email' value={this.state.email} onChangeText={(text) => this.handleChange(text, 'email')} />
          <TextInput placeholder='Password' secureTextEntry value={this.state.password} onChangeText={(text) => this.handleChange(text, 'password')} />
          <Button title='Login' onPress={this.handleSubmit} />
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

export default graphql(signinUser)(LoginScreen)
