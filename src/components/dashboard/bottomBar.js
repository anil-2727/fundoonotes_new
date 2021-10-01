import  React  from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';



const Bottombar = ({navigation}) => {

    return(
        <View style={[{ padding:2, borderWidth:0.5, borderColor:'#d4d4d4' ,justifyContent:'space-between', alignItems:'center', backgroundColor:'#ffff'}, {flexDirection: "row",}]}>
            <View style={{ justifyContent:'center', alignItems:'center', padding:12}}>
                <TouchableOpacity>
                    <Icons name="check-box-outline" size={25} color='#525252' />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent:'center', alignItems:'center', padding:12}}>
                <TouchableOpacity>
                    <Icons name="brush" size={25} color='#525252' />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent:'center', alignItems:'center', padding:12}}>
                <TouchableOpacity>
                    <Icons name="microphone-outline" size={25} color='#525252' />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent:'center', alignItems:'center', padding:12}}>
                <TouchableOpacity>
                    <Icons name="image-outline" size={25} color='#525252' />
                </TouchableOpacity>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'flex-end',}}>
                <View style={{borderWidth:1, borderRadius:50 , borderColor:'#F5F6FA', backgroundColor:'#F5F6FA', marginTop:-70, marginRight:30, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateNote')}>
                        <Icons name="plus-circle" size={60} color='#eab308' onPress={() => navigation.navigate('CreateNote')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Bottombar;