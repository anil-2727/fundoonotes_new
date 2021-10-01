import {StyleSheet} from 'react-native'

const resetPasswordStyles = StyleSheet.create({
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
        alignItems:'center', 
        marginTop:'8%',  
        width:'90%',
        flex:1,
        flexDirection:'row'
    },
    
    errorField:{
        height:30
    },

    button:{
        backgroundColor:'#eab308',
        tintColor:'white'
    }
})

export default resetPasswordStyles;