import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from "../components/dashboard/dashboard";
import CreateNote from '../components/dashboard/createNote';
import UpdateNote from '../components/dashboard/updateNote';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator
        initialRouteName="Dashboard"
    >     
        <Drawer.Screen 
            name="Dashboard" 
            component= {Dashboard}
        />              
        <Drawer.Screen 
            name="CreateNote" 
            component= {CreateNote}
        />              
        <Drawer.Screen 
            name="UpdateNote" 
            component= {UpdateNote}
        />              
    </Drawer.Navigator> 

)

export default DrawerNavigator;