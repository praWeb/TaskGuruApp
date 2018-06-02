// React
import React, { Component } from 'react'

//  React-native
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-vector-icons/FontAwesome'

export default class Notification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      type: ''
    }
  }
  processResponse (response) {
    if (response.error && response.error.graphQLErrors) {
      return this.processErrors(response.error)
    } else if (response.success) {
      return this.processSuccess(response.success)
    }
  }

  processSuccess (successResponse) {
    return {
      type: 'success',
      icon: 'thumbs-up',
      message: successResponse
    }
  }

  processErrors (error) {
    return {
      type: 'error',
      icon: 'thumbs-down',
      message: error.graphQLErrors[0].message
    }
  }

  renderMessage (message) {
    return (
      <View style={styles.media}>
        <View style={styles.mediaImage}>
          {/* TODO: ICONS HAVE TO BE FIXED */}
          {/* <Icon name={message.icon} color={styles[message.type]} /> */}
        </View>
        <Text style={[styles.text, styles[message.type]]}>
          { message.message }
        </Text>
      </View>
    )
  }

  render () {
    let message = this.processResponse(this.props) || {}
    return (
      <View>
        {/* Show notification only if there is a message */}
        {
          message.type && this.renderMessage(message)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    padding: 20,
    fontSize: 15
  },
  success: {
    color: '#00cc00',
  },
  error: {
    color: '#ff704d',
  },
  media: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 10
  },
  mediaImage: {
    marginLeft: 15
  },
  mediaText: {
    fontWeight: '300'
  }
})
