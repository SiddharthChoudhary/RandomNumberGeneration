import React, {Component} from 'react'
import {Platform, Alert, FlatList,RefreshControl, TouchableWithoutFeedback,StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
var {height, width} = Dimensions.get('window');

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

class List extends Component{
    static navigationOptions = ({navigation}) =>{
        return{
            headerTitle: navigation.state.params.listName
        }
    };

    state = {
     lists:[],
     randomIndex:0,
     modalVisible:false,
     refreshing : false
    }
    _onRefresh = () => {
        this.setState({refreshing: true});  
        this.getItem()
        this.setState({refreshing:false})
      }
    constructor(props){
        super(props)
    }
    getItem(){
        AsyncStorage.getItem(this.props.navigation.state.params.listName,(err,result)=>{
            if(err){
                alert(err)
            }else{
                var resultArray = JSON.parse(result).toString().split(",")
                if(resultArray==''){    
                    alert("List is empty")  
                }else{
                this.setState({lists:resultArray})
                }
            }
        })
    }
    componentDidMount(){
       this.getItem()
    }
    randomizeTheList(){
        if(this.state.lists.length==0){
            alert("THere is no item in the list")
        }else{
            fetch('http://quest.phy.stevens.edu:5050/main?lower=0&higher='+Number.parseInt(this.state.lists.length-1)+'&amount=1')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        randomIndex: responseJson.finalrandomarray
                    },()=>{
                        this.setState({modalVisible:true})
                    })
                    
                })
                .catch((error)=>{
                alert(error)
            })
        }
    }
    render(){
        return(
            <BackgroundImageComponent>
                <View style={[styles.container,styles.themeBg]}>
                <Grid>
                    <Row size={3}>
                        <ScrollView>
                        <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            <FlatList
                                            keyExtractor={item => item.toString()}
                                            style={{
                                                flex: 1,
                                                width: 300,
                                            }}
                                            data = {this.state.lists}
                                            renderItem = {({item}) => (
                                                    <View style={[styles.button,styles.borderRadiusForView]} >
                                                            <Text style={styles.textCss}>
                                                                {item}
                                                            </Text>
                                                    </View>
                                            )}
                                            />
                        </ScrollView>
                    </Row>
                    <Row alignItems="center" justifyContent= 'center'>
                                <TouchableOpacity
                                    onPress={() => this.randomizeTheList()}>
                                    <Image  source={require("../Images/button.png")} style={styles.imageStyle}/>
                                </TouchableOpacity>
                    </Row>
                </Grid>
                            <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.modalVisible}
                                        closeOnClick={true}
                                        onRequestClose={() => {
                                            Alert.alert('Modal has been closed.');
                                        }}>
                                        <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}>
                                        <View style={{height:height-10}}> 
                                        <Grid>
                                            <Row size={.3}>
                                                </Row>
                                            {/* <Row style={{alignSelf:'flex-end'}}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                    this.setState({modalVisible: !this.state.modalVisible});
                                                    }}>
                                                    <Icon size={30} type='evilicon' color='green' name='close'/>
                                                </TouchableOpacity>
                                            </Row> */}
                                            <Row>
                                                <Grid alignItems="center" justifyContent="center">
                                                <Row size={.3}>
                                                    <View>
                                                        <Text style={styles.textCssForOnlyBoldAndWidth}>Choosen one is</Text>
                                                    </View>
                                                </Row>
                                                <Row>
                                                    <View>
                                                        <Text style={[styles.button,styles.textCss]}>{this.state.lists[this.state.randomIndex]}</Text>
                                                    </View>
                                                </Row>
                                                </Grid>
                                            </Row>
                                        </Grid>
                                        </View>
                                        </TouchableOpacity>
                                    </Modal>
                </View>
            </BackgroundImageComponent>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        alignItems:'center',
        justifyContent:'center'
    },
    themeBg :{
        backgroundColor : '#c80512',
        margin : 0,
        padding : 0
    },
    button:{
        alignItems:'center',
        padding:'10%' ,
    },
    color:{
        color:'#000000'
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
    textCssForOnlyBoldAndWidth:{
        fontWeight:'bold',
        fontSize:20
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
export default List

