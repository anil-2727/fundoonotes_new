import React from "react";
import {View, Text, Image} from 'react-native';

const SplashScreen = ({navigation}) => {

    setTimeout(() => navigation.navigate('Login'), 1000)

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
            <Image
              style={{width:100, height:100, }}
              source={require('../assets/keepIcon.png')}
            />
            <Text style={{fontSize:20, fontWeight:'bold', marginVertical:10}}>Fundoo Notes</Text>
        </View>
    )
}

export default SplashScreen;