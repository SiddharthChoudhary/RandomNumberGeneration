import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
class MegaMillion extends Component{
  static navigationOptions=({navigation})=>{
    return{
      headerTitle:'MegaMillion'
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
              <Button
                  style={styles.textBorder}
            color= {Platform.OS ==='ios'?'#ffffff':'#c80512'}
                  onPress={() => this.saveThisNumber() }
                  title="Save"
              />
              <View style={styles.label}></View>
              <Button
                  style={styles.textBorder}
            color= {Platform.OS ==='ios'?'#ffffff':'#c80512'}
            onPress={() => this.props.navigation.goBack() }
                  title="Back to generate new Number"
              />
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
    <View style={[styles.container,styles.themeBg]}>
    {
      (this.state.isLoaderOn)?
      this.getMegaMillionNumbers():
      this.showRandomNumber()
    }
    </View>
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
        backgroundColor : '#c80512',
        margin : 0,
        padding : 0
    },
    container : {
        flex : 1,
        margin : 15,
        alignItems :'center',
        justifyContent : 'center'
    },
})
export default MegaMillion
