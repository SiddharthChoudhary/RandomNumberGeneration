import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions, Picker, TextInput, ActivityIndicator} from 'react-native';

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
            type:'',
            loader : false,
            randomNumber : '123',
            showNumber : false
        };
    }

    getRandomNumber(){
      // require the module
var RNFS = require('react-native-fs');

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
var path = RNFS.DocumentDirectoryPath + '/test.txt';

// write the file
RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
  .then((success) => {
    alert(path);
  })
  .catch((err) => {
    alert(err.message);
  });

    }

    showRandomNumber(){
        return(
            <View>
                <Text style={styles.numberText}>{this.state.randomNumber}</Text>
                <Button
                    onPress={() => this.getRandomNumber() }
                    title="Save to file"
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
                    <View>
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
                            selectedValue={this.state.language}
                            style={{ height: 50, width: 150}}
                            onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
                            <Picker.Item label="Distributed" value="distributed" />
                            <Picker.Item label="Uniform" value="uniform" />
                        </Picker>
                        {
                            (this.state.loader) ?
                            <ActivityIndicator  size="large" color="#0000ff" /> 
                            :
                            <Button
                            onPress={() => this.getRandomNumber() }
                            title="Get the Random Number"
                            />
                        }
                    </View>  
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