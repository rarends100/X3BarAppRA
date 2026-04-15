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

const AdminHomeScreen = () => {
    const navigation: any = useNavigation();

    const db = useSQLiteContext();
    
    return (
        <SafeAreaView>
            <View>
                <Text>
                    Admin Home
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
                    <Button
                        text='Delete Database'
                        onPress={() => {
                            console.log('Delete Database Button Pressed');
                            deleteDatabase(db);
                        }}
                    />
                    <Logout />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AdminHomeScreen;

//test git