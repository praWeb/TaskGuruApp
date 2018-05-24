// React
import React, { Component } from 'react'

// Graphql
import { graphql } from 'react-apollo'
import { createUser } from '../server/queries.js'

// React-native
import { View, AsyncStorage } from 'react-native'

// Internal Components
import Registration from '../components/Registration.js'
import Notification from '../objects/Notification.js'

// lib
import uuidV4 from 'uuid/v4'

class UserRegistrationScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      name: '',
      password: '',
      response: '',
      error: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    
    this.props.createUser({
      variables: {
        id: uuidV4(),
        isVerified: true,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        email: this.state.email,
        name: this.state.name,
        password: this.state.password
      }
    }).then((response) => {
      if (response.data) {
        this.storeUserDetails(response)
        navigate('Home', {email: this.state.email})
      }
    }).catch((error) => {
      console.log(error)
      this.setState({error: error})
    })
  }

  async storeUserDetails (response) {
    try {
      AsyncStorage.setItem('UserToken', response.data.createUser.id)
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
      <View>
        <Notification error={this.state.error} />
        <Registration
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          {...this.props}
          {...this.state} />
      </View>
    )
  }
}

export default graphql(createUser, { name: 'createUser' })(UserRegistrationScreen)
