import React, {Component} from 'react'
import {Platform, Alert, FlatList, RefreshControl,TouchableWithoutFeedback,StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import {Icon} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'
import FlatListItem from '../components/FlatListItem'
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

class AddNewList extends Component{
    static navigationOptions = ({navigation}) =>{
        return{
            headerTitle: 'Random List'
        }
    };

    constructor(props){
        super(props)
        this.state={
            listName:'',
            listItems:[],
            modalVisible:false,
            itemForTheList:'',
            textInput:[],
            listDone:true,
            firstTime:true,
            RandomizedItemmodalVisible:false,
            randomIndex:0
        }
    }
    async addItems(){
        if(await AsyncStorage.getItem(this.state.listName)===null){
            AsyncStorage.setItem(this.state.listName,JSON.stringify([]),(err)=>{
                //alert(err)
            })
        }
        this.setState({modalVisible:true})
        this.setState({textInput:[],firstTime:true,itemForTheList:''})
    }
    _onRefresh = () => {
        this.setState({refreshing: true});  
        this.getItem()
        this.setState({refreshing:false})
      }

    getItem(){
        AsyncStorage.getItem(this.state.listName,(err,result)=>{
            if(err){
                alert(err)
            }else{
                var resultArray = JSON.parse(result).toString().split(",")
                if(resultArray==''){    
                    alert("List is empty")  
                }else{
                this.setState({listItems:resultArray})
                }
            }
        })
    }
    addItemToList(){
        AsyncStorage.getItem(this.state.listName,(err,result)=>{
            if(err){
                alert("No item with that name")
            }
            if(result){
                if(this.state.itemForTheList){
                    this.state.listItems.push(this.state.itemForTheList)
                    let value = JSON.parse(result)
                    value = [this.state.listItems,...value]
                    AsyncStorage.setItem(this.state.listName,JSON.stringify(this.state.listItems),(err)=>{
                        //alert(err)
                    })
                }
            }
        })
    }
    deleteAnItem = (itemName)=>{
        AsyncStorage.getItem(this.state.listName,(err,result)=>{
            if(err){
                alert("No item with that name")
            }
            if(result){
                //taking the result and then removing that particular instance by using a temporary array
                let value = JSON.parse(result).toString().split(",")
                let newArray = value.filter(item=> item !== itemName)
                AsyncStorage.setItem(this.state.listName,JSON.stringify(newArray),()=>{
                    AsyncStorage.getItem(this.state.listName,(err,result)=>{
                        if(result){
                            this.setState({
                                //to convert the result to an array
                                listItems:JSON.parse(result).toString().split(",")
                            })
                            this.state.textInput.splice(this.state.textInput.length-1,1)
                        }
                    })
                })

            }
        })
    }
    //when the thumbsUp button is clicked to show the modal and to add the particular item in the list
    addMoreItem(key){
        //first adding the current item to the list
        this.setState({firstTime:false})
        //so that you can't fill up other fields
        if(this.state.textInput.length!=0&&!this.state.itemForTheList){
            alert('First fill the previous value')
            return
        }
        if(this.state.itemForTheList){
            this.state.listItems.push(this.state.itemForTheList)
            this.setState({
                itemForTheList:''
            })
        }
        if(this.state.modalVisible){
            let textInput = this.state.textInput;
            textInput.push(
                <TextInput
                    style={{height: 40,alignItems:'stretch',fontSize:30}}
                    placeholder="Item"
                    key={{key}}
                    onChangeText={(itemForTheList) => this.setState({itemForTheList})}
                    />
            );
            this.setState({textInput})
        }
    }
    randomizeTheList(){
        if(this.state.listItems.length==0){
            alert("THere is no item in the list")
        }else{
            fetch('http://quest.phy.stevens.edu:5050/main?lower=0&higher='+Number.parseInt(this.state.listItems.length-1)+'&amount=1')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        randomIndex: responseJson.finalrandomarray
                    },()=>{
                        this.setState({RandomizedItemmodalVisible:true})
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
                     <View>
                        <ScrollView>
                        <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'stretch'}}>
                            
                            {
                                (this.state.listDone)?
                                <TextInput
                                style={{height: 40,alignItems:'stretch',margin:30,fontSize:30}}
                                placeholder="List's Unique Name!"
                                onChangeText={(listName) => this.setState({listName})}
                                />
                                :
                                <View>
                                    <Text style={styles.textCssForHeading}>
                                        {this.state.listName}
                                    </Text> 
                                </View>
                            }
                                    <Modal 
                                        animationType="slide"
                                        transparent={true}
                                        backgroundColor='#c80512'
                                        visible={this.state.modalVisible}
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
                                                                    this.setState({modalVisible: !this.state.modalVisible,listDone:false});
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
                                                                    this.setState({modalVisible: !this.state.modalVisible});
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
                                        visible={this.state.RandomizedItemmodalVisible}
                                        closeOnClick={true}>
                                        <View style={{
                                            flex:1,
                                            flexDirection:'column',
                                            justifyContent:'center',
                                            alignItems:'center'
                                        }}>
                                            <TouchableOpacity onPress={()=>{this.setState({RandomizedItemmodalVisible:false})}}>
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
                                                            <Text style={[styles.button,styles.textCss]}>{this.state.listItems[this.state.randomIndex]}</Text>
                                                        </View>
                                                    </Row>
                                                    </Grid>
                                                </Row>
                                            </Grid>
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                            <FlatList
                                keyExtractor={item => item}
                                style={{
                                    flex: 1,
                                    width: 300,
                                    flexDirection:'column',
                                    alignContent:'center'   
                                }}
                                data = {this.state.listItems}
                                renderItem = {({item,index}) => (
                                    <FlatListItem item1={item} onPress={()=>{console.log("Do nothing")}} parentFlatList={this} index={index}>

                                    </FlatListItem>
                                )}
                                />
                            {
                                (this.state.listName)?
                                <TouchableOpacity
                                     onPress={()=>this.addItems()} margin='20'>
                                    <Icon size={60} type='evilicon' color='#fff' name='plus'/>
                                    </TouchableOpacity>
                                :
                                    console.log("Nothing")
                                    // <View alignItems="center" justifyContent="center">
                                    //     <Text fontSize="20">Name the list first</Text>
                                    // </View>
                            }
                                 <View style={{alignItems:'center',justifyContent:'center'}}>
                                 <TouchableOpacity
                                    onPress={() => this.randomizeTheList()}>
                                    <Image  source={require("../Images/button.png")} style={styles.imageStyle}/>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View> 
                </View>
            </BackgroundImageComponent>
        )
    }
}
const mapStateToProps = state => {
    return {
      lists: state.lists
    }
}
const mapDispatchToProps = dispatchEvent =>{
    return {
        add: (listName,list) =>{
            dispatchEvent(addList(listName,list))
        }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:40,
        alignItems:'center',
        justifyContent:'center'
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
    textCss:{
        fontSize: 10,
        fontWeight: 'bold',
        backgroundColor:'#c09000',
        borderRadius:23,
        borderWidth: 0.9,
        overflow:'hidden',
        padding:9
    },
    textCssForHeading:{
        fontSize: 20,
        backgroundColor:'#875305',
        borderRadius:23,
        borderWidth: 0.9,
        overflow:'hidden',
        padding:9,
        margin:30
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
  }
})
export default connect(mapStateToProps,mapDispatchToProps)(AddNewList)

