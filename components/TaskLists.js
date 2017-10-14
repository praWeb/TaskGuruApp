// React
import React, { Component } from 'react'

// React native
import { View, Text, FlatList, StyleSheet } from 'react-native'

export default class TaskLists extends Component {
  render () {
    return (
      <View>
        <View>
          <Text> Tasks Lists </Text>
          <FlatList
            data={[
              { title: 'Task1', id: 1 },
              { title: 'Task2', id: 2 },
              { title: 'Task3', id: 3 },
              { title: 'Task4', id: 4 },
              { title: 'Task5', id: 5 },
              { title: 'Task6', id: 6 },
              { title: 'Task7', id: 7 },
              { title: 'Task8', id: 8 },
              { title: 'Task9', id: 9 },
              { title: 'Task10', id: 10 }
            ]}
            renderItem={({item}) => <Text style={styles.task}> { item.title } </Text>}
            keyExtractor={(item, index) => item.id}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    padding: 10
  },
  task: {
    width: '100%',
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18
  }
})
