// React
import React, { Component } from 'react'

// React Native
import { View } from 'react-native'

// components
import Header from './layout/Header'

export default class Layout extends Component {
  render () {
    return (
      <View>
        <Header />
        {this.props.children}
      </View>
    )
  }
}
