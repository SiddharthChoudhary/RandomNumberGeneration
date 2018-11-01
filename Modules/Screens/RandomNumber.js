import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';

class RandomNumber extends Component{

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle: 'Generate Random Number'
        }
       
    };

    constructor(props) {
        super(props)
        this.state = {
            minRange : '',
            maxRange : '',
            quanity : '',
            isLoading : false,
            randomNumber : null,
            showNumber : false
        };
    }

    getRandomNumber(type){
       
        if(!this.state.minRange.length || !this.state.maxRange.length || !this.state.quanity.length){
            alert('Please fill all the details')
        }else{
            this.setState({ isLoading : true });
            fetch('https://facebook.github.io/react-native/movies.json?minRange='+this.state.minRange+
            '&maxRange='+this.state.maxRange+'&type='+type+'&quantity='+this.state.quanity)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    randomNumber: [4,6,7,8,9,10,11,12,13,14,15,16,4,6,7,8,9,10,11,12,13,14,15,16],//responseJson.finalrandomarray
                    showNumber : true
                });
            })  
        }
    }

    saveThisNumber(){
        const sharing_msg = JSON.stringify(this.state.randomNumber);
        Share.share({
            message: sharing_msg
        });  
    }

    showRandomNumber(){
        return(
            <View style={styles.addMargin}>
                <Text style={styles.numberText}>{JSON.stringify(this.state.randomNumber)}</Text>
                <Button
                    color='#ff4a52'
                    onPress={() => this.saveThisNumber() }
                    title="Save"
                /> 
                <View style={styles.label}></View>
                <Button
                    color='#ff4a52'
                    onPress={() => this.setState({ showNumber : false, randomNumber : null}) }
                    title="Back to generate new Number"
                />
            </View>
        )
    }


    render() {
        return (
          <View style={[styles.container, styles.themeBg]}>
              <View>
                {
                    (this.state.showNumber) ?
                        this.showRandomNumber()
                    :    
                    <ScrollView>
                         <Text style={styles.label}>Min Range of Number : </Text>  
                        <TextInput maxLength={2} keyboardType = 'numeric' style={styles.textBorder} value={this.state.minRange} 
                        onChangeText={(value) => this.setState({minRange : value }) } />
                        <Text style={styles.label}>Max Range of Number : </Text>  
                            <TextInput maxLength={2} keyboardType = 'numeric' style={styles.textBorder} 
                            value={this.state.maxRange}
                            onChangeText={(value) => this.setState({maxRange : value }) }/>  
                        <Text style={styles.label}>How many numbers you want to generate? </Text> 
                            <TextInput maxLength={2} keyboardType = 'numeric' style={styles.textBorder}
                            value={this.state.quanity}
                            onChangeText={(value) => this.setState({quanity : value }) }/>  
                        <View style={styles.label}></View>    
                        {
                            (this.state.isLoading) ?
                            <ActivityIndicator  size="large" color="#fff" /> 
                            :
                            <View>
                            <Button
                            color='#ff4a52'
                            onPress={() => this.getRandomNumber('uniform') }
                            title="Get Uniform Random Number"
                            />
                            <View style={styles.label}></View>
                            <Button
                            color='#ff4a52'
                            onPress={() => this.getRandomNumber('distributive') }
                            title="Get Distributive Random Number"
                            />
                            </View>
                        }
                    </ScrollView>  
              }
              </View>   
          </View>
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
        marginTop : 20,
        marginBottom : 10,
        color : '#fff'
    },
    numberText :{
        padding : 15,
        borderWidth : 1,
        marginBottom : 20,
        borderColor : '#fff',
        color :'#fff'
    },
    themeBg :{
        backgroundColor : '#ff4a52',
        margin : 0,
        padding : 0
    },
    textBorder : {
        borderWidth : 1,
        borderColor : '#fff',
        borderRadius : 3,
        color : '#fff'    
    },
    addMargin : {
        margin : 20,
        fontSize : 18
    }
  });
  

export default RandomNumber;