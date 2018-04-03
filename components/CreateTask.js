// React
import React, { Component } from 'react'

// React Native
import { View } from 'react-native'
import { Text, Button, Input } from 'native-base'

export default class CreateTask extends Component {
  render () {
    return (
      <View style={{padding: 15}}>
        <Text style={{alignItems: 'center'}}> Create Task </Text>
        <View>
          <Input
            label='Title'
            placeholder='Task title'
            autoCapitalize='sentences'
            value={this.props.title}
            onChangeText={(text) => this.props.handleChange(text, 'title')}
          />
        </View>
        <View>
          <Input
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
            <Text>
              Create Task
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}
