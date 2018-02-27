// React
import React from 'react'

// React native
import { View } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import { TaskDetailsQuery } from '../server/queries.js'

// Components
import TaskDetails from './../components/TaskDetails'

class TaskDetailScreen extends React.Component {
  render () {
    return (
      <View>
        { !this.props.data.loading && this.props.data.Task &&
          <TaskDetails task={this.props.data.Task} />
        }
      </View>
    )
  }
}

export default graphql(TaskDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.navigation.state.params.taskId
      }
    }
  }
})(TaskDetailScreen)
