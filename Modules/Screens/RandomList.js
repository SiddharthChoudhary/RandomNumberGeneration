import React, {Component} from 'react'
import {Platform, Alert, FlatList,RefreshControl, TouchableWithoutFeedback,StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import { YellowBox } from 'react-native';
import Swipeout from 'react-native-swipeout'
import FlatListItem from '../components/FlatListItem'
YellowBox.ignoreWarnings(['Remote debugger']);
class BackgroundImageComponent extends Component {
    render() {
      let image= this.props.image;
        return (
            <ImageBackground style={styles.backgroundImage} source={require('../Images/background.png')}>
                    {this.props.children}
            </ImageBackground>
        )
    }
}

class RandomList extends Component{
    static navigationOptions = ({navigation}) =>{
        return{
            headerTitle: 'Random List'
        }
    };

    state = {
        lists : [],
        refreshing : false
    }
    
    constructor(props){
        super(props)
        // AsyncStorage.clear()
    }
     deleteAnItem = async (listName) =>{
        await AsyncStorage.removeItem(listName,(err)=>{
             if(err){
                 alert("There's nothing to delete")
             }
         })
               await AsyncStorage.getAllKeys((err,result)=>{
                    if(result){
                        this.setState({
                            lists:result
                        })
                    }
                })
            }
    seeTheList = (listName) =>{
        if(listName){
            this.props.navigation.navigate('List',{'listName':listName})
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});  
        AsyncStorage.getAllKeys((err,keys)=>{
            if(keys){
                this.setState({
                    lists:keys,
                    refreshing:false
                })
            }
        });
      }
    addMore(){
        this.props.navigation.push('AddNewList')
    }
    componentDidMount(){
        AsyncStorage.getAllKeys((err,keys)=>{
            if(keys){
                this.setState({
                    lists:keys
                })
            }
          })
    }
    render(){
        return(
            <BackgroundImageComponent>
                <View style={[styles.container,styles.themeBg]}>
                    <View>
                    <View>
                                    <TouchableOpacity onPress={()=>this.addMore()}>
                                    <Icon size={60} type='evilicon' color='#fff' name='plus'/>
                                    </TouchableOpacity>
                                </View>
                            <ScrollView>
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            <FlatList
                                keyExtractor={item => item}
                                data = {this.state.lists}
                                renderItem = {({item,index}) => (
                                   <FlatListItem onPress={()=>this.seeTheList(item)} item1={item} parentFlatList={this} index={index}>

                                   </FlatListItem>
                                )}
                                />
                            <View>
                                <Text style={styles.poweredByStevens}>powered by Quest Lab @Stevens Institute of Technology</Text>
                            </View>
                            </ScrollView>
                        </View>
                </View>
            </BackgroundImageComponent>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        flexDirection: 'column'
    },
    themeBg :{
        // backgroundColor : '#c80512',
        margin : 0,
        padding : 0
    },
    color:{
        color:'#000000'
    },
    button:{
        alignItems:'center',
        padding:'10%' ,
    },
    poweredByStevens:{
        alignItems:'center',
        //alignContent:'center',
        justifyContent:'center',
        margin:20
    },
    flatlistStyle:{
        backgroundColor:'#c80512'
    },
    textCss:{
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:'#c09000',
        borderRadius:23,
        borderWidth: 0.9,
        overflow:'hidden',
        padding:9
    },
    borderRadiusForView:{
        borderRadius:30
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
  }
})
// const mapStateToProps = state => {
//     return {
//       lists: state.lists.lists
//     }
// }
export default RandomList

