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

class TaskListScreen extends Component {
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

const task = gql`
  query {
    allTasks (first: 5){
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
export default graphql(task)(TaskListScreen)
