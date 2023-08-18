import React from 'react'
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FileUploader from './components/FileUploader'
import Notes from './components/Notes'
import VoiceNoteRecorder from './components/VoiceNoteRecorder'

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Navbar/>
      <Notes/>
      {/* <Notes/> */}
      
      {/* <ScrollView style={{flex:1}}> */}
      {/* <Footer/> */}
      {/* b<FileUploader/> */}
      {/* <VoiceNoteRecorder/> */}
      {/* </ScrollView> */}
      </View>

      {/* <Footer/> */}
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'#1A1C19'
    backgroundColor:'black'
  },
  content:{
    flex:1
  }
})

export default App
