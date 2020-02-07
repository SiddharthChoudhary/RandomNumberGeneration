import React, {Component} from 'react'
import {Platform, Alert, FlatList,RefreshControl, TouchableWithoutFeedback,StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
var {height, width} = Dimensions.get('window');
import FlatListItem from '../components/FlatListItem'
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
        const showModal = navigation.getParam("show",()=>{});
        return{
            headerTitle: navigation.state.params.listName,
            headerRight:(
                <Button
                    title='Add More'  
                    onPress={()=>showModal()}
                    />
            ),
        }
    };

    state = {
     lists:[],
     randomIndex:0,
     modalVisible:false,
     AddMoremodalVisible:false,
     refreshing : false,
     itemForTheList:'',
     textInput:[],
     firstTime:true,
     randomIndex:0,
     RandomizedItemmodalVisible:false,
    }
    _onRefresh = () => {
        this.setState({refreshing: true});  
        this.getItem()
        this.setState({refreshing:false})
      }
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.navigation.setParams({show:()=>this.addMoreToTheList()});
        this.getItem()
      }
    getItem(){
        AsyncStorage.getItem(this.props.navigation.state.params.listName,(err,result)=>{
            if(err){
                alert(err)
            }else{
                var resultArray = JSON.parse(result).toString().split(",")
                if(resultArray==''){    
                    this.setState({refreshing:false})
                    alert("List is empty")  
                }else{
                this.setState({lists:resultArray})
                }
            }
        })
    }
    addMoreToTheList(){
        this.setState({
            textInput:[],
            itemForTheList:'',
            AddMoremodalVisible:true
        })
    }
    addItemToList(){
        AsyncStorage.getItem(this.props.navigation.state.params.listName,(err,result)=>{
            if(err){
                alert("No item with that name")
            }
            if(result){
                if(this.state.itemForTheList){
                    //for adding the last textinput's value to the list
                    this.state.lists.push(this.state.itemForTheList)
                    let value = JSON.parse(result)
                    value = Array.from(this.state.lists).concat(Array.from(value))
                    AsyncStorage.removeItem(this.props.navigation.state.params.listName,()=>{
                        AsyncStorage.setItem(this.props.navigation.state.params.listName,JSON.stringify(this.state.lists),(err)=>{
                            //alert(err)
                        })
                    })
                }
            }
        })
    }
    deleteAnItem = (itemName)=>{
        AsyncStorage.getItem(this.props.navigation.state.params.listName,(err,result)=>{
            if(err){
                alert("No item with that name")
            }
            if(result){
                //taking the result and then removing that particular instance by using a temporary array
                let value = JSON.parse(result).toString().split(",")
                let newArray = value.filter(item=> item !== itemName)
                AsyncStorage.setItem(this.props.navigation.state.params.listName,JSON.stringify(newArray),()=>{
                    AsyncStorage.getItem(this.props.navigation.state.params.listName,(err,result)=>{
                        if(result){
                            this.setState({
                                //to convert the result to an array
                                lists:JSON.parse(result).toString().split(","),
                            })
                        }
                    })
                })

            }
        })
    }
    addMoreItem(key){
        //first adding the current item to the list
        this.setState({firstTime:false})
        if(this.state.textInput.length!=0&&!this.state.itemForTheList){
            alert('First fill the previous value')
            return
        }
        if(this.state.itemForTheList){
            this.state.lists.push(this.state.itemForTheList)
            this.setState({
                itemForTheList:''
            })
        }

        if(this.state.AddMoremodalVisible){
            let textInput = this.state.textInput;
            textInput.push(
                <TextInput
                    style={{height: ((height/100)*10),alignItems:'stretch',fontSize:30}}
                    placeholder="Item"
                    key={{key}}
                    autoFocus={true}
                    onSubmitEditing={this.handleKeyDown.bind(this)}
                    onChangeText={(itemForTheList) => this.setState({itemForTheList})}
                    />
            );
            this.setState({textInput})
        }
    }
    randomizeTheList(){
        if(this.state.lists.length==0){
            alert("There is no item in the list")
        }else{
            fetch('https://exalted-iridium-265519.appspot.com/main?lower=0&higher='+Number.parseInt(this.state.lists.length-1)+'&amount=1')
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
    //for pressing the enter key and to handle it 
    handleKeyDown(){
        this.addMoreItem(this.state.textInput.length)
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
                                            renderItem = {({item,index}) => (
                                                     <FlatListItem item1={item} onPress={()=>{console.log("Do nothing")}} parentFlatList={this} index={index}>

                                                     </FlatListItem>
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
                                        transparent={true}
                                        backgroundColor='#c80512'
                                        visible={this.state.AddMoremodalVisible}
                                        onRequestClose={() => {
                                            Alert.alert('Modal has been closed.');
                                        }}>
                                        <View style={{
                                            flex:1,
                                            flexDirection:'column',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}>
                                            <View style={{backgroundColor:'#ffffff',marginTop:50,width:300,height:(height/2),borderRadius:30,padding:20}}>
                                            <Grid>
                                            {
                                                    (this.state.firstTime)?
                                                        <Text style={{fontSize:20,margin:30}} onPress={()=>this.addMoreItem(this.state.textInput.length)}>Add your Item from below</Text>
                                                    :
                                                    console.log("Nothing")
                                                }
                                                <Row size={3}>
                                                    <ScrollView>
                                                        <View>
                                                        {
                                                            this.state.textInput.map((value, index) => {
                                                                return value
                                                            })
                                                        }
                                                        </View>
                                                </ScrollView>
                                                </Row>
                                                    <Row>
                                                            <Col>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                    this.addItemToList()
                                                                    this.setState({AddMoremodalVisible: !this.state.AddMoremodalVisible});
                                                                    }}>
                                                                    <Icon size={50} type='ionicon' color='green' name='ios-checkmark'/>                                                                
                                                                </TouchableOpacity>
                                                                </Col>
                                                                <Col>
                                                                <TouchableOpacity onPress={()=>this.addMoreItem(this.state.textInput.length)}>
                                                                    <Icon size={60} type='ionicon' color='#c09000' name='ios-add'/>
                                                                </TouchableOpacity>
                                                                </Col>
                                                                <Col>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                    this.setState({AddMoremodalVisible: !this.state.AddMoremodalVisible});
                                                                    }}>
                                                                    <Icon size={50} type='ionicon' color='red' name='ios-close'/>
                                                                </TouchableOpacity>
                                                                </Col>
                                                            </Row>
                                                        </Grid>
                                        </View> 
                                        </View>                            
                                    </Modal>
                            <Modal
                                        animationType="slide"
                                        transparent={false}
                                        visible={this.state.modalVisible}
                                        closeOnClick={true}>
                                        <View style={{
                                            flex:1,
                                            flexDirection:'column',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}>
                                            <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}>
                                            <View style={{backgroundColor:'#ffffff',width:300,height:height-10}}> 
                                            <Grid>
                                                <Row size={.3}>
                                                    </Row>
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
                                        </View>
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
        // backgroundColor : '#c80512',
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

