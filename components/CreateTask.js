// React
import React, { Component } from 'react'

// React Native
import { Content, H3, Text, Button, Input, Item } from 'native-base'

export default class CreateTask extends Component {
  render () {
    return (
      <Content style={{ padding: 15 }}>
        <H3 style={{ alignSelf: 'center' }}> Create Task </H3>
        <Text style={{ alignSelf: 'center', fontStyle: 'italic' }}> (Try to fill in as much as you can) </Text>
        <Item style={{ marginTop: 10 }}>
          <Input
            placeholder='Task title'
            autoCapitalize='sentences'
            value={this.props.title}
            onChangeText={(text) => this.props.handleChange(text, 'title')}
          />
        </Item>
        <Item style={{marginTop: 20, paddingBottom: 30}}>
          <Input
            placeholder='Task description in detail'
            multiline
            autoCapitalize='sentences'
            value={this.props.description}
            onChangeText={(text) => this.props.handleChange(text, 'description')}
          />
        </Item>
        <Button primary onPress={this.props.handleSubmit} style={{ marginTop: 15, alignSelf: 'center' }}>
          <Text>
            Create Task
          </Text>
        </Button>
      </Content>
    )
  }
}
