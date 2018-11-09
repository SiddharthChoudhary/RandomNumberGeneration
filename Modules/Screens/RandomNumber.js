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

	handleMinValueChange=(value)=>{
	this.setState({
	minRange:value.replace(/\D/g,'')
	});
    }
    handleMaxValueChange=(value)=>{
    this.setState({
    maxRange:value.replace(/\D/g,'')
    });
    }
    getRandomNumber(type){

        if(!this.state.minRange.length || !this.state.maxRange.length || !this.state.quanity.length){
            alert('Please fill all the details')
            return false
        }
	if(Number(this.state.minRange)>Number(this.state.maxRange)){
	    alert('Min range should be less than the Max range')
	}else{
            this.setState({ isLoading : true });
            fetch('http://quest.phy.stevens.edu:5050/main?lower='+this.state.minRange+'&higher='+this.state.maxRange+'&amount='+this.state.quanity)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    randomNumber: responseJson.finalrandomarray,
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
            <View style={[styles.addMargin,styles.themeBg]}>
                <Text style={styles.numberText}>{JSON.stringify(this.state.randomNumber)}</Text>
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
                         <Text style={styles.label}>Minimum Range of Number : </Text>
                        <TextInput maxLength={2} keyboardType = 'numeric' style={styles.textBorder} min={0} value={this.state.minRange}
                        onChangeText={(value) => {
					              this.handleMinValueChange(value) }
						}
 						 />
                        <Text style={styles.label}>Maximum Range of Number : </Text>
                            <TextInput maxLength={2} keyboardType = 'numeric' style={styles.textBorder}
                            value={this.state.maxRange} min={0}
                            onChangeText={(value) => {this.handleMaxValueChange(value)}}/>
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
                            <Button style={styles.textBorder}
                            color= {Platform.OS ==='ios'?'#ffffff':'#c80512'}
                            onPress={() => this.getRandomNumber('uniform') }
                            title="Generate Uniform Number"
                            />
                            <View  style={styles.label}></View>
                            <Button style={styles.textBorder}
                            color={Platform.OS ==='ios'?'#ffffff':'#c80512'}
                            onPress={() => this.getRandomNumber('distributive') }
                            title="Generate Distributive Number"
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
        backgroundColor : '#c80512',
        margin : 0,
        padding : 0
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
    }
  });


export default RandomNumber;
