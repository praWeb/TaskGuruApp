// React
import React, { Component } from 'react'

// React-Native
import { View, StyleSheet } from 'react-native'
import { Input, H3, Item, Text, Button, Title } from 'native-base'

export default class Registration extends Component {
  render () {
    const handleChange = this.props.handleChange
    const handleSubmit = this.props.handleSubmit

    return (
      <View style={styles.container}>
        <H3 style={{ alignSelf: 'center' }}> Create Profile </H3>
        <Item style={{ marginTop: 10 }} >
          <Input
            label='Name'
            placeholder='Name'
            value={this.props.name}
            onChangeText={(text) => handleChange(text, 'name')}
          />
        </Item>
        <Item style={{ marginTop: 10 }}>
          <Input
            label='Email'
            placeholder='Enter in your email address'
            keyboardType='email-address'
            value={this.props.email}
            onChangeText={(text) => handleChange(text, 'email')}
          />
        </Item>
        <Item style={{ marginTop: 10 }}>
          <Input
            label='Password'
            placeholder='Enter your password'
            secureTextEntry
            value={this.props.password}
            onChangeText={(text) => handleChange(text, 'password')}
          />
        </Item>
        <Button primary onPress={handleSubmit} style={{ alignSelf: 'center', marginTop: 20 }}>
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