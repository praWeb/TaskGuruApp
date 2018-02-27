// React
import React from 'react'

// React Native
import { Text, View, TextInput, Button, StyleSheet, Image } from 'react-native'

export default class Login extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    
    return (
      <View>
        <View style={styles.container} >
          <Text style={styles.text}> Welcome to TASK GURU!</Text>
          <Image style={styles.image}
            source={require('./../images/Slice.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.heading}
            placeholder='Email'
            value={this.props.email}
            onChangeText={(text) => this.props.handleChange(text, 'email')}
          />
          <TextInput
            style={styles.heading}
            placeholder='Password'
            secureTextEntry
            value={this.props.password}
            onChangeText={(text) => this.props.handleChange(text, 'password')}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button} >
              <Button title='New User' onPress={() => navigate('UserRegistration')} />
            </View>
            <View style={styles.button}>
              <Button title='Login' onPress={this.props.handleSubmit} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '500',
    paddingBottom: 15,
    paddingTop: 10
  },
  image: {
    marginTop: 5
  },
  container: {
    alignItems: 'center',
    height: 'auto',
    overflow: 'visible'
  },
  loginContainer: {
    marginTop: 15,
    width: 'auto'
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    margin: 15,
    width: 'auto',
    padding: 5
  },
  buttonContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 125,
    height: 40
  }
})
