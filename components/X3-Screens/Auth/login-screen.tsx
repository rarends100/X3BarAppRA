import { useState } from 'react';
import { Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Custom components
import Button from '@/components/Button/button';

//icons
import AntDesign from '@expo/vector-icons';

//navigation imports
import { useNavigation } from "expo-router";

//custom validation
import Validation from '@/Validation';

import { useLogin } from '@/hooks/use-login';

import { globalStyles } from '@/styles';
 
const LoginScreen = (props: any) => {
    const navigation: ReactNavigation.RootParamList = useNavigation();

    const [username, OnChangeUsernameText] = useState<string>("");
    const [password, onChangePasswordText] = useState<string>("");
    const [loginButtonPressed, setLoginButtonPressed] = useState<boolean>(false);

    const doLogin = useLogin();

    const handleLoginPress = async () => {
        try {
            OnChangeUsernameText(username.trim());
            onChangePasswordText(password.trim());
            
            const success = await doLogin(username, password);
            if (success) {
                //navigate or whatever
                setLoginButtonPressed(false);
            }
        } catch (ex) {
            console.error(ex);
        }
        setLoginButtonPressed(true);
    }

    AntDesign //remove this when ready

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <View>
                    <Animated.ScrollView>
                        <View>
                            <Text style={globalStyles.errors}
                            >{loginButtonPressed ? Validation.isBlank(username) ? Validation.blankField('username') : '' : ''}</Text>
                            <Text>Username</Text>
                            <TextInput
                                onChangeText={OnChangeUsernameText}
                                value={username}
                                placeholder='username'
                            />
                            <Text>Password</Text>
                            <TextInput
                                onChangeText={onChangePasswordText}
                                value={password}
                                placeholder='password'
                            />
                        </View>

                        <View>
                            <Button
                                text="Login"
                                onPress={handleLoginPress}
                            />
                        </View>
                    </Animated.ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen;