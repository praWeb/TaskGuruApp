// React
import React from 'react'

// React native
import { View } from 'react-native'

// Graphql
import { graphql, compose } from 'react-apollo'
import { TaskDetailsQuery, UpdateStatus } from '../server/queries.js'

// Components
import TaskDetails from './../components/TaskDetails'
import Notification from './../objects/Notification'

class TaskDetailScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      success: '',
      error: ''
    }

    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus (status) {
    let data = this.props.data

    this.props.updateStatus({
      variables: {
        taskID: data.Task.id,
        statusID: status.id
      }
    }).then((response) => {
      if (response.data) {
        this.setState({success: 'Status updated successfully!'})
      }
    }).catch((error) => {
      this.setState({error: error})
    })
  }

  render () {
    return (
      <View>
        <Notification error={this.state.error} success={this.state.success} />
        { !this.props.data.loading && this.props.data.Task && this.props.data.allStatuses &&
          <TaskDetails task={this.props.data.Task} statusList={this.props.data.allStatuses} updateStatus={this.updateStatus} />
        }
      </View>
    )
  }
}

export default compose(
  graphql(UpdateStatus, {
    name: 'updateStatus'
  }),
  graphql(TaskDetailsQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.navigation.state.params.taskId
        }
      }
    }
  })
)(TaskDetailScreen)
