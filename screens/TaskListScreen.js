// React
import React, { Component } from 'react'

// React native
import { View, StyleSheet } from 'react-native'

// Components
import Layout from './../components/Layout'
import TaskList from './../components/TaskList'

export default class TaskListScreen extends Component {
  render () {
    return (
      <Layout>
        <View style={styles.taskContainer}>
          <TaskList />
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
