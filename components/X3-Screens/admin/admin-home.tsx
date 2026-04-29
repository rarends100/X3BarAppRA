"use strict";


import Button from '@/components/Button/button';

import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Auth REDUX logout -> component I made from it to make things more modular and easier to manage
import Logout from '@/components/logout';
import { deleteDatabase } from '@/database/DeleteDB';

//db
import { useSQLiteContext } from 'expo-sqlite';

import { adminHomeStyle } from '@/styles';

const AdminHomeScreen = () => {
    const navigation: any = useNavigation();

    const db = useSQLiteContext();

    return (
        <SafeAreaView style={adminHomeStyle.container}>
            <View>
                <Text style={adminHomeStyle.banner}>
                    Admin Home
                </Text>
                <View>
                    <View style={adminHomeStyle.buttonSpacing}>
                        <Button
                            text='Register New User'
                            onPress={() => {
                                console.log('Registration button pressed');
                                navigation.navigate('Register');
                            }}
                            buttonSideSize={20}
                        />
                    </View>
                    <View  style={adminHomeStyle.buttonSpacing}>
                        <Button
                            text='All Users'
                            onPress={() => {
                                console.log('All users button pressed');
                                navigation.navigate('Users');
                            }}
                            buttonSideSize={75}
                        />
                    </View>
                    <View  style={adminHomeStyle.buttonSpacing}>
                        <Button
                            text='Delete Database'
                            onPress={() => {
                                console.log('Delete Database Button Pressed');
                                deleteDatabase(db);
                            }}
                            buttonSideSize={31}
                        />
                    </View>
                    <View  style={adminHomeStyle.buttonSpacing}>
                        <Logout />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AdminHomeScreen;

//test git