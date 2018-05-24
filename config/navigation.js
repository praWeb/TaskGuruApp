// React native Navigation
import { StackNavigator } from 'react-navigation'

// Screens
import HomeScreen from './../screens/HomeScreen'
import TasksListScreen from './../screens/TaskListScreen'
import TaskCreateScreen from './../screens/TaskCreateScreen'
import UserRegistrationScreen from './../screens/UserRegistrationScreen'
import TaskDetailScreen from './../screens/TaskDetailScreen'
import LoginScreen from './../screens/LoginScreen'

// ApolloProvider
import ApolloProviderHOC from './ApolloProviderHOC'

export const HomeNavigation = StackNavigator({
  Home: { screen: ApolloProviderHOC(HomeScreen) },
  UserRegistration: { screen: ApolloProviderHOC(UserRegistrationScreen) },
  TaskLists: { screen: ApolloProviderHOC(TasksListScreen) },
  TaskCreate: { screen: ApolloProviderHOC(TaskCreateScreen) },
  TaskDetail: { screen: ApolloProviderHOC(TaskDetailScreen) },
  Login: { screen: ApolloProviderHOC(LoginScreen) }
}, {
  initialRouteName: 'Login'
})
