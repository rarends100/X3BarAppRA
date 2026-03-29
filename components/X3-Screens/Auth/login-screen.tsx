import { useContext, useState } from 'react';
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

import { login } from '@/utilities/LoginHelper';

import { isAdminContext, isLoggedInContext, isTraineeContext } from '@/context/RA_user-Auth-context';
import { globalStyles } from '@/styles';
import { Role } from '@/utilities/Role';
import { useSQLiteContext } from 'expo-sqlite';

const LoginScreen = (props: any) => {
    const navigation: any = useNavigation();

    const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
    const { setIsAdmin } = useContext(isAdminContext);
    const { setIsTrainee } = useContext(isTraineeContext);

    const db = useSQLiteContext();

    const [username, OnChangeUsernameText] = useState<string>("");
    const [password, onChangePasswordText] = useState<string>("");
    const [loginButtonPressed, setLoginButtonPressed] = useState<boolean>(false);

    const handleLoginPress = async () => {
        try {
            let user = null; 
            user = await login(username.trim(), password.trim(), db);

            if (user !== null) {
                setLoginButtonPressed(false);
                //navigation.navigate("AdminHome");
                const role = user.getRole();
                switch (role) {
                    case `${Role.ADMIN}`:
                        setIsAdmin(true);
                        setIsLoggedIn(true);
                        navigation.navigate("AdminHome");
                        break;
                    case `${Role.TRAINEE}`:
                        setIsTrainee(true);
                        setIsLoggedIn(true);
                      
                        break;
                }
                
            }
        } catch (ex) {
            console.error(ex);
        }
        setLoginButtonPressed(true);
    }

    AntDesign //remove this when ready

    //################################################View##########################################################################

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