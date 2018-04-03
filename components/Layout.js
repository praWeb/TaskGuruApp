// React
import React, { Component } from 'react'

// React Native
import { Container } from 'native-base' 

// components
import Header from './layout/Header'

export default class Layout extends Component {
  render () {
    return (
      <Container>
        <Header />
        {this.props.children}
      </Container>
    )
  }
}
