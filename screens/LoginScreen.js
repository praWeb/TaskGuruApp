// React
import React from 'react'

// React Native
import { StyleSheet, View, AsyncStorage, Image, TouchableOpacity, Text } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import { signinUser } from '../server/queries.js'

// Components
import Login from './../components/Login'
import Notification from './../objects/Notification'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      error: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount () {
    this.verifyUser()
  }

  async verifyUser () {
    try {
      let email = await AsyncStorage.getItem('UserEmail')
      this.logIn(email)
    } catch (error) {
      this.setState({error: error})
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
      if (response.data) {
        try {
          AsyncStorage.setItem('UserToken', response.data.signinUser.token)
          AsyncStorage.setItem('UserEmail', this.state.email)
          this.logIn(this.state.email)
        } catch (error) {
          console.log('Storing user token failed.' + error)
        }
      }
      navigate('Home', {
        email: this.state.email
      })
    }).catch((error) => {
      this.setState({error: error})
    })
  }

  logIn (email) {
    if (email) {
      this.setState({error: ''})
      this.setState({
        isLoggedIn: true,
        email: email
      })
    } else {
      this.setState({
        isLoggedIn: false,
        email: ''
      })
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

  navigateFurther () {
    const { navigate } = this.props.navigation

    if (this.state.isLoggedIn) {
      navigate('Home', {
        email: this.state.email
      })
    }
  }

  render () {
    return (
      <View>
        <View style={styles.container} >
          <Text style={styles.text}> Welcome to TASK GURU!</Text>
          <TouchableOpacity onPress={() => this.navigateFurther()}>
            <Image style={styles.image}
              source={require('./../images/Slice.png')}
            />
          </TouchableOpacity>
        </View>
        <Notification error={this.state.error} />
        <Login
          {...this.props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          logOut={this.logOut}
          {...this.state}
        />
      </View>
    )
  }
}

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
  }
})

export default graphql(signinUser)(LoginScreen)
