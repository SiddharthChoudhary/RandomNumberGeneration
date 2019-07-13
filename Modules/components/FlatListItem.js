import React, {Component} from 'react'
import {Platform, Alert, FlatList,RefreshControl, TouchableWithoutFeedback,StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon} from 'react-native-elements'
import Swipeout from 'react-native-swipeout'

class FlatListItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeRowKey:null
        }
    }
    render(){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }              
            },          
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item1.key });
            },      
            right: [
                { 
                    onPress: () => {    
                        const deletingRow = this.state.activeRowKey;          
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [                              
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {        
                                //flatListData.splice(this.props.index, 1); 
                                //Refresh FlatList ! 
                                this.props.parentFlatList.deleteAnItem(this.props.item1);
                              }},
                            ],
                            { cancelable: true }
                          ); 
                    }, 
                    text: 'Delete', type: 'delete' 
                }
            ],  
            rowId: this.props.index, 
            sectionId: 1    
        };
        return(
            <Swipeout {...swipeSettings} style={styles.flatlistStyle}>
                 <TouchableOpacity style={styles.button} 
                                        onPress={(item)=>this.props.onPress(item)}>
                                            <View style={styles.borderRadiusForView}>
                                                <Text style={styles.textCss}>
                                                    {this.props.item1}
                                                </Text>
                                            </View>
                                    </TouchableOpacity>
            </Swipeout>
        )
    }
}
const styles = StyleSheet.create({
    textCss:{
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:'transparent',
        borderRadius:15,
        margin: 5,
        borderWidth: 0.9,
        overflow:'hidden',
        padding:9
    },
    borderRadiusForView:{
        borderRadius:30
    },
    flatlistStyle:{
        backgroundColor: 'transparent'
    },
})
export default FlatListItem