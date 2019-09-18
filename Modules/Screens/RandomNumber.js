import React, {Component} from 'react';
import {Platform, Alert, StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import Picker from 'react-native-wheel-picker'
import { Col, Row, Grid } from 'react-native-easy-grid'
import {Icon} from 'react-native-elements'
import CircularCarousel from './CircularCarousel'
var PickerItem = Picker.Item;
var {height, width} = Dimensions.get('window');
const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => String(start + (i * step)));
class BackgroundImageComponent extends Component {

    render() {
      let image= this.props.image;
        return (
            <ImageBackground style={styles.backgroundImage} source={require('../Images/background.png')}>
                    {this.props.children}
            </ImageBackground>
        )
    }
}
class RandomNumber extends Component{
    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle: 'Uniformly Distributed Numbers'
        }

    };

    constructor(props) {
        super(props)
        this.state = {
            minRange : '0',
            maxRange : '0',
            quantity : '0',
            isLoading : false,
            randomNumber : null,
            showNumber : false,
            showNumberBar:false,
            selectedItem:'',
            minRangeArray : range(0,100,1),
            maxRangeArray : range(0,100,1),
            quantityArray :  range(0,100,1),
             modalVisible: false
        };
    }
    getRandomNumber(type){

            if(Number(this.state.minRange)>Number(this.state.maxRange)){
          	    alert('Min range should be less than the Max range')
          	}
            else if(Number(this.state.minRange)==Number(this.state.maxRange)){
              alert('Min range should be different and less than the Max range')
            }else{
            this.setState({ isLoading : true });
            fetch('http://34.69.15.200:5050/main?lower='+this.state.minRange+'&higher='+this.state.maxRange+'&amount='+this.state.quantity)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    randomNumber: JSON.stringify(responseJson.finalrandomarray),
                    showNumber : true,
                    showNumberBar:true
                })
            })
            .catch((error)=>{
                alert("Network error, try after some time")
                this.setState({ isLoading:false})
            })
        }
    }
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

    saveThisNumber(){
        const sharing_msg = this.state.randomNumber;
        Share.share({
            message: sharing_msg
        });
    }

    showRandomNumber(){
        return(
            this.state.showNumberBar?
            <View style={{flex:3}}>
            <ScrollView height={height/3} marginBottom={20} fontSize={30} borderRadius={10}>
                <Text paddingBottom={3} style={styles.numberText} alignItems="center">{this.state.randomNumber.replace("[","").replace("]","")}</Text>
            </ScrollView>
            <View>
            <TouchableOpacity
                onPress={() => this.saveThisNumber()}>
            <Icon size={40} type='evilicon' color='#fff' name='share-apple'/>
            </TouchableOpacity>
            </View>
            </View>
            :
            null
        )
    }
    onMinRangeSelect(index) {
      console.log("Min Range is"+this.state.minRangeArray[index]);
        this.setState({
          minRange: this.state.minRangeArray[index],
        })
        console.log("Min Range is after"+this.state.minRange);

    }
    onMaxRangeSelect(index) {
        this.setState({
          maxRange: this.state.maxRangeArray[index],
        })
    }
    onQuantitySelect(index) {
        this.setState({
          quantity: this.state.quantityArray[index],
        })
    }
    onItemSelected(event){
       // do something
       console.log("Event occured"+event);
     }

    render() {
        return (
          <BackgroundImageComponent>
          <View style={[styles.container, styles.themeBg]}>
              <View >
                    <ScrollView>
                        <View style={styles.row}>
                        <View alignItems="center">
                        <Text style={styles.label}> Minimum</Text>
                        <Picker style={{width: width/3, height: height/3}}
                              selectedValue={this.state.minRangeArray[this.state.minRange]}
                              itemStyle={{color:"white", fontSize:26}}
                              onValueChange={(index) => this.onMinRangeSelect(index)}>
                                  {this.state.minRangeArray.map((value, i) => (
                                      <PickerItem label={value} value={Platform.OS=='ios'?value:parseFloat(value)} key={value}/>
                                  ))}
                        </Picker>
                        </View>
                        <View alignItems="center">
                        <Text style={styles.label}>Maximum</Text>
                        <Picker style={{width: width/3, height: height/3}}
                              selectedValue={this.state.maxRangeArray[this.state.maxRange]}
                              itemStyle={{color:"white", fontSize:26}}
                              onValueChange={(index) => this.onMaxRangeSelect(index)}>
                                  {this.state.maxRangeArray.map((value, i) => (
                                      <PickerItem label={value} value={Platform.OS=='ios'?value:parseFloat(value)} key={value}/>
                                  ))}
                        </Picker>
                        </View>
                        <View alignItems="center">
                        <Text style={styles.label}>Quantity</Text>
                        <Picker style={{width: width/3, height: height/3}}
                              selectedValue={this.state.quantityArray[this.state.quantity]}
                              itemStyle={{color:"white", fontSize:26}}
                              onValueChange={(index) => this.onQuantitySelect(index)}>
                                  {this.state.quantityArray.map((value, i) => (
                                      <PickerItem label={value} value={Platform.OS=='ios'?value:parseFloat(value)} key={value}/>
                                  ))}
                        </Picker>
                        </View>
                        </View>
                        <View style={styles.label}></View>
                        {
                            (this.state.isLoading) ?
                            <ActivityIndicator  size="large" color="#fff" />
                            :
                            <View alignItems='center' justifyContent='center'>
                            <TouchableOpacity
                                onPress={() => this.getRandomNumber('uniform')}>
                                <Image  source={require("../Images/button.png")} style={styles.imageStyle}/>
                            </TouchableOpacity>
                            </View>
                        }
                        <View>
                       </View>
                    </ScrollView>
                    {
                      (this.showRandomNumber())
                    }
              </View>
          </View>
          </BackgroundImageComponent>
        );
      }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
        margin : 15,
        alignItems :'center',
        justifyContent : 'center'
    },
    label : {
        fontSize:20,
        marginTop : 20,
        marginBottom : 10,
        color : '#fff'

    },
    numberText :{
        padding : 15,
        borderWidth : 1,
        marginBottom : 20,
        borderRadius:30,
        backgroundColor:'#c09000',
        borderColor : '#c09000',
        color :'#000'
    },
    themeBg :{
        //backgroundColor : '#c80512',
        margin : 0,
        borderRadius:30,
        padding : 0
    },
    whiteColor :{
       color:'#fff'
    },
    textBorder : {
        borderWidth : 1,
        borderColor : '#fff',
        backgroundColor:Platform.OS==='ios'?'#ffffff':'#c80512',
        borderRadius : 3,
        color : Platform.OS === 'ios'?'#000':'#fff'
    },
    addMargin : {
        margin : 20,
        fontSize : 18
    },
    applyColorAccordingToIOSandAndroid:{
      color: Platform.OS ==='ios'?'#fff':'#000'
    },
    row :{
      flex : 1,
      flexDirection : 'row'
    },
    button: {
     width:100,
     height:100,
     backgroundColor: '#859a9b',
     borderRadius: 20,
     padding: 10,
     marginBottom: 20,
     shadowColor: '#303838',
     shadowOffset: { width: 0, height: 5 },
     shadowRadius: 10,
     shadowOpacity: 0.35,
   },
   modal:{
     backgroundColor:"white",
    marginTop: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
  backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
  },
  imageStyle:{
    alignItems:'center',
    justifyContent:'center',
    height:70,
    borderRadius:20,
    width:70
  },
  });


export default RandomNumber;
