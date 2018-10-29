import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions, ScrollView, Picker, TextInput, ActivityIndicator, Share} from 'react-native';

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
            type:'distributed',
            isLoading : false,
            randomNumber : null,
            showNumber : false
        };
    }

    getRandomNumber(){
        this.setState({ isLoading : true });
        fetch('https://facebook.github.io/react-native/movies.json?minRange='+this.state.minRange+
        '&maxRange='+this.state.maxRange+'&type='+this.state.type+'&quantity='+this.state.quanity)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                randomNumber: [4,6,7,8,9],//responseJson.finalrandomarray
                showNumber : true
            });
        })  
    }

    saveThisNumber(){
        const sharing_msg = JSON.stringify(this.state.randomNumber);
        Share.share({
            message: sharing_msg
        });  
    }

    showRandomNumber(){
        return(
            <View>
                <Text style={styles.numberText}>{JSON.stringify(this.state.randomNumber)}</Text>
                <Button
                    onPress={() => this.saveThisNumber() }
                    title="Save"
                />   
            </View>
        )
    }


    render() {
        return (
          <View style={styles.container}>
              <View>
                {
                    (this.state.showNumber) ?
                        this.showRandomNumber()
                    :    
                    <ScrollView>
                         <Text style={styles.label}>Min Range of Number : </Text>  
                        <TextInput maxLength={2} keyboardType = 'numeric' style={{ borderBottomWidth : 1 }} value={this.state.minRange} 
                        onChangeText={(value) => this.setState({minRange : value }) } />
                        <Text style={styles.label}>Max Range of Number : </Text>  
                            <TextInput maxLength={2} keyboardType = 'numeric' style={{ borderBottomWidth : 1 }} 
                            value={this.state.maxRange}
                            onChangeText={(value) => this.setState({maxRange : value }) }/>  
                        <Text style={styles.label}>How many numbers you want to generate? </Text> 
                            <TextInput maxLength={2} keyboardType = 'numeric' style={{ borderBottomWidth : 1 }}
                            value={this.state.quanity}
                            onChangeText={(value) => this.setState({quanity : value }) }/>  
                        <Text style={styles.label}>Type :</Text>
                        <Picker
                            selectedValue={this.state.type}
                            style={{ height: 100, width: 150}}
                            onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
                            <Picker.Item label="Distributed" value="distributed" />
                            <Picker.Item label="Uniform" value="uniform" />
                        </Picker>

                        {
                            (this.state.isLoading) ?
                            <ActivityIndicator  size="large" color="#0000ff" /> 
                            :
                            <Button
                            onPress={() => this.getRandomNumber() }
                            title="Get the Random Number"
                            />
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
        marginTop : 20
    },
    numberText :{
        padding : 15,
        borderWidth : 1,
        marginBottom : 20
    }


  });
  

export default RandomNumber;