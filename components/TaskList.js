// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

// App Status Colours
import * as colors from './../constants/statusColors.json'

export default class TaskList extends Component {
  renderTask (task) {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.taskView} >
        <TouchableOpacity onPress={() => navigate('TaskDetail', {taskId: task.id})}>
          <View style={{ borderLeftWidth: 5, borderLeftColor: colors[task.status], borderStyle: 'solid', flex: 1 }}>
            <Text style={styles.taskTitle}>
              {task.title}
            </Text>
            {/* <View style={styles.statusContainer}>
              <Text style={[styles.taskStatus, {backgroundColor: task.taskDetails.taskType.bgColor}]}>
                { task.taskType.title }
              </Text>
            </View> */}
            <Text style={styles.taskContent}> { task.description } </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const tasks = this.props.tasks
    return (
      <View>
        <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={tasks}
            renderItem={({item}) =>
              this.renderTask(item)
            }
            keyExtractor={(item, index) => item.id}
            containerStyle={{ borderBottomWidth: 0 }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  taskView: {
    width: '100%',
    paddingVertical: 15,
    flex: 1
  },
  taskTitle: {
    fontWeight: '400',
    fontSize: 18,
    flex: 1,
    color: '#0000ff'
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
