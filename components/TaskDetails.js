// React
import React from 'react'

// React Native
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

// Moment
import moment from 'moment'

export default class TaskDetails extends React.Component {
  render () {
    const task = this.props.task
    return (
      <View style={styles.container}>
        <View >
          <View style={styles.media}>
            <Text style={styles.taskId}> #{task.id} </Text>
            <Text style={styles.label}> { task.status.title } </Text>
          </View>
          <Text style={styles.title}> { task.title } </Text>
          <Text style={styles.description}> { task.description } </Text>
          <View style={styles.media}>
            <View style={styles.media}>
              <Icon type='font-awesome' name='user' iconStyle={styles.mediaImage} />
              <Text> { task.user.name.toUpperCase() } </Text>
            </View>
            <View style={styles.media}>
              <Icon type='foundation' name='clock' iconStyle={styles.mediaImage} />
              <Text style={styles.mediaText}> { moment(task.createdAt).format('YYYY-MM-DD') } </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: '#999'
  },
  id: {
    fontStyle: 'italic',
    fontSize: 14
  },
  label: {
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#ddd',
    borderRadius: 4
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    backgroundColor: '#eee',
    fontStyle: 'italic',
    padding: 5
  },
  media: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  mediaText: {
    fontWeight: '300'
  }
})
