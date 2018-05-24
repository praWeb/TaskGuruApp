// React
import React, { Component } from 'react'

// AWS
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

import {HomeNavigation} from './config/navigation'

Amplify.configure(aws_exports)


class App extends Component {
  render () {
    return (
      <HomeNavigation />
    )
  }
}

export default App
