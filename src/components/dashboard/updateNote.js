import React, {Component} from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateNote } from "../../services/userServices";
import { retrieveAsyncData } from "../../services/authServices";

class UpdateNote extends Component{

    constructor(){
        super();

        this.state = {
            id:'',
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
    
    componentDidMount(){
        const {id, title, description } = this.props.route.params;

        this.setState({
            id:id,
            title:title,
            description:description
        })
    }

    componentWillUnmount(){
        const updatedData = {
            title:this.state.title,
            description:this.state.description
        }

        updateNote(this.state.id, updatedData);
        console.log(this.state.title," ", this.state.description, " ", this.state.email)
    }
    
    render () {
        

        return (
            <View style={{flex:1, backgroundColor:'#ffff'}}>

                <View style={[{ padding:2, justifyContent:'space-between', alignItems:'center'}, {flexDirection: "row",}]}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', padding:12}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Dashboard')}>
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

export default UpdateNote;