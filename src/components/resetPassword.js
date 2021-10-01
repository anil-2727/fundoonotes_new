import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import { Input, FormControl, Center, NativeBaseProvider, Link, Button, Container} from "native-base"
import resetPasswordStyles from '../css/resetPasswordCss';

const ResetPassword = () => {
  const [inputPassword, setInputPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [ErrorStatus, setPasswordError] = useState();


  const processPassword = (value) => {
    const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");;
  
    if (passwordRegex.test(value) === false){
      setPasswordError(true);
    }
    else {
      setInputPassword(value);
      setPasswordError(false)
    }
  }

  const onSave = () => {
      if (inputPassword && confirmPassword) {
        console.log("Data filled : ",inputPassword ,confirmPassword );
      }else{
        console.log("Data is not filled ");
      }
  }

    return (
      <ScrollView>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={resetPasswordStyles.banner}>
            <Image
              style={resetPasswordStyles.bannerImg}
              source={require('../assets/keepIcon.png')}
            />
            <Text style={resetPasswordStyles.bannerText}>fundoo Notes</Text>
          </View>

          <View style={resetPasswordStyles.inputSection}>
            <NativeBaseProvider>
              <FormControl isRequired isInvalid={!ErrorStatus ? false : true}>
                <Input
                  width={'100%'}
                  placeholder="New Password"
                  my={2}
                  type="password"
                  _light={{placeholderTextColor: 'blueGray.400'}}
                  _dark={{placeholderTextColor: 'blueGray.50'}}
                  _focus={{borderColor:'#eab308'}}
                  onChangeText={value => processPassword(value)}
                />
                <View style={resetPasswordStyles.errorField}>
                  <FormControl.ErrorMessage>
                    inValid Password.
                  </FormControl.ErrorMessage>
                </View>
              </FormControl>

              <FormControl isRequired isInvalid={!(inputPassword === confirmPassword) ? true : false}>
                <Input
                  width={'100%'}
                  placeholder="Confirm Password"
                  my={2}
                  type="password"
                  _light={{placeholderTextColor: 'blueGray.400'}}
                  _dark={{placeholderTextColor: 'blueGray.50'}}
                  _focus={{borderColor:'#eab308'}}
                  onChangeText={value => setConfirmPassword(value)}
                />
                <View style={resetPasswordStyles.errorField}>
                  <FormControl.ErrorMessage>
                    Password Not Matched
                  </FormControl.ErrorMessage>
                </View>
              </FormControl>

              <Button style={resetPasswordStyles.button} my={2} _text={{color: 'white'}} onPress={onSave()}>
                save
              </Button>
              
            </NativeBaseProvider>
          </View>
        </View>
      </ScrollView>
    );
}

export default ResetPassword;