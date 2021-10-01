import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import { Input, FormControl, Center, NativeBaseProvider, Link, Button, Container} from "native-base"
import forgetStyles from '../css/forgetCss';
import { forgetPassword } from '../services/authServices';

const Forget = () => {
  const [inputEmail, setInputEmail] = useState();
  const [emailErrorStatus, setEmailError] = useState();

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

    return (
      <ScrollView>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={forgetStyles.banner}>
            <Image
              style={forgetStyles.bannerImg}
              source={require('../assets/keepIcon.png')}
            />
            <Text style={forgetStyles.bannerText}>fundoo Notes</Text>
          </View>

          <View style={forgetStyles.inputSection}>
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
                <View style={forgetStyles.errorField}>
                  <FormControl.ErrorMessage>
                    inValid Email.
                  </FormControl.ErrorMessage>
                </View>
              </FormControl>

              <Button 
                style={forgetStyles.button} my={2} _text={{color: 'white'}} 
                onPress={() => forgetPassword(inputEmail)}>
                Send
              </Button>
              
            </NativeBaseProvider>
          </View>
        </View>
      </ScrollView>
    );
}

export default Forget;