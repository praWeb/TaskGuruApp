// React
import React, { Component } from 'react'

// React-Native
import { View, StyleSheet } from 'react-native'
import { Input, Text, Button, Title } from 'native-base'

export default class Registration extends Component {
  render () {
    const handleChange = this.props.handleChange
    const handleSubmit = this.props.handleSubmit

    return (
      <View style={styles.container}>
        <Title> Create Profile </Title>
        <Input
          label='Name'
          placeholder='Name'
          value={this.props.name}
          onChangeText={(text) => handleChange(text, 'name')}
        />
        <Input
          label='Email'
          placeholder='Enter in your email address'
          keyboardType='email-address'
          value={this.props.email}
          onChangeText={(text) => handleChange(text, 'email')}
        />
        <Input
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          value={this.props.password}
          onChangeText={(text) => handleChange(text, 'password')}
        />
        <Button raised primary onPress={handleSubmit}>
          <Text>
            Register
          </Text>
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