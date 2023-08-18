import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Navbar from './components/Navbar'
import Notes from './components/Notes'

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Navbar />
        <Notes />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  content: {
    flex: 1
  }
})

export default App
