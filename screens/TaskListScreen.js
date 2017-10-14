// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'

// App Status Colours
import * as colors from './../constants/statusColors.json'

// Static data
import tasks from './../static/tasks.json'

export default class TaskLists extends Component {
  renderTask (task) {
    return (
      <View style={styles.taskView}>
        <View style={{ borderLeftWidth: 15, borderLeftColor: colors[task.status], borderStyle: 'solid' }}>
          <Text style={styles.taskTitle}>
            { task.taskDetails.title }
          </Text>
          <Text style={styles.taskContent}> { task.taskDetails.content } </Text>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.taskContainer}>
        <View>
          <Text> Tasks Lists </Text>
          <FlatList
            data={tasks}
            renderItem={({item}) =>
              this.renderTask(item)
            }
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#fff'
  },
  taskView: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row'
  },
  taskIcon: {
    height: 50,
    width: 5,
    marginTop: 5
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  taskContent: {
    paddingTop: 5,
    fontSize: 16
  }
})
