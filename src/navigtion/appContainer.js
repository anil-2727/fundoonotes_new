import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// import navigators
import AppNavigator from './appNavigator';
import AuthNavigator from './authNavigator';

// firebase auth
import auth from '@react-native-firebase/auth';

const AppContainer = () => {
    // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

   // Handle user state changes
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) 
        setInitializing(false);
  }

  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) 
    return null;

    return(
        <NavigationContainer>
            { user ? <AppNavigator /> : <AuthNavigator /> }
        </NavigationContainer>
    )
}

export default AppContainer;