// React
import React from 'react'

// React Native
import { View, Text, StyleSheet } from 'react-native'

export default class TaskDetails extends React.Component {
  render () {
    const task = this.props.task
    return (
      <View>
        <Text style={styles.title}> { task.title } </Text>
        <Text> { task.description } </Text>
        <Text> Created at: { task.createdAt } </Text>
        <Text> Created by: { task.user.name } </Text>
        <Text> Status: { task.status.title } </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14
  }
})
