// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Card, CardActions, CardContent, Paragraph, Button } from 'react-native-paper'

// App Status Colours
import * as colors from './../constants/statusColors.json'

export default class TaskList extends Component {
  constructor () {
    super()
    this.state = {
      viewableItems: []
    }
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged ({ viewableItems, changed }) {
    this.setState({viewableItems})
  }

  handleNext () {

  }

  handlePrev () {

  }

  // renderTask (task) {
  //   const { navigate } = this.props.navigation
  //   return (
  //     <View style={styles.taskView} >
  //       <TouchableOpacity onPress={() => navigate('TaskDetail', {taskId: task.id})}>
  //         <View style={{ borderLeftWidth: 5, borderLeftColor: colors[task.status], borderStyle: 'solid', flex: 1 }}>
  //           <Text style={styles.taskTitle}>
  //             {task.title}
  //           </Text>
  //           <Text style={styles.taskContent}> { task.description } </Text>
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }

  renderTask (task) {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.taskView} >
          <Card>
            <CardContent>
              <Text style={styles.taskTitle}>
                {task.title}
              </Text>
              <Paragraph style={styles.taskContent}>
                { task.description }
              </Paragraph>
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
  taskStatus: {
    padding: 3,
    flexDirection: 'column',
    borderRadius: 5
  }
})
