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
class NormalDistribution extends Component{
    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle: 'Normal Distribution'
        }

    };

    constructor(props) {
        super(props)
        this.state = {
            minRange : '0',
            maxRange : '0',
            quantity : '0',
            isLoading : false,
            NormalDistribution : null,
            showNumber : false,
            showNumberBar:false,
            selectedItem:'',
            minRangeArray : range(0,100,1),
            maxRangeArray : range(0,100,1),
            quantityArray :  range(0,100,1),
             modalVisible: false
        };
    }
    getNormalDistribution(type){

            if(Number(this.state.minRange)>Number(this.state.maxRange)){
          	    alert('Min range should be less than the Max range')
          	}
            else if(Number(this.state.minRange)==Number(this.state.maxRange)){
              alert('Min range should be different and less than the Max ')
            }
            else{
            this.setState({ isLoading : true });
            fetch('http://quest.phy.stevens.edu:5050/main?lower='+this.state.minRange+'&higher='+this.state.maxRange+'&amount='+this.state.quantity)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    NormalDistribution: JSON.stringify(responseJson.finalrandomarray),
                    showNumber : true,
                    showNumberBar:true
                });
            })
        }
    }
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

    saveThisNumber(){
        const sharing_msg = this.state.NormalDistribution;
        Share.share({
            message: sharing_msg
        });
    }

    showNormalDistribution(){
        return(

            this.state.showNumberBar?
            <View style={{flex:3}}>
            <ScrollView height={height/3} marginBottom={20} fontSize={30} borderRadius={10}>
                <Text paddingBottom={3} style={styles.numberText} alignItems="center">{this.state.NormalDistribution.replace("[","").replace("]","")}</Text>
            </ScrollView>
            <View>
            <TouchableOpacity
                onPress={() => this.saveThisNumber()}>
            <Icon size={40} type='evilicon' color='#fff' name={Platform.OS==='ios'?'share-apple':'share-google'}/>
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
      <View>
       <Modal
         animationType="slide"
         transparent={true}
         backgroundColor="white"
         style={styles.modal}
         visible={this.state.modalVisible}
         onRequestClose={() => {
           Alert.alert('Modal has been closed.');
         }}>
         <View style={{marginTop: 300}}>
         <View style={{
        flex: 1,
        backgroundColor: 'rgba(80,80,80,0.1)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}}
        onPressOut={()=>{this.setModalVisible(false)}}>
        <View style={{
                marginTop:height>600?height*30/100:height*10/100,
                width: width*80/100,
                position:'relative',
                padding:20,
                backgroundColor:'#ccd7e0',
                borderRadius:30,
                height: (height*60)/100}}
                onPress={()=>{this.setModalVisible(false)}}>
                <View style={{flex: 1}}>

                <View style={{flex: 10}}>
                <Text alignItems="center">{JSON.stringify(this.state.NormalDistribution).substr(2).replace("]","").replace('"',"")}</Text>
                </View>
                <View style={{flex: 2}}>
                <View style={{flex:1,flexDirection:'row'}}>
                <View style={{flex:3}}>
                <TouchableOpacity
                    onPress={() =>   this.setModalVisible(!this.state.modalVisible)}>
                <Icon size={40} type='entypo' name='circle-with-cross'/>
                </TouchableOpacity>
                </View>
                <View style={{flex:3}}>
                <TouchableOpacity
                    onPress={() => this.getNormalDistribution('uniform')}>
                <Icon size={40} color='#000' name='replay'/>
                </TouchableOpacity>
                </View>
                </View>
                </View>
               </View>
        </View>
        </View>
        </View>
       </Modal>
     </View>
                        <View style={styles.label}></View>
                        {
                            (this.state.isLoading) ?
                            <ActivityIndicator  size="large" color="#fff" />
                            :
                            <View alignItems='center' justifyContent='center'>
                            <TouchableOpacity
                                onPress={() => this.getNormalDistribution('normal')}>
                                <Image  source={require("../Images/button.png")} style={styles.imageStyle}/>
                            </TouchableOpacity>
                            </View>
                        }
                    </ScrollView>
                    {
                      (this.showNormalDistribution())
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
        backgroundColor:'#c09000',
        borderColor : '#c09000',
        color :'#000'
    },
    themeBg :{
        //backgroundColor : '#c80512',
        margin : 0,
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
  }
  });


export default NormalDistribution;
