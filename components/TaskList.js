// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'

// App Status Colours
import * as colors from './../constants/statusColors.json'

export default class TaskList extends Component {
  renderTask (task) {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.taskView}>
        <View style={{ borderLeftWidth: 5, borderLeftColor: colors[task.status], borderStyle: 'solid', flex: 1 }}>
          <Button style={styles.taskTitle} onPress={() => navigate('TaskDetail', {taskId: task.id})} title={task.title} />
          {/* <View style={styles.statusContainer}>
            <Text style={[styles.taskStatus, {backgroundColor: task.taskDetails.taskType.bgColor}]}>
              { task.taskType.title }
            </Text>
          </View> */}
          <Text style={styles.taskContent}> { task.description } </Text>
        </View>
      </View>
    )
  }

  render () {
    const tasks = this.props.tasks
    return (
      <View>
        <FlatList
          data={tasks}
          renderItem={({item}) =>
            this.renderTask(item)
          }
          keyExtractor={(item, index) => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    flex: 1
  },
  taskContent: {
    fontSize: 16
  },
  statusContainer: {
    marginVertical: 5,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  taskStatus: {
    padding: 3,
    flexDirection: 'column',
    borderRadius: 5
  }
})
