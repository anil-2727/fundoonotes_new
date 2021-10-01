import React, {Component} from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNote } from "../../services/userServices";
import { retrieveAsyncData } from "../../services/authServices";

class CreateNote extends Component{

    constructor(){
        super();

        this.state = {
            title:'',
            description:'',
            email:'',
        }
        
    }

    userEmail = retrieveAsyncData('userEmail');
    
    

    handleTitleInput = (val) => {
        this.setState({
            title:val
        })
    }

    handleNoteInput = (val) => {
        this.setState({
            description:val,
            email:this.userEmail._W
        })
    }


    handleCreateNote = () => {
        let data = {
            title:this.state.title,
            description:this.state.description,
            email:this.state.email
        }
        createNote(data);

        this.props.navigation.navigate('Dashboard');
    }

    componentWillUnmount(){ 
        console.log(this.state.title," ", this.state.description, " ", this.state.email)
    }
    
    render () {
        

        return (
            <View style={{flex:1, backgroundColor:'#ffff'}}>

                <View style={[{ padding:2, justifyContent:'space-between', alignItems:'center'}, {flexDirection: "row",}]}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', padding:12}}>
                        <TouchableOpacity  onPress={() => this.handleCreateNote()}>
                            <Icons name="arrow-left" size={25} color='#525252' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent:'center', alignItems:'center', padding:12,}}>
                        <TouchableOpacity>
                            <Icons name="pin-outline" size={25} color='#525252' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent:'center', alignItems:'center', padding:12}}>
                        <TouchableOpacity>
                            <Icons name="bell-plus-outline" size={25} color='#525252' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent:'center', alignItems:'center', padding:10}}>
                        <TouchableOpacity>
                            <Icons name="archive-arrow-down-outline" size={25} color='#525252' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex:1, paddingHorizontal:15}}>
                    <View>
                        <TextInput placeholder='Title' style={{fontSize:22}} multiline value={this.state.title}
                            onChangeText={(input) => this.handleTitleInput(input)}
                        />
                    </View>
                    <View>
                        <TextInput placeholder='Note' style={{fontSize:18}} multiline value={this.state.description}
                            onChangeText={(input) => this.handleNoteInput(input)}
                        />
                    </View>
                </View>

                <View style={[{ padding:2 ,justifyContent:'space-between', alignItems:'center'}, {flexDirection: "row",}]}>
                    <View style={{ justifyContent:'center', alignItems:'center', padding:12}}>
                        <TouchableOpacity>
                            <Icons name="palette-outline" size={25} color='#525252' />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:12}}>
                        <TouchableOpacity>
                            <Text>Edited 12:32 pm</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent:'center', alignItems:'center', padding:10}}>
                        <TouchableOpacity>
                            <Icons name="dots-vertical" size={25} color='#525252' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default CreateNote;