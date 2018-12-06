import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image,ImageBackground,TouchableOpacity, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid'
class BackgroundImageComponent extends Component {

    render() {
      let image= this.props.image;
        return (
            <ImageBackground style={styles.backgroundImage} source={require('../Images/backgroundhome.png')}>
                    {this.props.children}
            </ImageBackground>
        )
    }
}
class HomeScreen extends Component{
  static navigationOptions=({navigation})=>{
    return{
      header:null
    }
  }

  constructor(props){
  super(props)
  this.state = {
  }
  }
  render(){
      return(
  <BackgroundImageComponent>
    <View flex={1} flexDirection='row'>
    <View flex={2}>
    </View>
    <View flex={4}>
      <View flex={1} flexDirection='column'>
        <View flex={1}>
        </View>
        <View flex={2}>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('RandomNumber')}>
        <Image source={require("../Images/Uniform.png")} style={styles.imageStyle}/>
        <View style={styles.viewStyle}>
         <Text style={styles.label}>
         Uniform QRN
         </Text>
         </View>
        </TouchableOpacity>
        </View>
        <View flex={2}>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('MegaMillion')}>
         <Image source={require("../Images/mega.png")} style={styles.imageStyle}/>
        <View style={styles.viewStyle}>
         <Text style={styles.label}>
         Mega
         <Text style={styles.label}>
         Million
         </Text>
         </Text>
         </View>
         </TouchableOpacity>
        </View>
      </View>
    </View>
    <View flex={4}>
      <View flex={1} flexDirection='column'>
        <View flex={1}>
        </View>
        <View flex={2}>
         <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('NormalDistribution')}>
          <Image source={require("../Images/normal.png")} style={styles.imageStyle}/>
         <View style={styles.viewStyle}>
          <Text style={styles.label}>
          Normal QRN
          </Text>
          </View>
          </TouchableOpacity>
        </View>
        <View flex={2}>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('About')}>
         <Image source={require("../Images/about.png")} style={styles.imageStyle}/>
          <View style={styles.viewStyle}>
        <Text style={styles.label} >
        About Us
        </Text>
        </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
    </BackgroundImageComponent>
      )
  }
}
const styles= StyleSheet.create({
  themeBg :{
       backgroundColor : '#c80512',
       margin : 0,
       padding : 0
   },
   label:{
     color:'#fff'
   },
   imageStyle:{
     alignItems:'center',
     justifyContent:'center',
     height:70,
     borderRadius:20,
     width:70
   },
   viewStyle:{
     marginTop:Platform.OS==='ios'?7:2,
   marginLeft:Platform.OS==='ios'?12:0
   },

   container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   button: {
    width:100,
    height:100,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
      backgroundImage: {
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover'
      }
})
export default HomeScreen
