import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground, Button, Image, Dimensions} from 'react-native';

class BackgroundImageComponent extends Component {

    render() {
      let image= this.props.image;
        return (
            <ImageBackground style={styles.backgroundImage} source={require('../Images/Splashpage.png')}>
                    {this.props.children}
            </ImageBackground>
        )
    }
}

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
            this.props.navigation.push('HomeScreen');
        }, 2000);
    }

    render() {
        return (
          <BackgroundImageComponent>

          </BackgroundImageComponent>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#c80512'
    },
    title:{
        color : '#FFF',
        fontSize : 25
    },
    imageDimensions:{
        width : 300,
        height : 250
    },
    backgroundImage: {
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'cover'
    }
});


export default Splash;
