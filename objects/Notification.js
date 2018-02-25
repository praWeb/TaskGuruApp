// React
import React, { Component } from 'react'

//  React-native
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default class Notification extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      type: ''
    }
  }
  processResponse (response) {
    console.log(response)
    return response
  }

  processErrors (error) {
    if (error && error.graphQLErrors) {
      return error.graphQLErrors[0].message
    }
  }
  render () {
    this.processResponse(this.props.response)
    let errors = this.processErrors(this.props.error) || []
    return (
      <View>
        <View style={styles.media}>
          <Icon type='font-awesome' name='user' iconStyle={styles.mediaImage} />
          <Text style={[styles.text, styles.error]}>
            { errors }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    padding: 20
  },
  error: {
    color: '#841584',
    fontSize: 15
  },
  media: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  mediaText: {
    fontWeight: '300'
  }
})
