import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Dashboard from "../components/dashboard/dashboard";
import CreateNote from '../components/dashboard/createNote';
import UpdateNote from '../components/dashboard/updateNote';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator
        screenOptions = {{
            headerShown: false
        }}
        initialRouteName="Dashboard"
    >     
        <Stack.Screen 
            name="Dashboard" 
            component= {Dashboard}
        />              
        <Stack.Screen 
            name="CreateNote" 
            component= {CreateNote}
        />              
        <Stack.Screen 
            name="UpdateNote" 
            component= {UpdateNote}
        />              
    </Stack.Navigator> 

)

export default  AppNavigator;