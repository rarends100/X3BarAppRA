"use strict";


import Button from '@/components/Button/button';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

//Auth REDUX logout
import { logout } from '@/utilities/AuthSlice';
import { useDispatch } from 'react-redux';

const AdminHomeScreen = () => {
    const navigation: any = useNavigation();

    const dispatch = useDispatch();

    return (
        <View>
            <Text>
                This is the admin home page
                TODO: Add details to home page to reflect user stories
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
                text='Logout'
                onPress={() => {
                    console.log('Logout button pressed');
                    dispatch(logout());
                }}
            />
        </View>
        </View>
    );
}

    export default AdminHomeScreen;