// React
import React, { Component } from 'react'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// React-native
import { AsyncStorage } from 'react-native'

// Internal Components
import Registration from '../components/Registration.js'

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
    const { navigate } = this.props.navigation
    this.props.mutate({
      variables: { email: this.state.email, name: this.state.name, password: this.state.password }
    }).then((response) => {
      // TODO integrate with notification component
      console.log(response)
      this.storeUserDetails(response)
      navigate('Home')
    })
  }

  async storeUserDetails (response) {
    try {
      AsyncStorage.setItem('UserId', response.data.createUser.id)
      AsyncStorage.setItem('UserEmail', this.state.email)
    } catch (error) {
      console.log('Storing user token failed.' + error)
    }
  }

  handleChange (text, field) {
    let newState = this.state
    newState[field] = text
    this.setState(Object.assign({}, this.state, newState))
  }

  render () {
    return (
      <Registration
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        {...this.props}
        {...this.state} />
    )
  }
}

const createUser = gql`
mutation createUser($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, authProvider: {
    email: { email: $email, password: $password } } ) {
    id
    name
    createdAt
  }
}
`

export default graphql(createUser)(UserRegistrationScreen)
