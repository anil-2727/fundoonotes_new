import {StyleSheet} from 'react-native'

const signupStyles = StyleSheet.create({
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
    },

    bannerImg:{
        width:100, 
        height:100,
        marginTop:'5%'
    },

    bannerText:{
        fontSize:20, 
        fontWeight:'bold'
    },

    inputSection:{
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:'8%',  
        width:'90%',
        flex:1,
        flexDirection:'row'
    },

    errorField:{
        height:30
    },

    errorText:{
        color:'#e11d48'
    },

    button:{
        backgroundColor:'#eab308',
        tintColor:'white'
    }
})

export default signupStyles;