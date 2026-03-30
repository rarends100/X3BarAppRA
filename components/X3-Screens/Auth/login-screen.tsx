import { useState } from 'react';
import { Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Custom components
import Button from '@/components/Button/button';

//cool icons
import AntDesign from '@expo/vector-icons';

//navigation imports
import { useNavigation } from "expo-router";

//custom validation
import Validation from '@/Validation';

//Auth
import { login } from '@/utilities/LoginHelper';
import { useDispatch } from 'react-redux';

//import { isAdminContext, isLoggedInContext, isTraineeContext } from '@/context/RA_user-Auth-context';
import { globalStyles } from '@/styles';
import { loginSuccess } from '@/utilities/AuthSlice';
import { useSQLiteContext } from 'expo-sqlite';

const LoginScreen = (props: any) => {
    const navigation: any = useNavigation();

    const db = useSQLiteContext();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginButtonPressed, setLoginButtonPressed] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    //Auth
    const dispatch = useDispatch();


    const handleLoginPress = async () => {
        try {
            let user = null; 
            user = await login(username.trim(), password.trim(), db);

            if (user !== null) {
                setLoginButtonPressed(false);
                const userID = user.getUserID();
                const role = user.getRole();
                const username = user.getUsername();

                dispatch(loginSuccess({ userID: userID, role : role, username: username }))
                setShowError(false);
            }
        } catch (ex) {
            console.error(ex);
            setError("Login failed");
            setShowError(true);
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
                                onChangeText={setUsername}
                                value={username}
                                placeholder='username'
                            />
                            <Text>Password</Text>
                            <TextInput
                                onChangeText={setPassword}
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
                        <View>
                           <Text>{showError ? error : ""}</Text>
                        </View>
                    </Animated.ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen;