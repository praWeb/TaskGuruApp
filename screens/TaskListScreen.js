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
      userId: '',
      tasksPerPage: 3,
      page: 0
    }

    this.fetchNext = this.fetchNext.bind(this)
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
        console.log(prev)
        console.log(fetchMoreResult)
        if (!fetchMoreResult) return prev
        let currentPage = this.state.page + this.state.tasksPerPage
        this.setState({ page: currentPage })
        return Object.assign({}, prev, {
          allTasks: [...prev.allTasks, ...fetchMoreResult.allTasks]
        })
      }
    })
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
    console.log(this.props.data)
    return (
      <Layout>
        <View style={styles.taskContainer}>
          { !this.props.data.loading && this.props.data.allTasks &&
            <TaskList
              tasks={this.props.data.allTasks}
              navigation={this.props.navigation}
              fetchNext={this.fetchNext}
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

export default graphql(TaskListQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.navigation.state.params.userId,
        first: 3,
        skip: 0
      }
    }
  }
})(TaskListScreen)
