// React
import React, { Component } from 'react'

// React Native
import { AsyncStorage } from 'react-native'

// Components
import Layout from './../components/Layout'
import Introduction from './../components/Introduction'

export default class HomeScreen extends Component {
  constructor () {
    super()
    this.state = {
      userName: ''
    }
    this.getUserName = this.getUserName.bind(this)
  }

  componentDidMount () {
    this.getUserName()
  }

  async getUserName () {
    try {
      const username = await AsyncStorage.getItem('UserEmail')
      this.setState({userName: username})
    } catch (error) {
      // Error retrieving data
      console.log('Error while retrieving username' + error)
    }
  }

  render () {
    return (
      <Layout>
        <Introduction {...this.props} userName={this.state.userName} />
      </Layout>
    )
  }
}
