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
    <Grid>
      <Row size={.5}>
      </Row>
      <Row size={1}>
        <Col>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('RandomNumber')}>
          <Image source={require("../Images/Uniform.png")} style={styles.imageStyle}/>
          <View marginTop={7} marginLeft={6}>
           <Text style={styles.label}>
           Uniform QRN
           </Text>
           </View>
          </TouchableOpacity>

        </View>
        </Col>
        <Col>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('NormalDistribution')}>
           <Image source={require("../Images/normal.png")} style={styles.imageStyle}/>
          <View marginTop={7} marginLeft={12}>
           <Text style={styles.label}>
           Normal QRN
           </Text>
           </View>
           </TouchableOpacity>
        </View>
        </Col>
      </Row>
        <Row size={.3}></Row>
        <Row size={1}>
          <Col>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('RandomList')}>
                  <Image source={require("../Images/QPicker.png")} style={styles.imageStyle}/>
                    <View marginTop={7} marginLeft={6}>
                      <Text style={styles.label}>
                        Q-Picker
                      </Text>
                    </View>
                </TouchableOpacity>
              </View>
          </Col>
          <Col>
          <View style={styles.container}>
              <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('MegaMillion')}>
              <Image source={require("../Images/mega.png")} style={styles.imageStyle}/>
              <View marginTop={7} marginLeft={6}>
              <Text style={styles.label}>
              Quantum Mega Millions
              </Text>
              </View>
              </TouchableOpacity>
            </View>
          </Col>
        </Row>
        <Row size={1}>
        <Col>
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.push('About')}>
            <Image source={require("../Images/about.png")} style={styles.imageStyle}/>
          <View marginTop={7} marginLeft={12}>
            <Text style={styles.label}>
            About
            </Text>
            </View>
              </TouchableOpacity>
          </View>
          </Col>
        </Row>
    </Grid>
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
