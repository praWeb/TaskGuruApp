// React
import React, { Component } from 'react'

// React Native
import { View, StyleSheet, Image } from 'react-native'
import { Text, Button } from 'native-base'

export default class Introduction extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <View style={styles.container} >
          <Text style={styles.text}> Welcome {this.props.userName} ! </Text>
          <Image style={styles.image}
            source={require('./../images/Slice.png')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button} >
            <Button raised primary
              onPress={() => navigate('TaskCreate')}
            >
              <Text>
                Create Tasks
              </Text>
            </Button>
          </View>
          <View style={styles.button} >
            <Button raised primary
              onPress={() => navigate('TaskLists', {
                userId: this.props.data.User.id
              })}
            >
              <Text>
                View Tasks
              </Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingBottom: 5
  },
  image: {
    marginTop: 5
  },
  container: {
    alignItems: 'center',
    height: 'auto',
    overflow: 'visible'
  },
  buttonContainer: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 125,
    height: 40
  }
})
