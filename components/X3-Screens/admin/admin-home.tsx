"use strict";


import Button from '@/components/Button/button';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

//Auth REDUX logout
import Logout from '@/components/logout';
import { useDispatch } from 'react-redux';

const AdminHomeScreen = () => {
    const navigation: any = useNavigation();

    const dispatch = useDispatch();

    return (
        <View>
            <Text>
                This is the admin home page
            </Text>
        <View>
            <Button
                text='Register New User'
                onPress={() => {
                    console.log('Registration button pressed');
                    navigation.navigate('Register');
                }}
            />
            <Button
                text='Testing'
                onPress={() => {
                    console.log('Registration button pressed');
                    navigation.navigate('Testing');
                }}
            />
            <Logout/>
        </View>
        </View>
    );
}

    export default AdminHomeScreen;

    //test git