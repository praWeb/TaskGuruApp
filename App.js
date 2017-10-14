// React
import React, { Component } from 'react'

// React Native
import { StackNavigator } from 'react-navigation'

// Screens
import HomeScreen from './screens/HomeScreen'
import TasksListScreen from './screens/TaskListScreen'

const HomeNavigation = StackNavigator({
  Home: { screen: HomeScreen },
  TaskLists: { screen: TasksListScreen }
})

export default class App extends Component {
  render () {
    return (
      <HomeNavigation />
    )
  }
}
