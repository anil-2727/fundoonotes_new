import React, {Component} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import { Input, FormControl, Center, NativeBaseProvider, Link, Button} from "native-base"
import Snackbar from 'react-native-snackbar';
import signupStyles from '../css/signupCss';
import { userSignup } from '../services/authServices';


class SignUp extends Component {

    constructor(){
        super();

        this.state={
            fName:'',
            lName:'',
            email:'',
            password:'',
            confirmPassword:'',

            errorFname:'',
            errorLname:'',
            errorPassword:'',
            errorEmail:'',
            isPasswordConformed:false
        };
    }
    
    processFirstName = (val) => {
        const nameRegex = /^[A-Z]{1}[a-z]{2,}$/;
        if (!nameRegex.test(val)){
            this.setState({
                errorFname:true,
            })
        }
        else {
            this.setState({
                fName:val,
                errorFname:false,
            })
        }
    };

    processLastName = (val) => {
        const nameRegex = /^[A-Z]{1}[a-z]{2,}$/;
        if (!nameRegex.test(val)){
            this.setState({
                errorLname:true,
            })
        }
        else {
            this.setState({
                lName:val,
                errorLname:false,
            })
        }
    };

    processEmail = (val) => {
        const emailRegex = RegExp('^[a-zA-z0-9.+-]+[@]+[a-zA-z0-9]+[.]+[a-zA-z0-9.]{2,}$');
        
        if (!emailRegex.test(val)){
            this.setState({
                errorEmail:true,
            })
        }
        else {
            this.setState({
                email:val,
                errorEmail:false,
            })
        }
    }

    processPassword = (val) => {
    const passwordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    if (!passwordRegex.test(val)){
        this.setState({
            errorPassword:true,
        })
    }
    else {
        this.setState({
            password:val,
            errorPassword:false,
        })
    }
    }

    confirmPassword = (val) => {
        if(this.state.password === val){
            this.setState({
                isPasswordConformed:true,
                confirmPassword:val
            })
        }else{
            this.setState({
                isPasswordConformed:false,
            })
        }
    }

   
    onSubmit = () => {
        if (this.state.email && this.state.password && this.state.fName && this.state.lName && this.state.confirmPassword) {
            let userData = {
                firstName: this.state.fName,
                lastName: this.state.lName,
                email: this.state.email,
                password: this.state.password
            }

            let res = userSignup(userData);
            console.log("object Data : ", userData)
        }else{
            Snackbar.show({
                text: 'error: please enter all fields',
                duration: Snackbar.LENGTH_SHORT,
              });
        }
    }
  
    render() {

        return(
            <ScrollView>
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={signupStyles.banner}>
                        <Image
                        style={signupStyles.bannerImg}
                        source={require('../assets/keepIcon.png')}
                        />
                        <Text style={signupStyles.bannerText}>fundoo Notes</Text>
                    </View>

                    <View style={signupStyles.inputSection}>
                        <NativeBaseProvider>
                            {/* <FormControl isRequired> */}
                                <Input
                                    width={'100%'} placeholder="First Name" my={2}
                                    _light={{placeholderTextColor: 'blueGray.400'}}
                                    _dark={{placeholderTextColor: 'blueGray.50'}}
                                    _focus={{borderColor:'#eab308'}}
                                    isInvalid={!this.state.errorFname ? false : true}
                                    onChangeText={value => this.processFirstName(value)}
                                />
                                <View style={signupStyles.errorField}>
                                    {!this.state.errorFname ? false : <Text style={signupStyles.errorText}>Invalid First Name</Text>}
                                </View>

                                <Input
                                    width={'100%'} placeholder="Last Name" my={2}
                                    _light={{placeholderTextColor: 'blueGray.400'}}
                                    _dark={{placeholderTextColor: 'blueGray.50'}}
                                    _focus={{borderColor:'#eab308'}}
                                    isInvalid={!this.state.errorLname ? false : true}
                                    onChangeText={value => this.processLastName(value)}
                                />
                                <View style={signupStyles.errorField}>
                                    {!this.state.errorLname ? false : <Text style={signupStyles.errorText}>Invalid Last Name</Text>}
                                </View>

                                <Input width={'100%'} placeholder="Email Id" my={2}
                                    keyboardType="email-address"
                                    _light={{placeholderTextColor: 'blueGray.400'}}
                                    _dark={{placeholderTextColor: 'blueGray.50'}}
                                    _focus={{borderColor:'#eab308'}}
                                    isInvalid={!this.state.errorEmail ? false : true}
                                    onChangeText={value => this.processEmail(value)}
                                />
                                <View style={signupStyles.errorField}>
                                    {!this.state.errorEmail ? false : <Text style={signupStyles.errorText}>Invalid Email</Text>}
                                </View>

                                <Input
                                    width={'100%'} placeholder="Password" my={2} type="password"
                                    _light={{placeholderTextColor: 'blueGray.400'}}
                                    _dark={{placeholderTextColor: 'blueGray.50'}}
                                    _focus={{borderColor:'#eab308'}}
                                    isInvalid={!this.state.errorPassword ? false : true}
                                    onChangeText={value => this.processPassword(value)}
                                />
                                <View style={signupStyles.errorField}>
                                    {!this.state.errorPassword ? false : <Text style={signupStyles.errorText}>Invalid Password</Text>}
                                </View>

                                <Input
                                    width={'100%'} placeholder="Confirm Password" my={2} type="password"
                                    _light={{placeholderTextColor: 'blueGray.400'}}
                                    _dark={{placeholderTextColor: 'blueGray.50'}}
                                    _focus={{borderColor:'#eab308'}}
                                    _invalid={{borderColor:'#16a34a'}}
                                    isInvalid={this.state.isPasswordConformed ? true : false}
                                    onChangeText={value => this.confirmPassword(value)}
                                />
                            {/* </FormControl> */}

                            <Button style={signupStyles.button} my={5} _text={{color: 'white'}} onPress={() => this.onSubmit()}>
                                SignUp
                            </Button>
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:15, }}>Don't have an account?</Text>
                                <Link _text={{fontSize: 'sm', fontWeight: '700', color: '#eab308'}} alignSelf="flex-end " my={2} onPress={() => this.props.navigation.navigate('Login')}> Login</Link>
                            </View>
                        </NativeBaseProvider>
                    </View>
                </View>
        </ScrollView>
        )
    }
}

export default SignUp;