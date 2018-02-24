// React
import React, { Component } from 'react'

// React native
import { View, StyleSheet } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
      limit: TASKS_PER_REQUEST
    }
  }
  render () {
    return (
      <Layout>
        <View style={styles.taskContainer}>
          <TaskList tasks={this.props.data.allTasks} navigation={this.props.navigation} />
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

const taskQuery = gql`
  query getTasks{
    allTasks(first: 5){
      id
      title
      description
      createdAt
      updatedAt
      user {
        email
        name
      }
      status {
        id
        title
        percentCompleted
      }
    }
  }
`
export default graphql(taskQuery, {
  options: (props) => {
    return {
      variables: {
        offset: props.navigation.state.offset || 0,
        limit: props.navigation.state.limit || 10
      }
    }
  }
})(TaskListScreen)
