import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Footer = () => {
  return (
    <View style={styles.container}>
        <Icon style={styles.item} name="image"  color="white" size={32}/>
        <Icon style={styles.item} name="keyboard-voice"  color="white" size={32}/>
      
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        backgroundColor:'#212429',
        padding:5
    },
    item:{
        margin:10
    }
})

export default Footer
