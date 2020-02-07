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

const TextInputComponent = ({value, onChangeText, name, ...props}) => (
    <TextInput
        value={value}
        autoFocus={true}
        onChangeText={(value) => onChangeText(name, value)} //... Bind the name here
        {...props}
    />
)

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
            listItems:{},
            listDone:true,
            itemForTheList:'',
            textInput:[],
            modalVisible:false,
            RandomizedItemmodalVisible:false,
            randomIndex:0,
            TemporaryArrayForDisplay:[]
        }
    }
    handleTextChange=(name,value)=>{
        if(name in this.state.listItems){
            this.state.listItems[name]=value
        }
    }
    async handleChangeOfListName(value){
        this.setState({
            listName:value
        })
    }
    _onRefresh = () => {
        this.setState({refreshing: true});  
        this.getItem()
        this.setState({refreshing:false})
    }
    componentWillUnmount(){
        listItems = this.state.listItems
        let listItemsSet = []
        if(Object.entries(listItems).length!=0){
            Object.keys(listItems).map((key,index)=>{
                    if(listItems[key]!=''){
                        listItemsSet.push(listItems[key])
                    }
                })
                this.addItemToList(listItemsSet)
        }
        this.props.navigation.state.params.getAllData();
    }
    getItem(){
        AsyncStorage.getItem(this.state.listName,(err,result)=>{
            if(err){
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
    async addItemToList(listItems){
        await AsyncStorage.getItem(this.state.listName,(err,result)=>{
            if(err){
                alert("No item with that name")
            }
            else{
                    let value = JSON.parse(result)
                    value = [listItems,...value]
                    console.log("listItems is under control", value)
                    AsyncStorage.setItem(this.state.listName,JSON.stringify(value),(err)=>{
                        //alert(err)
                    })
                }
        })
    }
    async addTextInputToUI(key){
        if(!this.state.listName){
            alert("Name the list first")
        }else{
            if(await AsyncStorage.getItem(this.state.listName)==null){
                await AsyncStorage.setItem(this.state.listName,JSON.stringify([]),(err)=>{
                    // alert(err)
                })
            }
            let textInput = this.state.textInput;
            if(this.state.itemForTheList!=""){
                this.state.listItems.push(this.state.itemForTheList)
            }
                textInput.push(
                        <TextInputComponent
                            value={this.state.value}
                            placeholder="Item"
                            key={{key}}
                            style={{height:(40),alignItems:'stretch',fontSize:30,borderWidth:1,margin:5}}
                            onChangeText={this.handleTextChange}
                            onSubmitEditing={this.handleKeyDown.bind(this)}
                            name={'textInput'+key}
                        />
                );
                this.state.listItems['textInput'+key]=''
                this.setState({textInput})
        }
    }
    // listitems should be there and should not be null
    generateInputArrayToChooseFrom(){
        listItems = this.state.listItems
        if(!listItems){
            return;
        }
        Object.keys(listItems).map((key,index)=>{
            if(listItems[key]!=''){
                this.state.TemporaryArrayForDisplay.push(listItems[key])
            }
        })
    }
    randomizeTheList(){
        if(this.state.listItems.length==0){
            alert("There is no item in the list")
        }else{
            this.generateInputArrayToChooseFrom()
            fetch('https://exalted-iridium-265519.appspot.com/main?lower=0&higher='+Number.parseInt(this.state.TemporaryArrayForDisplay.length-1)+'&amount=1')
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
    handleKeyDown(){
        this.addTextInputToUI(this.state.textInput.length)
    }
    render(){
        return(
            <BackgroundImageComponent>
                <View style={[styles.container,styles.themeBg]}>
                     <View>
                        <Row size={3} alignItems="center" justifyContent="center">
                        <ScrollView keyboardDismissMode={'on-drag'} keyboardShouldPersistTaps='handled'>
                        {/* <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                /> */}
                            <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'stretch'}}>
                            
                            {
                                (this.state.listDone)?
                                <TextInput
                                style={{height: 40,alignItems:'stretch',margin:30,fontSize:30,padding:2}}
                                placeholder="Name your list"
                                onChangeText={(value)=>this.handleChangeOfListName(value)}
                                onSubmitEditing={this.handleKeyDown.bind(this)}
                                />
                                :
                                <View>
                                    <Text style={styles.textCssForHeading}>
                                        {this.state.listName}
                                    </Text> 
                                </View>
                            }
                            {
                                (this.state.textInput.length<1)?
                                <TouchableOpacity
                                    onPress={()=>this.addTextInputToUI(this.state.textInput.length)}
                                    margin='20'>
                                    <Icon size={60} type='evilicon' color='#fff' name='plus'/>
                                    </TouchableOpacity>
                                :
                                    console.log("Nothing")
                            }
                                    <View>
                                        {
                                            this.state.textInput.map((value, index) => {
                                                return value
                                            })
                                        }
                                    </View>
                            </View>
                        </ScrollView>
                        </Row>
                        <Row size={1} alignItems="center" justifyContent= 'center'>
                                <TouchableOpacity
                                    onPress={() => this.randomizeTheList()}>
                                    <Image  source={require("../Images/button.png")} style={styles.imageStyle}/>
                                </TouchableOpacity>
                        </Row>
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
                                                            <Text style={[styles.button,styles.textCss]}>{this.state.TemporaryArrayForDisplay[this.state.randomIndex]}</Text>
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

