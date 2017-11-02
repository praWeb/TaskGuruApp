import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Header extends Component {
  render () {
    return (
      <View>
        <View style={styles.banner}>
          <Text style={styles.bannerContent}> Task Guru </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  banner: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#81c04d',
    flexDirection: 'row'
  },
  bannerContent: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
})
