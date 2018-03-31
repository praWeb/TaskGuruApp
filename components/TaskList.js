// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet, TouchableOpacity  } from 'react-native'
import { Icon, List, ListItem } from 'react-native-elements'
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
      <View style={{marginBottom: 50}}>
        <FlatList
          data={tasks}
          renderItem={({item}) =>
            this.renderTask(item)
          }
          keyExtractor={(item, index) => item.id}
          containerStyle={{ borderBottomWidth: 0, flexGrow: 1 }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
