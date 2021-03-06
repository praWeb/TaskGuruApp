// React
import React, { Component } from 'react'
// Apollo
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// React Native
import { StackNavigator } from 'react-navigation'
import { Provider as PaperProvider } from 'react-native-paper'

// Screens
import HomeScreen from './screens/HomeScreen'
import TasksListScreen from './screens/TaskListScreen'
import TaskCreateScreen from './screens/TaskCreateScreen'
import UserRegistrationScreen from './screens/UserRegistrationScreen'
import TaskDetailScreen from './screens/TaskDetailScreen'
import LoginScreen from './screens/LoginScreen'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cj9elu5jl59n301406gzmd5ll' }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

const HomeNavigation = StackNavigator({
  Home: { screen: HomeScreen },
  TaskLists: { screen: TasksListScreen },
  TaskCreate: { screen: TaskCreateScreen },
  UserRegistration: { screen: UserRegistrationScreen },
  TaskDetail: { screen: TaskDetailScreen },
  Login: { screen: LoginScreen }
}, {
  initialRouteName: 'Login'
})

export default class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <PaperProvider>
          <HomeNavigation />
        </PaperProvider>
      </ApolloProvider>
    )
  }
}
