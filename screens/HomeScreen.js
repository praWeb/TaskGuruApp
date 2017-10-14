// React
import React, { Component } from 'react'

// Components
import Layout from './../components/Layout'
import Introduction from './../components/Introduction'

export default class HomeScreen extends Component {
  render () {
    return (
      <Layout>
        <Introduction {...this.props} />
      </Layout>
    )
  }
}
