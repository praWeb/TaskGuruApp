// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, CardActions, CardContent, Paragraph, Button } from 'react-native-paper'

export default class TaskList extends Component {
  constructor () {
    super()
    this.state = {
      viewableItems: []
    }
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
            <Button> Delete </Button>
          </CardActions>
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
