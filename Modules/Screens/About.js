import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, Dimensions, ScrollView, TouchableOpacity, Linking} from 'react-native';


class About extends Component{

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle: 'About',
            headerRight: (
            <Button
                color='#ff4a52'
                onPress={() => navigation.push('RandomNumber') }
                title="Get Started"
                />
            ),
            headerLeft : null
        }
       
    };


    openExternalLinks = (url) => {
      Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    render() {
        return (
          <ScrollView style={styles.bg}>
            <View style={styles.addMargin}>
              <Text style={styles.welcome}>
              The RNG & games are built upon the raw and true random numbers from quantum process. Our QRNs pass all randomness tests of the NIST and Dieharder test suites without any randomness extraction. It is based on measuring the arrival time of single photons in shaped temporal modes that are tailored with an electro-optical modulator. 
              </Text>
              <Text style={styles.welcome}>
              The RNG & games are built upon the raw and true random numbers from quantum process. Our QRNs pass all randomness tests of the NIST and Dieharder test suites without any randomness extraction. It is based on measuring the arrival time of single photons in shaped temporal modes that are tailored with an electro-optical modulator. 
              </Text>
              <Text style={styles.welcome}>
              To learn more about how we generate our QRNs and its applications, please feel free to contact us at
              </Text>
              <TouchableOpacity onPress={() => this.openExternalLinks('http://www.questlab.us/')}>
                <Text style={styles.link}>http://www.questlab.us/</Text> 
              </TouchableOpacity>
              <Text style={styles.welcome}>or refer to articles below
          Programmable quantum random number generator without postprocessing </Text>
              
              <TouchableOpacity onPress={() => this.openExternalLinks('https://www.osapublishing.org/ol/abstract.cfm?uri=ol-43-4-631')}>
                <Text style={styles.link}>(https://www.osapublishing.org/ol/abstract.cfm?uri=ol-43-4-631)</Text> 
              </TouchableOpacity>
                  <Text style={styles.welcome}>Quantum Systems for Monte Carlo Methods and Applications to Fractional Stochastic Processes </Text>

                <TouchableOpacity onPress={() => this.openExternalLinks('https://arxiv.org/abs/1810.05639')}>
                  <Text style={styles.link}>(https://arxiv.org/abs/1810.05639)</Text> 
                </TouchableOpacity>
              <Text style={styles.welcome}>
              This app is aimed to provide real-life quantum technology experience to everyone. We hope to raise your interest in learning more about Quantum Mechanics and its application for the future to come.
              </Text>
              <Text style={styles.welcome}>
              The physical process of this QRN generator is implemented by Graduate Physics students from Laboratory for Quantum Enhanced Systems & Technology (QuEST) and the mobile app is developed Siddharth Choudhary from Computer Science department, Stevens Institute of Technology, Hoboken, NJ, U.S.A. 
              </Text>
              <View style={styles.row}>
                <Image source={require('../Images/quest.png')} style={styles.imageDimensions} />
                <Image source={require('../Images/stevens_logo.png')} style={[styles.imageDimensions, styles.ml20]} />
              </View>
            </View>
           
          </ScrollView>
        );
      }
}

const styles = StyleSheet.create({
    welcome: {
      fontSize: 16,
      color : '#ff4a52',
      marginBottom : 20
    },
    imageDimensions :{
      width : 150,
      height : 50
    },
    row :{
      flex : 1,
      flexDirection : 'row'
    },
    ml20 : {
      marginLeft : 20
    },
    bg :{
      margin : 0,
      backgroundColor : '#fff'
    },
    addMargin :{
      margin : 20,
    },
    link :{
      color : 'blue',
    }

  });
  

export default About;