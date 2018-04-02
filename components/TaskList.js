// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, CardActions, CardContent, Paragraph, Button, Modal } from 'react-native-paper'

export default class TaskList extends Component {
  constructor () {
    super()
    this.state = {
      viewableItems: [],
      isModalVisible: false,
      currentTaskId: ''
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  openModal (taskId) {
    this.setState({isModalVisible: true, currentTaskId: taskId })
  }

  closeModal () {
    this.setState({isModalVisible: false, currentTaskId: '' })
  }

  deleteTask () {
    this.props.deleteTask(this.state.currentTaskId)
    this.closeModal()
  }

  renderTask (task) {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.taskView}>
        <Card>
          <CardContent>
            <TouchableOpacity onPress={() => navigate('TaskDetail', {taskId: task.id})}>
              <Text style={styles.taskTitle}>
                {task.title}
              </Text>
              <Paragraph style={styles.taskContent}>
                { task.description }
              </Paragraph>
            </TouchableOpacity>
          </CardContent>
          <CardActions>
            <Button onPress={() => navigate('TaskDetail', {taskId: task.id})}> Edit </Button>
            <Button onPress={() => this.openModal(task.id)}> Delete </Button>
          </CardActions>
        </Card>
      </View>
    )
  }

  renderModal () {
    return (
      <Modal visible={this.state.isModalVisible} dismissable={true} onDismiss={this.closeModal}>
        <Card>
          <CardContent>
            <Text>Are you sure you want to delete this task?</Text>
          </CardContent>
          <CardActions>
            <Button onPress={this.closeModal}> Cancel </Button>
            <Button onPress={this.deleteTask}> Yes </Button>
          </CardActions>
        </Card>
      </Modal>
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
        { this.renderModal() }
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
