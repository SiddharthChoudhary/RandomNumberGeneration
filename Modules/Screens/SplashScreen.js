import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';


class Splash extends Component{
    constructor() {
        super();
        this.state = { rehydrated: false };
    }
    
    static navigationOptions = () => {
        return {
            header : null
        }
    };

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.push('About');           
        }, 2000);
    }

    render() {
        return (
          <View style={styles.container}>
                <Image source={require('../Images/icon.png')} style={styles.imageDimensions} />  
                <Text style={styles.title}>QUANTUM RNG & GAMES</Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#ff4a52'
    },
    title:{
        color : '#FFF',
        fontSize : 25
    },
    imageDimensions:{
        width : 300,
        height : 250
    }    
});
  

export default Splash;