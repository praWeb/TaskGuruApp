// React
import React, { Component } from 'react'

// React native
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Text, Button, ActionSheet } from 'native-base'

var BUTTONS = [
  { text: 'Yes! Delete', icon: 'trash', iconColor: '#fa213b' },
  { text: 'Cancel', icon: 'close', iconColor: '#25de5b' }
];

export default class TaskList extends Component {
  constructor () {
    super()
    this.state = {
      viewableItems: [],
      currentTaskId: ''
    }
    this.openModal = this.openModal.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  openModal (taskId) {
    this.setState({ currentTaskId: taskId })

    ActionSheet.show(
      {
        options: BUTTONS,
        title: 'Select an option'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.deleteTask()
        }
        this.setState({ currentTaskId: '' })
      }
    )
  }

  deleteTask () {
    this.props.deleteTask(this.state.currentTaskId)
  }

  renderTask (task) {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.taskView}>
        <Card>
          <CardItem onPress={() => navigate('TaskDetail', {taskId: task.id})} header>
            <Text style={styles.taskTitle}>
              {task.title}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.taskContent}>
                { task.description }
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Button onPress={() => navigate('TaskDetail', {taskId: task.id})}>
              <Text>
                Edit
              </Text>
            </Button>
            <Button onPress={() => this.openModal(task.id) }>
              <Text>
                Delete 
              </Text>
            </Button>
          </CardItem>
        </Card>
      </View>
    )
  }

  render () {
    const tasks = this.props.tasks

    return (
      <View style={styles.container}>
        <FlatList
          data={tasks}
          ref={r => this.refs}
          renderItem={({item}) =>
            this.renderTask(item)
          }
          keyExtractor={(item, index) => item.id}
          containerStyle={{ borderBottomWidth: 0, flexGrow: 1 }}
          onViewableItemsChanged={this.onViewableItemsChanged}
          onEndReached={this.props.fetchNext}
          onEndThreshold={0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50
  },
  taskView: {
    width: '100%',
    paddingVertical: 15
  },
  taskTitle: {
    fontWeight: '400',
    fontSize: 18,
    color: '#0000ff'
  },
  taskContent: {
    fontSize: 16
  }
})
