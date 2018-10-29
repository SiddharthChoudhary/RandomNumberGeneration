import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';


class About extends Component{

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle: 'About',
            headerRight: (
            <Button
                onPress={() => navigation.push('RandomNumber') }
                title="Get Started"
                />
            ),
            headerLeft : null
        }
       
    };

    render() {
        return (
          <View>
            <Image source={require('../Images/about.png')} style={styles.imageDimensions} />  
            <Text style={styles.welcome}>
            Many of the images you will display in your app will not be available at compile time, 
            or you will want to load some dynamically to keep the binary size down. 
            Unlike with static resources, you will need to manually specify the dimensions of your image. It's highly recommended that you use https as well in order to satisfy App            </Text>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    welcome: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
    },
    imageDimensions :{
      width : Dimensions.get("window").width,
      height : 250
    }
  });
  

export default About;