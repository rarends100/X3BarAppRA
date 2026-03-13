import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
            <Text>first Name</Text>
            <TextInput
                onChangeText={onChangeFirstnameText}
                value={firstnameText}
                placeholder='first name'
            />
            <Text>Last Name</Text>
            <TextInput
                onChangeText={onChangeLastnameText}
                value={lastnameText}
                placeholder='last name'
            />
            <Text>Email</Text>
            <TextInput
                onChangeText={onChangeEmailText}
                value={emailText}
                placeholder='email'
            />
            <Text>Password</Text>
            <TextInput
                onChangeText={onChangePasswordText}
                value={passwordText}
                placeholder='password'
            />
            <Text>Confirm Password</Text>
            <TextInput
                onChangeText={onChangeConfPasswordText}
                value={confPasswordText}
                placeholder='confirm password'
            />
        </View>
    </SafeAreaView>
    )
    
}


export default RegistrationScreen;