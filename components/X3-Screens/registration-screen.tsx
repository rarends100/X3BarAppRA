import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Validation from './../../Validation';

  
//Error Messages 
const blankField = (fieldName: String) => {
   return `The ${fieldName} must not be blank.`;
} 
const notEmail = blankField('email') + '\n The value entered must be a valid email.'
const badPassword = blankField('password') + '\nThe password must start with an uppercase letter.\nThe password must have a special character.\nThe pasword must not be less than 8 characters in length.'
const passwordsNotMatch = 'The password and confirm password boxes must match.'

let submissionButtonPressed = false;

const RegistrationScreen = () => {
    const [usernameText, onChangeUsernameText] = useState('');
    const [firstnameText, onChangeFirstnameText] = useState('');
    const [lastnameText, onChangeLastnameText] = useState('');
    const [passwordText, onChangePasswordText] = useState('');
    const [confPasswordText, onChangeConfPasswordText] = useState('');
    const [emailText, onChangeEmailText] = useState('');

  
    

    return(
        <SafeAreaView>
        <View>
            <Text>Username</Text>
            <TextInput
                onChangeText={onChangeUsernameText}
                value={usernameText}
                placeholder='Username'
            />
            <Text>{submissionButtonPressed? Validation.isBlank(usernameText)? blankField('username') : '' : '' }</Text>
            <Text>first Name</Text>
            <TextInput
                onChangeText={onChangeFirstnameText}
                value={firstnameText}
                placeholder='first name'
            />
            <Text>{submissionButtonPressed? Validation.isBlank(firstnameText)? blankField('firstname') : '' : '' }</Text>
            <Text>Last Name</Text>
            <TextInput
                onChangeText={onChangeLastnameText}
                value={lastnameText}
                placeholder='last name'
            />
            <Text>{submissionButtonPressed? Validation.isBlank(lastnameText)? blankField('lastname') : '' : '' }</Text>
            <Text>Email</Text>
            <TextInput
                onChangeText={onChangeEmailText}
                value={emailText}
                placeholder='email'
            />
            <Text>{submissionButtonPressed? Validation.isEmail(usernameText)? '' : notEmail : '' }</Text>
            <Text>Password</Text>
            <TextInput
                onChangeText={onChangePasswordText}
                value={passwordText}
                placeholder='password'
            />
            <Text>{Validation.passwordRuleCheck(passwordText)? '' : badPassword}</Text>
            <Text>Confirm Password</Text>
            <TextInput
                onChangeText={onChangeConfPasswordText}
                value={confPasswordText}
                placeholder='confirm password'
            />
            <Text>{Validation.passwordsMatch(passwordText, confPasswordText)? '' : passwordsNotMatch}  </Text>
        </View>
    </SafeAreaView>
    )
    
}


export default RegistrationScreen;