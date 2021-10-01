import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Forget from '../components/forget';
import Login from '../components/login';
import ResetPassword from '../components/resetPassword';
import SignUp from '../components/signup';
import SplashScreen from '../components/splashScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator
        screenOptions = {{
            headerShown: false
        }}
        initialRouteName="Splash"
    >    
         <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
        /> 
        <Stack.Screen 
            name="Login" 
            component= {Login}
        />          
        <Stack.Screen 
            name="Signup" 
            component= {SignUp}
        />          
        <Stack.Screen 
            name="Forget" 
            component= {Forget}
        />
    </Stack.Navigator> 
)

export default  AuthNavigator;