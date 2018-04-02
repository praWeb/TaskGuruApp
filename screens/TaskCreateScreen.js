// React
import React, { Component } from 'react'

// React Native
import { AsyncStorage } from 'react-native'

// Graphql
import { graphql } from 'react-apollo'
import { createTask } from '../server/queries.js'

// Components
import CreateTask from './../components/CreateTask'

class TaskCreateScreen extends Component {
  constructor (props) {
    super(props)

    // @TODO: Integrate with status dropdown
    this.state = {
      title: '',
      description: '',
      userId: '',
      statusId: 'cj9izircjn6ti0104d7pluu18'
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  componentDidMount () {
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

  resetState () {
    this.setState({
      title: '',
      description: ''
    })
  }

  handleSubmit () {
    const { navigate } = this.props.navigation
    this.props.mutate({
      variables: {
        title: this.state.title,
        description: this.state.description,
        userId: this.state.userId,
        statusId: this.state.statusId
      }
    }).then((response) => {
      if (response.data.createTask.id) {
        this.resetState()
        navigate('TaskDetail', {
          taskId: response.data.createTask.id
        })
      } else {
        // Handle errors
      }
    })
  }

  handleChange (text, field) {
    let newState = this.state
    newState[field] = text
    this.setState(Object.assign({}, this.state, newState))
  }

  render () {
    return (
      <CreateTask
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default graphql(createTask)(TaskCreateScreen)
