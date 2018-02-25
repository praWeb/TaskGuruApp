// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// React-native
import { AsyncStorage } from 'react-native'

// Components
import Layout from './../components/Layout'
import Introduction from './../components/Introduction'

class HomeScreen extends Component {
  constructor () {
    super()
    this.state = {
      userName: ''
    }
  }

  componentWillReceiveProps (oldProps, newProps) {
    // See if we have received the data
    if (oldProps.data) {
      this.storeUserId(oldProps)
    }
  }

  async storeUserId (props) {
    try {
       // Store UserId details
      await AsyncStorage.setItem('UserId', props.data.User.id)
    } catch (error) {
      console.log('Error in storing UserId')
    }
  }

  render () {
    return (
      <Layout>
        { !this.props.data.loading && this.props.data.User &&
          <Introduction {...this.props} userName={this.props.data.User.name} />
        }
      </Layout>
    )
  }
}

HomeScreen.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    Task: PropTypes.object
  }).isRequired
}

const getUserDetails = gql`
  query UserDetails($email: String!) {
    User(email: $email){
      id
      name
    }
  }
`

export default graphql(getUserDetails, {
  options: (props) => {
    return {
      variables: {
        email: props.navigation.state.params.email
      }
    }
  }
})(HomeScreen)
