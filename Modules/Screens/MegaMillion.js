import React, {Component} from 'react';
import {Icon} from 'react-native-elements'
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity,Image,ImageBackground, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
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
      return(
          <View>
              <Text style={styles.numberText}>{JSON.stringify(this.state.megaMillionArray)}</Text>
              <View flexDirection='row'>
              <View flex={2}>
              <TouchableOpacity
                  onPress={() => this.saveThisNumber()}>
              <Icon size={40} type='evilicon' color='#fff' name={Platform.OS==='ios'?'share-apple':'share-google'}/>
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
    fetch('http://quest.phy.stevens.edu:5050/megaMillion')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            isLoaderOn: false,
            megaMillionArray: responseJson.finalrandomarray,
            showArray : true
        });
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
