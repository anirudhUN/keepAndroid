import React from 'react'
import {View,Text,Image, StyleSheet,TextInput,Dimensions} from 'react-native'
import logo from '../logo.png'

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;


const Navbar = () => {
  return (
    <View style={styles.navbar}>
        <Image style={styles.navlogo} source={logo}></Image>
        <Text style={styles.title}>Keep</Text>
        {/* <TextInput type='text' placeholder='Search your notes' placeholderTextColor={'#9499A0'} style={styles.searchBar}></TextInput> */}
      
    </View>
  )
}

const styles=StyleSheet.create({
    navbar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom:10,
        height:85,
        backgroundColor:'#383838',
        borderWidth:0.6,
        borderBottomColor:'rgba(0,0,0,0.2)'
    },
    searchBar:{
        width:'95%',
        borderRadius:30,
        margin:10,
        paddingHorizontal:15,
        backgroundColor:'#212429'
    },
    title:{
        color:'white',
        fontSize:17
    },
    navlogo:{
        width:50,
        height:55,
        margin:10
    }
})


export default Navbar
