// React
import React from 'react'

// React Native
import { View, Text, Picker, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

// Moment
import moment from 'moment'

export default class TaskDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: props.task.status
    }
    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus (status) {
    this.setState({status: status})
    this.props.updateStatus(status)
  }

  renderStatusDropdown () {
    const statusList = this.props.statusList

    let statusItems = statusList.map((status, i) => {
      return <Picker.Item key={status.id} value={status} label={status.title} />
    })

    return (
      <Picker selectedValue={this.state.status} mode="dropdown"
        onValueChange={(itemValue) => this.updateStatus(itemValue)} style={styles.status}>
        { statusItems }
      </Picker>
    )
  }

  render () {
    const task = this.props.task
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.media}>
            <Text style={styles.taskId}> #{task.id} </Text>
            <Text style={styles.label}> {this.state.status.title} </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.title}> { task.title } </Text>
        </View>
        <View style={styles.statusContainer}> 
          {this.renderStatusDropdown()} 
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.description}> { task.description } </Text>
        </View>
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
  },
  status: {
    height: 20, 
    width: 'auto',
    marginTop: 5,
    marginBottom: 5,
    color: 'blue'
  },
  statusContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#55552b',
    borderRadius: 4,
    marginBottom: 10
  },
  subContainer: {
    marginTop: 5,
    marginBottom: 5
  }
})
