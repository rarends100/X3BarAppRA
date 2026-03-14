"use strict"

import { useState } from 'react';
import { Animated, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button/button';
import Validation from '../../../Validation';

//External import 
import { Dropdown } from 'react-native-element-dropdown'; // -> https://www.npmjs.com/package/react-native-element-dropdown
//External import dependency
    import AntDesign from '@expo/vector-icons/AntDesign';

//Encryption

//business imports
import User from './../../../business/User';

//Database Imports
import {
    useSQLiteContext
} from 'expo-sqlite';

//navigation imports
import { useNavigation } from "expo-router";

//import db functions
import { addUserSync } from '@/Database/UserDB';



const data = [ //Note: I can make this better by compiling it with objects using a for loop and the database role values, though I may or may not depending on time constraints
    { label: 'Admin', value: '1' },
    { label: 'Trainee', value: '2' },
  ];
const dataArr = ['null', 'Admin', 'Trainee'];
  
//Error Messages
const blankField = (fieldName: String) => {
   return `The ${fieldName} must not be blank.`;
} 
const notEmail = blankField('email') + '\nThe value entered must be a valid email.'
const badPassword = blankField('password') + '\nThe password must start with an uppercase letter.\nThe password must have a special character.\nThe pasword must not be less than 8 characters in length.'
const passwordsNotMatch = 'The password and confirm password boxes must match.'

//let registerButtonPressed = false; //Controls all error messages, if true errors will show.

const RegistrationScreen = () => {
    const [usernameText, onChangeUsernameText] = useState('');
    const [firstnameText, onChangeFirstnameText] = useState('');
    const [lastnameText, onChangeLastnameText] = useState('');
    const [passwordText, onChangePasswordText] = useState('');
    const [confPasswordText, onChangeConfPasswordText] = useState('');
    const [emailText, onChangeEmailText] = useState('');

    const [registerButtonPressed, setRegisterButtonPressed] = useState(false);
    //const [fieldsCorrect, setFieldsCorrect] = useState(false);

    const [role, setRole] = useState("");
    const [value, setValue] = useState(null);

    const navigation: any = useNavigation();
    const db = useSQLiteContext();

    console.log("registration submission button value -> " + registerButtonPressed);
    console.log("before dropdown selected again value is " + role);
    
    return(
        <SafeAreaView style={styles.SafeMainView}>
            <KeyboardAvoidingView  behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <Text style={styles.banner}
                    >X3 Registration</Text>
                    <View style={styles.topView}>
                        <Text>Username</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={onChangeUsernameText}
                            value={usernameText}
                            placeholder='Username'
                        />
                        <Text style={styles.errors}
                        >{registerButtonPressed? Validation.isBlank(usernameText)? blankField('username') : '' : '' }</Text>
                        <Text>first Name</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={onChangeFirstnameText}
                            value={firstnameText}
                            placeholder='first name'
                        />
                        <Text style={styles.errors}
                        >{registerButtonPressed? Validation.isBlank(firstnameText)? blankField('firstname') : '' : '' }</Text>
                        <Text>Last Name</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={onChangeLastnameText}
                            value={lastnameText}
                            placeholder='last name'
                        />
                        <Text style={styles.errors}
                        >{registerButtonPressed? Validation.isBlank(lastnameText)? blankField('lastname') : '' : '' }</Text>
                        <Text>Email</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={onChangeEmailText}
                            value={emailText}
                            placeholder='email'
                        />
                        <Text style={styles.errors}
                        >{registerButtonPressed? Validation.isEmail(emailText)? '' : notEmail : '' }</Text>
                        <Text>Password</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={onChangePasswordText}
                            value={passwordText}
                            placeholder='password'
                        />
                        <Text style={styles.errors}
                        >{registerButtonPressed? Validation.passwordRulesFollowed(passwordText)? '' : badPassword : ''}</Text>
                        <Text>Confirm Password</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={onChangeConfPasswordText}
                            value={confPasswordText}
                            placeholder='confirm password'
                        />
                        <Text>{registerButtonPressed? Validation.passwordsMatch(passwordText, confPasswordText)? '' : passwordsNotMatch : ''}  </Text>
                        <Text style={styles.errors}
                        >{registerButtonPressed? Validation.isBlank(role)? blankField('role')  : '' : ''}  </Text>
                    </View>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Role"
                        searchPlaceholder="Search..."
                        value={value}
                        onChange={item => {
                        setValue(item.value);
                        setRole(dataArr[item.value]);
                        console.log('at select dropdown delayed value is ' + role);
                        }}
                        renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color="gold" name="thunderbolt" size={30} />
                    )}
                    />
                    
                    <Button
                        style={styles.registerButton}
                        text='Register'
                        buttonColor='#eec972'
                        buttonTextColor='black'
                        onPress={() => {
                            setRegisterButtonPressed(true);
                            
                            let hashedPassword: string = ''; //https://github.com/ranisalt/node-argon2#usage

                            if(!Validation.isBlank(usernameText) && !Validation.isBlank(firstnameText) && !Validation.isBlank(lastnameText) 
                                                &&   Validation.isEmail(emailText) && Validation.passwordRulesFollowed(passwordText)
                                                &&   Validation.passwordsMatch(passwordText, confPasswordText) &&
                                            (role == 'Admin' || role == 'Trainee')  ){
                                
                                // Part where the User is registered
                                let user = new User();

                                user.setUsername(usernameText.trim());
                                user.setFirstname(firstnameText.trim());
                                user.setLastname(lastnameText.trim());
                                user.setEmail(emailText.trim());
                                user.setPassword(passwordText.trim());
                                user.setRole(role);

                                if(addUserSync(db, user)){
                                    try{
                                        setRegisterButtonPressed(false);
                                        navigation.navigate('Start');
                                    }catch(ex){
                                        console.log('navigation issue at .addUserSync() attempt conditional statement');
                                    }
                            
                                }else{
                                    console.log("user not inserted -> No user added")
                                }
                                    
                            }else{
                                console.log("user not inserted -> data not valid at registration");
                            } 
                            
                        
                            

                            //TODO: If user registered and inserted into DB, then 
                            //output an Alert to user stating registration is successful
                            //then log them back to the login page -> Defined in database_functions.tsx
                        
                        }}
                    />
                </Animated.ScrollView>
            </KeyboardAvoidingView>

        
    </SafeAreaView>
    )
    //https://3x.ant.design/components/icon/ -> icons RA
}

export default RegistrationScreen;

const styles = StyleSheet.create({
    //Dropdown styling
    dropdown: {
      marginRight: 82,
      marginLeft: 50,
      height: 50,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      backgroundColor: 'orange'
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    //View styling
    topView: {
        fontSize: 12,
        marginLeft: 50,
        marginTop: 10
        
    },
    SafeMainView: {
        flex: 1,
        backgroundColor: '#f5bd6a'
    },
    //TextInput styling
    inputs: {
        borderColor: 'black',
        borderWidth: 0.75,
        fontSize: 12,
        width: 300,
        color: 'black',
        backgroundColor: 'white'

    },
    registerButton: { 
       marginLeft: 150,
       marginTop: 30,
       marginRight: 0
    },
    //Banner Styling
    banner: {
        color: 'black',
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 2,
        paddingVertical: 50,
        paddingHorizontal: 100,
        marginLeft: 2,
        marginRight: 2,
        fontWeight: 'condensedBold',
        fontSize: 25
    },
    //General Text Styling
    errors: {
        color: 'red',
        fontWeight: 'bold'
    },
    Text: {
        color: 'black',
        fontSize: 16,
    } 

  });