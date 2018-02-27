// React
import React from 'react'

// React Native
import { AsyncStorage } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import { signinUser } from '../server/queries.js'

// Components
import Login from './../components/Login'

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
        AsyncStorage.setItem('UserId', '')
      } catch (error) {
        console.log('Storing user token failed.' + error)
      }
      navigate('Home', {
        email: this.state.email
      })
    })
  }

  render () {
    return (
      <Login {...this.props} handleChange={this.handleChange} handleSubmit={this.handleSubmit} {...this.state} />
    )
  }
}

export default graphql(signinUser)(LoginScreen)
