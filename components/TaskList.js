// React
import React, { Component } from 'react'

// React native
import { View, FlatList, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Text, Button } from 'native-base'

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
          <CardItem onPress={() => navigate('TaskDetail', {taskId: task.id})} header>
            <Text style={styles.taskTitle}>
              {task.title}
            </Text>
          </CardItem>
          <CardItem>
            <Body style={styles.taskContent}>
              <Text>
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
            <Button>
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
