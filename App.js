// React
import React, { Component } from 'react'

// React Native
import { StackNavigator } from 'react-navigation'

// Components
import Layout from './components/Layout'
import Introduction from './components/Introduction'
import TasksLists from './components/TaskLists'

class HomeScreen extends Component {
  render () {
    return (
      <Layout>
        <Introduction {...this.props} />
      </Layout>
    )
  }
}

const HomeNavigation = StackNavigator({
  Home: { screen: HomeScreen },
  TaskLists: { screen: TasksLists }
})

export default class App extends Component {
  render () {
    return (
      <HomeNavigation />
    )
  }
}
