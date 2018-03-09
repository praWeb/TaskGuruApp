// React
import React, { Component } from 'react'

// React native
import { View, StyleSheet, AsyncStorage } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import { TaskListQuery } from '../server/queries.js'

// Components
import Layout from './../components/Layout'
import TaskList from './../components/TaskList'

// Pagination Constants
const TASKS_PER_REQUEST = 5

class TaskListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: 5,
      limit: TASKS_PER_REQUEST,
      userId: ''
    }
  }

  componentWillMount () {
    this.getUserId()
  }

  async getUserId () {
    try {
      let userId = await AsyncStorage.getItem('UserId')
      this.setState({ userId: userId })
    } catch (error) {
      console.log('Error in retrieving UserId' + error)
    }
  }

  render () {
    return (
      <Layout>
        <View style={styles.taskContainer}>
          { !this.props.data.loading && this.props.data.User &&
            <TaskList
              tasks={this.props.data.User.tasks}
              navigation={this.props.navigation} />
          }
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#fff'
  }
})

export default graphql(TaskListQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.navigation.state.params.userId
      }
    }
  }
})(TaskListScreen)
