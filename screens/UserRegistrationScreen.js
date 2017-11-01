// React
import React, { Component } from 'react'

// React Native
import { View, Text, TextInput, Button } from 'react-native'

export default class UserRegistrationScreen extends Component {
  render () {
    return (
      <View>
        <Text style={{padding: 15, alignItems: 'center'}}> Create Profile </Text>
        <View style={{padding: 15}}>
          <TextInput placeholder='Name' />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='Email' keyboardType='email-address' />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='Password' secureTextEntry />
        </View>
        <View style={{padding: 15}}>
          <Button title='Register' />
        </View>
      </View>
    )
  }
}
