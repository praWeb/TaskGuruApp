// React
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// React Native
import { StackNavigator } from 'react-navigation'

// Screens
import HomeScreen from './screens/HomeScreen'
import TasksListScreen from './screens/TaskListScreen'
import TaskCreateScreen from './screens/TaskCreateScreen'
import UserRegistrationScreen from './screens/UserRegistrationScreen'

const HomeNavigation = StackNavigator({
  Home: { screen: HomeScreen },
  TaskLists: { screen: TasksListScreen },
  TaskCreate: { screen: TaskCreateScreen },
  UserRegistration: { screen: UserRegistrationScreen }
})

export default class App extends Component {
  render () {
    return (
      <HomeNavigation />
    )
  }
}
