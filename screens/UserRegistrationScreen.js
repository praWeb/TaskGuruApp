// React
import React, { Component } from 'react'
import { withRouter } from 'react-router-native'  

// React Native
import { View, Text, TextInput, Button } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class UserRegistrationScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      name: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit () {
    this.props.mutate({
      variables: { email: this.state.email, name: this.state.name, password: this.state.password }
    }).then((response) => {
      console.log(response)
    })
  }

  handleChange (text, field) {
    let newState = this.state
    newState[field] = text
    this.setState(Object.assign({}, this.state, newState))
  }

  render () {
    return (
      <View>
        <Text style={{padding: 15, alignItems: 'center'}}> Create Profile </Text>
        <View style={{padding: 15}}>
          <TextInput placeholder='Name' value={this.state.name} onChangeText={(text) => this.handleChange(text, 'name')} />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='Email' keyboardType='email-address' value={this.state.email} onChangeText={(text) => this.handleChange(text, 'email')} />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='Password' secureTextEntry value={this.state.password} onChangeText={(text) => this.handleChange(text, 'password')} />
        </View>
        <View style={{padding: 15}}>
          <Button title='Register' onPress={this.handleSubmit} />
        </View>
      </View>
    )
  }
}

const createUser = gql`
mutation createUser($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    id
    name
    createdAt
  }
}
`

export default graphql(createUser)(UserRegistrationScreen)
