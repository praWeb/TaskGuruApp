// React
import React, { Component } from 'react'
// Apollo
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// React Native
import { StackNavigator } from 'react-navigation'
import { Root } from 'native-base'
import { Font, AppLoading } from "expo";

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
  constructor (props) {
    super(props);
    this.state = { loading: true }
  }

  async componentWillMount () {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false });
  }

  render () {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <Root>
        <ApolloProvider client={client}>
          <HomeNavigation />
        </ApolloProvider>
      </Root>
    )
  }
}
