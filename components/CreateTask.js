// React
import React, { Component } from 'react'

// React Native
import { View, Text, TextInput, Button } from 'react-native'

export default class CreateTask extends Component {
  render () {
    return (
      <View>
        <Text style={{padding: 15, alignItems: 'center'}}> Create Task </Text>
        <View style={{padding: 15}}>
          <TextInput
            placeholder='title'
            autoCapitalize='sentences'
            value={this.props.title}
            onChangeText={(text) => this.props.handleChange(text, 'title')}
          />
        </View>
        <View style={{padding: 15}}>
          <TextInput
            placeholder='description'
            multiline
            autoCapitalize='sentences'
            value={this.props.description}
            onChangeText={(text) => this.props.handleChange(text, 'description')}
          />
        </View>
        <View style={{padding: 15}}>
          <Button title='Create Task' onPress={this.props.handleSubmit} />
        </View>
      </View>
    )
  }
}
