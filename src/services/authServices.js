import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

/**
 * Handling user signup process
 * @param {obj} userData 
 */
export const userSignup = async (userData) => {

  if(!userData.email || !userData.password){
    Alert.alert('Error', 'Please enter all fields')
    Snackbar.show({
      text: 'Error: Please enter all fields',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
  return auth().createUserWithEmailAndPassword(userData.email, userData.password)
  .then( async (cred) => {
      const {uid} = cred.user;

      storeAsyncData('userEmail', cred.user.email);  //storing email in async storage for future use

      return uid
  })
  .then(uid => {
    createUserInDB(uid, userData);
      auth().currentUser.updateProfile({
      displayName: userData.firstName+" "+userData.lastName
  })
  })
  .catch(
      err => Alert.alert(err.code, err.message)
  )

};


/**
 * Handling user login process
 * @param {object} userData 
 */
export const userLogin = async (email, password) => {

  if(!email || !password){
    Snackbar.show({
      text: 'error : please enter all fields',
      duration: Snackbar.LENGTH_SHORT,
    });
  }else{

    return auth().signInWithEmailAndPassword(email, password)
    .then((item) => {
      console.log("logged In User Details : ", item)
        storeAsyncData('userEmail', item.user.email);  //storing email in async storage for future use
    })
    .catch(
       err => Alert.alert(err.code, err.message) 
    )
  }

}


/**
 * Handling forget password for a account.
 * @param {email} email 
 * @returns 
 */
export const forgetPassword = (email) => {
  if(!email){
    Snackbar.show({
      text: 'Error: please enter email',
      duration: Snackbar.LENGTH_SHORT,
    });
  }else{
    return auth().sendPasswordResetEmail(email);
  }
}

/**
 * Handling signOut process
 * @returns nothing 
 */
export const signOut = () => {
  Snackbar.show({
    text: 'signOut Successfully',
    duration: Snackbar.LENGTH_SHORT,
  });
  clearAsync();
  return auth().signOut();
}

/**
 * Creating new user in users collection
 * @param {*} uid 
 * @param {object} userData 
 */
export const createUserInDB = (uid, userData) => {
  firestore()
  .collection('Users')
    .doc(uid)
    .set(userData)
    .then(() => {
      Snackbar.show({
        text: 'User added to collection!',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
}



//AsyncStorage  functions start here /////////////////////////////////////////////////////////////////////////

const storeAsyncData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("stored email in Async Storage")
  } catch (error) {
      console.log(error)
  }
};

const clearAsync = () => {
  AsyncStorage.clear();
  console.log('Async Data Cleared')
};

export const retrieveAsyncData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Email : ",value);
      return value;
    }
  } catch (error) {
      console.log(error)
  }
};

/////// AsyncStorage  functions end here //////////////////////////////////////////////////////////////////////////////////////////////////////