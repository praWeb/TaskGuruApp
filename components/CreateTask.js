// React
import React, { Component } from 'react'

// React Native
import { View } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'

export default class CreateTask extends Component {
  render () {
    return (
      <View style={{padding: 15}}>
        <Text style={{alignItems: 'center'}}> Create Task </Text>
        <View>
          <TextInput
            label='Title'
            placeholder='Task title'
            autoCapitalize='sentences'
            value={this.props.title}
            onChangeText={(text) => this.props.handleChange(text, 'title')}
          />
        </View>
        <View>
          <TextInput
            label='Description'
            placeholder='Task description in detail'
            multiline
            autoCapitalize='sentences'
            value={this.props.description}
            onChangeText={(text) => this.props.handleChange(text, 'description')}
          />
        </View>
        <View>
          <Button raised primary onPress={this.props.handleSubmit}>
            Create Task
          </Button>
        </View>
      </View>
    )
  }
}
