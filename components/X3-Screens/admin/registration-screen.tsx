"use strict"

/**
 * Ok, yeah I made this component overly complicated, it works, but I should have broken up some of the logic
 * better, what is done is done, I just won't repeat the same mistake in others. If I get time I will
 * come back and manually separate the 3 concerns this component is covering. Sure in React Native this 
 * pattern is fine, but I don't like things being all crammed together, it makes it harder to understand 
 * in my opinion.
 */

import { useState } from 'react';
import { Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button/button';
import Validation from '../../../Validation';

//External import 
import { Dropdown } from 'react-native-element-dropdown'; // -> https://www.npmjs.com/package/react-native-element-dropdown
//External import dependency
import AntDesign from '@expo/vector-icons/AntDesign';

//Encryption

//business imports
import User from '@/business/User';

//Database Imports
import {
    useSQLiteContext
} from 'expo-sqlite';

//navigation imports
import { useNavigation } from "expo-router";

//import db functions
import { insertUserSync } from '@/database/UserDB';

import { Role } from '@/utilities/Role';

import { registerPageStyle } from '@/styles';

const data = [ //Note: I can make this better by compiling it with objects using a for loop and the database role values, though I may or may not depending on time constraints
    { label: `${Role.ADMIN}`, value: '1' },
    { label: `${Role.TRAINEE}`, value: '2' }, //this is the actual label you see in the selector and it passes a value, 1 or 2 depending on role selected
    //enum Role ensures no one can get too confused if they ever look at my code, including me
];
const dataArr = ['null', Role.ADMIN, Role.TRAINEE];

//Error Messages
const blankField = (fieldName: String) => {
    return `The ${fieldName} must not be blank.`;
}
const notEmail = blankField('email') + '\nThe value entered must be a valid email.'
const badPassword = blankField('password') + '\nThe password must start with an uppercase letter.\nThe password must have a special character.\nThe pasword must not be less than 8 characters in length.'
const passwordsNotMatch = 'The password and confirm password boxes must match.'

//let registerButtonPressed = false; //Controls all error messages, if true errors will show.

const RegistrationScreen = () => {
    const [usernameText, setUsernameText] = useState('');
    const [firstnameText, setFirstnameText] = useState('');
    const [lastnameText, setLastnameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [confPasswordText, setConfPasswordText] = useState('');
    const [emailText, setEmailText] = useState('');

    const [registerButtonPressed, setRegisterButtonPressed] = useState(false);
    //const [fieldsCorrect, setFieldsCorrect] = useState(false);

    const [role, setRole] = useState("");
    const [value, setValue] = useState(null);

    const navigation: any = useNavigation();
    const db = useSQLiteContext();

    console.log("registration submission button value -> " + registerButtonPressed);
    console.log("before dropdown selected again value is " + role);

    return (
        <SafeAreaView style={registerPageStyle.SafeMainView}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <Text style={registerPageStyle.banner}
                    >X3 Registration</Text>
                    <View style={registerPageStyle.topView}>
                        <Text>Username</Text>
                        <TextInput style={registerPageStyle.inputs}
                            onChangeText={setUsernameText}
                            value={usernameText}
                            placeholder='Username'
                        />
                        <Text style={registerPageStyle.errors}
                        >{registerButtonPressed ? Validation.isBlank(usernameText) ? blankField('username') : '' : ''}</Text>
                        <Text>first Name</Text>
                        <TextInput style={registerPageStyle.inputs}
                            onChangeText={setFirstnameText}
                            value={firstnameText}
                            placeholder='first name'
                        />
                        <Text style={registerPageStyle.errors}
                        >{registerButtonPressed ? Validation.isBlank(firstnameText) ? blankField('firstname') : '' : ''}</Text>
                        <Text>Last Name</Text>
                        <TextInput style={registerPageStyle.inputs}
                            onChangeText={setLastnameText}
                            value={lastnameText}
                            placeholder='last name'
                        />
                        <Text style={registerPageStyle.errors}
                        >{registerButtonPressed ? Validation.isBlank(lastnameText) ? blankField('lastname') : '' : ''}</Text>
                        <Text>Email</Text>
                        <TextInput style={registerPageStyle.inputs}
                            onChangeText={setEmailText}
                            value={emailText}
                            placeholder='email'
                        />
                        <Text style={registerPageStyle.errors}
                        >{registerButtonPressed ? Validation.isEmail(emailText) ? '' : notEmail : ''}</Text>
                        <Text>Password</Text>
                        <TextInput style={registerPageStyle.inputs}
                            onChangeText={setPasswordText}
                            value={passwordText}
                            placeholder='password'
                        />
                        <Text style={registerPageStyle.errors}
                        >{registerButtonPressed ? Validation.passwordRulesFollowed(passwordText) ? '' : badPassword : ''}</Text>
                        <Text>Confirm Password</Text>
                        <TextInput style={registerPageStyle.inputs}
                            onChangeText={setConfPasswordText}
                            value={confPasswordText}
                            placeholder='confirm password'
                        />
                        <Text style={registerPageStyle.errors} >{registerButtonPressed ? Validation.passwordsMatch(passwordText, confPasswordText) ? '' : passwordsNotMatch : ''}  </Text>
                        <Text style={registerPageStyle.errors}
                        >{registerButtonPressed ? Validation.isBlank(role) ? blankField('role') : '' : ''}  </Text>
                    </View>
                    <Dropdown
                        style={registerPageStyle.dropdown}
                        placeholderStyle={registerPageStyle.placeholderStyle}
                        selectedTextStyle={registerPageStyle.selectedTextStyle}
                        inputSearchStyle={registerPageStyle.inputSearchStyle}
                        iconStyle={registerPageStyle.iconStyle}
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
                            <AntDesign style={registerPageStyle.icon} color="gold" name="thunderbolt" size={30} />
                        )}
                    />

                    <Button
                        style={registerPageStyle.registerButton}
                        text='Register'
                        buttonColor='#eec972'
                        buttonTextColor='black'
                        onPress={() => {
                            setRegisterButtonPressed(true);

                            let hashedPassword: string = ''; //https://github.com/ranisalt/node-argon2#usage

                            if (!Validation.isBlank(usernameText) && !Validation.isBlank(firstnameText) && !Validation.isBlank(lastnameText)
                                && Validation.isEmail(emailText) && Validation.passwordRulesFollowed(passwordText)
                                && Validation.passwordsMatch(passwordText, confPasswordText) &&
                                (role == `${Role.ADMIN}` || role == `${Role.TRAINEE}`)) {

                                // Part where the User is registered
                                let user = new User();

                                user.setUsername(usernameText.trim());
                                user.setFirstname(firstnameText.trim());
                                user.setLastname(lastnameText.trim());
                                user.setEmail(emailText.trim());
                                user.setPassword(passwordText.trim());
                                user.setRole(role);

                                console.log(role);

                                if (insertUserSync(db, user)) {
                                
                                    setRegisterButtonPressed(false);
                                   
                                    setUsernameText("");
                                    setPasswordText("");
                                    setConfPasswordText("");
                                    setEmailText("");
                                    setFirstnameText("");
                                    setLastnameText("");
                                 
                                } else {
                                    console.log("registration screen -> user not inserted -> No user added");
                                }
                                console.log("registration screen -> Validation successful.");
                            } else {
                                console.log("registration screen -> user not inserted -> data not valid at registration");
                            }


                        }}
                    />
                </Animated.ScrollView>
            </KeyboardAvoidingView>


        </SafeAreaView>
    )
    //https://3x.ant.design/components/icon/ -> icons RA
}

export default RegistrationScreen;