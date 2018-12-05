import React, {Component} from 'react';
import {ImageBackground,StyleSheet} from 'react-native';
class BackgroundImageComponent extends Component {

    render() {
      console.log("TUmgari");
      let image= this.props.image;
      console.log("The image is now"+this.props.image);
        return (
            <ImageBackground style={styles.backgroundImage} source={{uri:props.image}}>
                    {this.props.children}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
});
export default BackgroundImageComponent;
