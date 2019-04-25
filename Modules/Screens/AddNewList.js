import React, {Component} from 'react'
import {Platform, Alert, FlatList, TouchableWithoutFeedback,StyleSheet, Text, Modal, View, Button,ImageBackground, TouchableHighlight, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, ActivityIndicator, Share} from 'react-native';
import {Icon} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
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
            firstTime:true
        }
    }
    async addItems(){
        if(await AsyncStorage.getItem(this.state.listName)===null){
            AsyncStorage.setItem(this.state.listName,JSON.stringify([]),(err)=>{
                //alert(err)
            })
        }
        this.setState({modalVisible:true})
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
                    AsyncStorage.setItem(this.state.listName,JSON.stringify(value),(err)=>{
                        //alert(err)
                    })
                }
            }
        })
    }
    addMoreItem(key){
        //first adding the current item to the list
        this.setState({firstTime:false})
        if(this.state.itemForTheList){
            this.state.listItems.push(this.state.itemForTheList)
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
    render(){
        return(
            <BackgroundImageComponent>
                <View style={[styles.container,styles.themeBg]}>
                     <View>
                        <ScrollView>
                            <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'stretch'}}>
                            
                            {
                                (this.state.listDone)?
                                <TextInput
                                style={{height: 40,alignItems:'stretch',margin:30,fontSize:30}}
                                placeholder="Type List's Unique Name!"
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
                                        transparent={false}
                                        backgroundColor='#c80512'
                                        visible={this.state.modalVisible}
                                        onRequestClose={() => {
                                            Alert.alert('Modal has been closed.');
                                        }}>
                                        <View style={{marginTop:50,width:300,height:(height)}}>
                                            <Grid>
                                                {
                                                    (this.state.firstTime)?
                                                        <Text style={{fontSize:20}}>Add your Item from below</Text>
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
                                                                    <Icon size={40} type='evilicon' color='green' name='like'/>                                                                
                                                                </TouchableOpacity>
                                                                </Col>
                                                                <Col>
                                                                <TouchableOpacity onPress={()=>this.addMoreItem(this.state.textInput.length)}>
                                                                    <Icon size={40} type='evilicon' color='green' name='plus'/>
                                                                </TouchableOpacity>
                                                                </Col>
                                                                <Col>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                    this.setState({modalVisible: !this.state.modalVisible});
                                                                    }}>
                                                                    <Icon size={40} type='evilicon' color='green' name='close'/>
                                                                </TouchableOpacity>
                                                                </Col>
                                                            </Row>
                                                        </Grid>
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
                                renderItem = {({item}) => (
                                    <TouchableOpacity style={styles.button}>
                                            <View>
                                                <Text style={styles.textCss}>
                                                    {item}
                                                </Text>
                                            </View>
                                    </TouchableOpacity>
                                )}
                                />
                            {
                                (this.state.listName)?
                                <TouchableOpacity
                                     onPress={()=>this.addItems()}>
                                    <Icon size={60} type='evilicon' color='#fff' name='plus'/>
                                    </TouchableOpacity>
                                :
                                    <View alignItems="center" justifyContent="center">
                                        <Text fontSize="20">Name the list first</Text>
                                    </View>
                            }
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
        backgroundColor : '#c80512',
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

