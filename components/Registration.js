// React
import React, { Component } from 'react'

// React-Native
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Title } from 'react-native-paper'

export default class Registration extends Component {
  render () {
    const handleChange = this.props.handleChange
    const handleSubmit = this.props.handleSubmit

    return (
      <View style={styles.container}>
        <Title> Create Profile </Title>
        <TextInput
          label='Name'
          placeholder='Name'
          value={this.props.name}
          onChangeText={(text) => handleChange(text, 'name')}
        />
        <TextInput
          label='Email'
          placeholder='Enter in your email address'
          keyboardType='email-address'
          value={this.props.email}
          onChangeText={(text) => handleChange(text, 'email')}
        />
        <TextInput
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          value={this.props.password}
          onChangeText={(text) => handleChange(text, 'password')}
        />
        <Button raised primary onPress={handleSubmit}>
          Register
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
})