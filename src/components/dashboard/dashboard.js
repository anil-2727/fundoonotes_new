import React, {Component} from "react";
import {View, Text, TouchableOpacity, ScrollView, RefreshControl, FlatList, ActivityIndicator, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { getCollectionData } from "../../services/userServices";
import Bottombar from "./bottomBar";
import NoteCard from "./noteCard";
import Topbar from "./topbar";

class Dashboard extends Component{

    constructor(){
        super();

        this.state = {
            viewType:false,
            loading: true,
            refresh:false,
            notesObj:[]
        }
    }

    /**
     * calling getCollectionData method to fatch Notes data from firebase
     */
    getData = async() => {
       let noteData = await getCollectionData();
       console.log("note data in Dashboard: ", noteData)

       this.setState({
        notesObj:noteData,
        loading:false,
        refresh:false
        
    })
    }

    componentDidMount(){
        this.props.navigation.addListener(
            'focus',
            payload => {
                this.getData();
                    this.setState({
                        loading:false,
                        refresh:false
                        
                    })
                })
        }

    onChangeView = (view) => {
        this.setState({
            viewType:view,
        })

    }
        

    render () {

        //   const onRefresh = () => {
        //       this.setState({
        //           refresh:true
        //       })
        //       this.componentDidMount()
        //       this.setState({
        //         refresh:false
        //     })
        //   }

        return(
                <View style={{flex:1}}>
                    <Topbar handleView = {this.onChangeView}/>
                    <ScrollView>
                        {this.state.loading?<View style={{margin:'50%'}}><ActivityIndicator color="#eab308" size="large" /></View>:null}
                        <View style={{flexDirection:'row', flexWrap:'wrap', flex:1}}>
                            
                            {/* <FlatList
                                numColumns={2}
                                data={this.state.notesObj} 
                                keyExtractor={(item) => item.id}
                                extraData={this.state.refresh}
                                renderItem={({ item }) => ( 
                                <TouchableOpacity  style={{flex:1,}} onPress={() => this.props.navigation.navigate('UpdateNote', {id:item.id, title: item.title, description:item.description }) }>
                                    <NoteCard title={item.title} description={item.description} />
                                </TouchableOpacity>
                                )}
                                refreshControl={<RefreshControl refreshing={this.state.refresh} onRefresh={onRefresh}/>}
                            /> */}

                            {this.state.notesObj.map(item => (
                                <TouchableOpacity style={{width: this.state.viewType ? '50%' :'100%', }}  key={item.id} onPress={() => this.props.navigation.navigate('UpdateNote', {id:item.id, title: item.title, description:item.description }) }>
                                    <NoteCard title={item.title} description={item.description} />
                                </TouchableOpacity>
                            ))}

                        </View>
                    </ScrollView>
                    <Bottombar navigation={this.props.navigation}/>
                </View>
        )
    }
}


export default Dashboard;