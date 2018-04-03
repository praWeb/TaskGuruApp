// React
import React, { Component } from 'react'

// React native
import { View, StyleSheet, AsyncStorage } from 'react-native'

// Graphql
import { graphql, compose } from 'react-apollo'
import { TaskListQuery, DeleteTask } from '../server/queries.js'

// Components
import Layout from './../components/Layout'
import TaskList from './../components/TaskList'
import Notification from './../objects/Notification'

// Pagination Constants
const TASKS_PER_REQUEST = 5

class TaskListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: 5,
      limit: TASKS_PER_REQUEST,
      userId: '',
      tasksPerPage: 3,
      page: 0,
      error: ''
    }

    this.fetchNext = this.fetchNext.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  componentWillMount () {
    this.getUserId()
  }

  fetchNext () {
    this.props.data.fetchMore({
      variables: {
        skip: this.state.page + this.state.tasksPerPage
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        let currentPage = this.state.page + this.state.tasksPerPage
        this.setState({ page: currentPage })
        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks]
        })
      }
    })
  }

  deleteTask (taskId) {
    this.props.data.loading = true
    this.props.mutate({
      variables: {
        id: taskId
      }
    }).then((response) => {
      this.props.data.loading = false
      this.trimTasks(response.data.deleteTask.id)
      this.setState({ error: ''})
    }).catch((error) => {
      this.props.data.loading = false
      this.setState({error: error})
      console.log("Error in deleting task")
    })
  }

  trimTasks (taskId) {
    let allTasks = this.props.data.allTasks
    this.props.data.allTasks = Object.assign([], allTasks.filter(_task => _task.id !== taskId))
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
        <Notification error={this.state.error} />
        <View style={styles.taskContainer}>
          { !this.props.data.loading && this.props.data.allTasks &&
            <TaskList
              tasks={this.props.data.allTasks}
              navigation={this.props.navigation}
              fetchNext={this.fetchNext}
              deleteTask={this.deleteTask}
            />
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

export default compose(
graphql(TaskListQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.navigation.state.params.userId,
        first: 3,
        skip: 0
      }
    }
  }
}),
graphql(DeleteTask)
)(TaskListScreen)
