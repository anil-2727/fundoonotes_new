import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { Input, FormControl, NativeBaseProvider, Link, Button} from "native-base"
import loginStyles from '../css/loginCss';
import { googleLogin, userLogin } from '../services/authServices';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const Login = ({navigation}) => {
    const [inputEmail, setInputEmail] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [emailErrorStatus, setEmailError] = useState();
    const [passwordErrorStatus, setPasswordError] = useState();

    const processEmail = (value) => {
      const emailRegex = RegExp('^[a-zA-z0-9.+-]+[@]+[a-zA-z0-9]+[.]+[a-zA-z0-9.]{2,}$');
    
      if (emailRegex.test(value) === false){
        setEmailError(true);
      }
      else {
        setInputEmail(value);
        setEmailError(false)
      }
    };
    const processPassword = (val) => {
      const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    
      if (passwordRegex.test(val) === false){
        setPasswordError(true);
      }
      else {
        setInputPassword(val);
        setPasswordError(false)
      }
    };

    return (
      <ScrollView>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
          <View style={loginStyles.banner}>
            <Image
              style={loginStyles.bannerImg}
              source={require('../assets/keepIcon.png')}
            />
            <Text style={loginStyles.bannerText}>fundoo Notes</Text>
          </View>

          <View style={loginStyles.inputSection}>
            <NativeBaseProvider>
              <FormControl isRequired isInvalid={!emailErrorStatus ? false : true}>
                <Input
                  width={'100%'}
                  placeholder="Email Id"
                  my={2}
                  keyboardType="email-address"
                  _light={{placeholderTextColor: 'blueGray.400'}}
                  _dark={{placeholderTextColor: 'blueGray.50'}}
                  _focus={{borderColor:'#eab308'}}
                  onChangeText={value => processEmail(value)}
                />
                <View style={loginStyles.errorField}>
                  <FormControl.ErrorMessage>
                    Invalid Email.
                  </FormControl.ErrorMessage>
                </View>
              </FormControl>

              <FormControl isRequired isInvalid={!passwordErrorStatus ? false : true}>
                <Input
                  width={'100%'}
                  placeholder="Password"
                  my={2}
                  type="password"
                  _light={{placeholderTextColor: 'blueGray.400'}}
                  _dark={{placeholderTextColor: 'blueGray.50'}}
                  _focus={{borderColor:'#eab308'}}
                  onChangeText={value => processPassword(value)}
                />
                <View style={loginStyles.errorField}>
                  <FormControl.ErrorMessage>
                    Invalid Password.
                  </FormControl.ErrorMessage>
                </View>
              </FormControl>
              
              <Link _text={{fontSize: 'sm', fontWeight: '700', color: '#eab308'}} 
                    alignSelf="flex-end " my={2} 
                    onPress={() => navigation.navigate('Forget')}>
                Forget Password?
              </Link>
              <Button 
                style={loginStyles.button} my={2} _text={{color: 'white'}}
                onPress={() => userLogin(inputEmail, inputPassword)}
                >
                Login
              </Button>
              <TouchableOpacity>
                <View style={loginStyles.loginWithGoogle}>
                  <Image style={{width:30, height:30}} source={require('../assets/googleIcon.png')}alt="Alternate Text"/>
                  <Text style={{fontSize:15, fontWeight:'600', marginHorizontal:8 }}>login with google</Text>
                </View>
              </TouchableOpacity>
              <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', marginBottom:10}}>
                <Text style={{fontSize:15, }}>Don't have an account ?</Text>
                <Link onPress={() => navigation.navigate('Signup')} _text={{fontSize: 'sm', fontWeight: '700', color: '#eab308'}} alignSelf="flex-end " my={2}> SignUp
                </Link>
              </View>
            </NativeBaseProvider>
          </View>
        </View>
      </ScrollView>
    );
}

export default Login;