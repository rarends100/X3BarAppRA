"use strict"

/**
 * Ok, yeah I made this component overly complicated, it works, but I should have broken up some of the logic
 * better, what is done is done, I just won't repeat the same mistake in others. If I get time I will
 * come back and manually separate the 3 concerns this component is covering. Sure in React Native this 
 * pattern is fine, but I don't like things being all crammed together, it makes it harder to understand 
 * in my opinion.
 */

import { useState } from 'react';
import { Alert, Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
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
import { insertUserSync } from '@/database/UserDB';

import { Role } from '@/utilities/Role';

import { registerPageStyles } from '@/styles';

const data = [ //Note: I can make this better by compiling it with objects using a for loop and the database role values, though I may or may not depending on time constraints
    { label: `${Role.ADMIN}`, value: '1' },
    { label: `${Role.TRAINEE}`, value: '2' }, //this is the actual label you see in the selector and it passes a value, 1 or 2 depending on role selected
    //enum Role ensures no one can get too confused if they ever look at my code, including me
];
const dataArr = ['null', `${Role.ADMIN}`, `${Role.TRAINEE}`];

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

    return (
        <SafeAreaView style={registerPageStyles.SafeMainView}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <Text style={registerPageStyles.banner}
                    >X3 Registration</Text>
                    <View style={registerPageStyles.topView}>
                        <Text>Username</Text>
                        <TextInput style={registerPageStyles.inputs}
                            onChangeText={onChangeUsernameText}
                            value={usernameText}
                            placeholder='Username'
                        />
                        <Text style={registerPageStyles.errors}
                        >{registerButtonPressed ? Validation.isBlank(usernameText) ? blankField('username') : '' : ''}</Text>
                        <Text>first Name</Text>
                        <TextInput style={registerPageStyles.inputs}
                            onChangeText={onChangeFirstnameText}
                            value={firstnameText}
                            placeholder='first name'
                        />
                        <Text style={registerPageStyles.errors}
                        >{registerButtonPressed ? Validation.isBlank(firstnameText) ? blankField('firstname') : '' : ''}</Text>
                        <Text>Last Name</Text>
                        <TextInput style={registerPageStyles.inputs}
                            onChangeText={onChangeLastnameText}
                            value={lastnameText}
                            placeholder='last name'
                        />
                        <Text style={registerPageStyles.errors}
                        >{registerButtonPressed ? Validation.isBlank(lastnameText) ? blankField('lastname') : '' : ''}</Text>
                        <Text>Email</Text>
                        <TextInput style={registerPageStyles.inputs}
                            onChangeText={onChangeEmailText}
                            value={emailText}
                            placeholder='email'
                        />
                        <Text style={registerPageStyles.errors}
                        >{registerButtonPressed ? Validation.isEmail(emailText) ? '' : notEmail : ''}</Text>
                        <Text>Password</Text>
                        <TextInput style={registerPageStyles.inputs}
                            onChangeText={onChangePasswordText}
                            value={passwordText}
                            placeholder='password'
                        />
                        <Text style={registerPageStyles.errors}
                        >{registerButtonPressed ? Validation.passwordRulesFollowed(passwordText) ? '' : badPassword : ''}</Text>
                        <Text>Confirm Password</Text>
                        <TextInput style={registerPageStyles.inputs}
                            onChangeText={onChangeConfPasswordText}
                            value={confPasswordText}
                            placeholder='confirm password'
                        />
                        <Text>{registerButtonPressed ? Validation.passwordsMatch(passwordText, confPasswordText) ? '' : passwordsNotMatch : ''}  </Text>
                        <Text style={registerPageStyles.errors}
                        >{registerButtonPressed ? Validation.isBlank(role) ? blankField('role') : '' : ''}  </Text>
                    </View>
                    <Dropdown
                        style={registerPageStyles.dropdown}
                        placeholderStyle={registerPageStyles.placeholderStyle}
                        selectedTextStyle={registerPageStyles.selectedTextStyle}
                        inputSearchStyle={registerPageStyles.inputSearchStyle}
                        iconStyle={registerPageStyles.iconStyle}
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
                            <AntDesign style={registerPageStyles.icon} color="gold" name="thunderbolt" size={30} />
                        )}
                    />

                    <Button
                        style={registerPageStyles.registerButton}
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

                                if (insertUserSync(db, user)) {
                                    try {
                                        setRegisterButtonPressed(false);
                                        Alert.alert("message", "Registration successful,\nUsername: " + user.getUsername() 
                                            + "\nPassword: " + user.getPassword()
                                        );
                                        navigation.navigate('Start');
                                    } catch (ex) {
                                        console.log('navigation issue at .addUserSync() attempt conditional statement');
                                    }

                                } else {
                                    console.log("user not inserted -> No user added")
                                }
                                console.log("registration screen -> ");
                            } else {
                                console.log("registration screen -> user not inserted -> data not valid at registration");
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