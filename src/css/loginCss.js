import {StyleSheet} from 'react-native'

const loginStyles = StyleSheet.create({
    banner:{
        justifyContent:'center', 
        alignItems:'center', 
    },

    bannerImg:{
        width:100, 
        height:100,
        marginTop:'30%'
    },

    bannerText:{
        fontSize:20, 
        fontWeight:'bold'
    },

    inputSection:{
        justifyContent:'center',  
        marginTop:'8%',  
        width:'90%',
        flex:1,
    },

    errorField:{
        height:30
    },

    button:{
        backgroundColor:'#eab308',
        tintColor:'white'
    },

    loginWithGoogle:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'center',
        padding:8,
        borderWidth:1,
        borderRadius:8,
        borderColor:'#eab308',
        marginVertical:15
    }
})

export default loginStyles;