// React
import React, { Component } from 'react'

// React-Native
import { View, Text, Button, TextInput } from 'react-native'

export default class Registration extends Component {
  render () {
    const handleChange = this.props.handleChange
    const handleSubmit = this.props.handleSubmit

    return (
      <View>
        <Text style={{padding: 15, alignItems: 'center'}}> Create Profile </Text>
        <View style={{padding: 15}}>
          <TextInput placeholder='Name' value={this.props.name} onChangeText={(text) => handleChange(text, 'name')} />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='Email' keyboardType='email-address' value={this.props.email} onChangeText={(text) => handleChange(text, 'email')} />
        </View>
        <View style={{padding: 15}}>
          <TextInput placeholder='Password' secureTextEntry value={this.props.password} onChangeText={(text) => handleChange(text, 'password')} />
        </View>
        <View style={{padding: 15}}>
          <Button title='Register' onPress={handleSubmit} />
        </View>
      </View>
    )
  }
}
