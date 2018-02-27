// React
import React, { Component } from 'react'

// Graphql
import { graphql } from 'react-apollo'
import { getUserDetails } from '../server/queries.js'

// React-native
import { AsyncStorage } from 'react-native'

// Components
import Layout from './../components/Layout'
import Introduction from './../components/Introduction'

class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: ''
    }
  }

  componentWillReceiveProps (props) {
    // See if we have received the data
    if (props.data) {
      this.storeUserId(props)
    }
  }

  async storeUserId (props) {
    try {
       // Store UserId details
      await AsyncStorage.setItem('UserId', props.data.User.id)
    } catch (error) {
      console.log('Error in storing UserId' + error)
    }
  }

  render () {
    const data = this.props.data

    return (
      <Layout>
        { !data.loading && data.User &&
          <Introduction {...this.props} userName={data.User.name} />
        }
      </Layout>
    )
  }
}

export default graphql(getUserDetails, {
  options: (props) => {
    return {
      variables: {
        email: props.navigation.state.params.email
      }
    }
  }
})(HomeScreen)
