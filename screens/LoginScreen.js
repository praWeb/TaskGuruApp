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
    console.log("in the conrstorct...")
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount () {
    console.log("will munt in the user...")
    this.verifyUser()
  }

  async verifyUser () {
    try {
      let email = await AsyncStorage.getItem('UserEmail')
      this.logIn(email)
    } catch (error) {
      console.log('Error in retrieving user email details' + error)
    }
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
        this.logIn(this.state.email)
      } catch (error) {
        console.log('Storing user token failed.' + error)
      }
      navigate('Home', {
        email: this.state.email
      })
    })
  }

  logIn (email) {
    if (email) {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false })
    }
  }

  logOut () {
    try {
      AsyncStorage.setItem('UserToken', '')
      AsyncStorage.setItem('UserEmail', '')
      AsyncStorage.setItem('UserId', '')
      this.resetState()
    } catch (error) {
      console.log('Error while loggingout.' + error)
    }
  }

  resetState () {
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false
    })
  }

  render () {
    return (
      <Login
        {...this.props}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        logOut={this.logOut}
        {...this.state}
      />
    )
  }
}

export default graphql(signinUser)(LoginScreen)
