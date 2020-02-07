import React, {Component} from 'react';
import {Icon} from 'react-native-elements'
import {Platform, StyleSheet, Text,Animated, View, Button,TouchableHighlight, TouchableOpacity,Image,ImageBackground, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
class BackgroundImageComponent extends Component {

    render() {
      let image= this.props.image;
        return (
            <ImageBackground style={styles.backgroundImage} source={require('../Images/MegaMillions.png')}>
                    {this.props.children}
            </ImageBackground>
        )
    }
}
class MegaMillion extends Component{
  static navigationOptions=({navigation})=>{
    return{
      headerTitle:'Mega Million'
    }
  }
  constructor(props){
  super(props)
  this.state = {
    isLoaderOn:true,
    megaMillionArray:null,
    showArray:false
  }
  }

  saveThisNumber(){
    const shareArray  = JSON.stringify(this.state.megaMillionArray);
    Share.share({
      message: shareArray
    })
  }

  showRandomNumber(){
    let megaMillion = this.state.megaMillionArray!=null?this.state.megaMillionArray:[0];
    let i=0
    MegaMillions = megaMillion.map((info,index)=> (
      <FadeInView key={Math.random()+info}>
      <TouchableHighlight
      style = {{
       borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
       width: Dimensions.get('window').width * 0.10,
       height: Dimensions.get('window').width * 0.10,
       backgroundColor:index==5?'#c09000':'#fff',
       justifyContent: 'center',
       alignItems: 'center',
       marginLeft:'2%'
     }}
     underlayColor = '#ccc'
   >
     <Text>{info}</Text>
   </TouchableHighlight>
   </FadeInView>
    ))
      return(
          <View>
              <View flexDirection='row' margin="20%">
              {MegaMillions}
              </View>
              <View flexDirection='row'>
              <View flex={2}>
              <TouchableOpacity
                  onPress={() => this.saveThisNumber()}>
              <Icon size={40} type='evilicon' color='#fff' name='share-apple'/>
              </TouchableOpacity>
              </View>
              <View flex={2}>
              <TouchableOpacity
                  onPress={() => this.getMegaMillionNumbers()}>
              <Icon size={30} color='#fff' name='replay'/>
              </TouchableOpacity>
              </View>
              </View>
          </View>
      )
  }
  getMegaMillionNumbers(){
    fetch('https://exalted-iridium-265519.appspot.com/megaMillion')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoaderOn: false,
            megaMillionArray: responseJson.finalrandomarray,
            showArray : true
        });
    })
    .catch((error)=>{
      alert("Network error, try after some time")
      this.setState({ isLoaderOn:false})
  })
  }
  render(){
    return(
      <BackgroundImageComponent>
        <View style={[styles.container,styles.themeBg]}>
        {
          (this.state.isLoaderOn)?
          this.getMegaMillionNumbers():
          this.showRandomNumber()
        }
        </View>
    </BackgroundImageComponent>
  )
  }
}
const styles= StyleSheet.create({
  numberText :{
      padding : 15,
      borderWidth : 1,
      marginBottom : 20,
      borderColor : '#fff',
      color :'#fff'
  },
  label : {
      marginTop : 20,
      marginBottom : 10,
      color : '#fff'
  },
   themeBg :{
        //backgroundColor : '#c80512',
        margin : 0,
        padding : 0
    },
    container : {
        flex : 1,
        margin : 15,
        alignItems :'center',
        justifyContent : 'center'
    },
    backgroundImage: {
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover'
    }
})
export default MegaMillion
