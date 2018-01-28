// React
import React from 'react'
import PropTypes from 'prop-types'

// React native
import { View } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
TaskDetailScreen.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    Task: PropTypes.object
  }).isRequired
}

const task = gql`
  query getTasks($id: ID!) {
    Task(id: $id) {
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
export default graphql(task, {
  options: (props) => {
    return {
      variables: {
        id: props.navigation.state.params.taskId
      }
    }
  }
})(TaskDetailScreen)
