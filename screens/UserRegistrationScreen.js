// React
import React, { Component } from 'react'

// React Native
import { View, Text, TextInput } from 'react-native'

export default class UserRegistrationScreen extends Component {
  render () {
    return (
      <View>
        <Text> Create task </Text>
        <View>
          <TextInput />
        </View>
      </View>
    )
  }
}
