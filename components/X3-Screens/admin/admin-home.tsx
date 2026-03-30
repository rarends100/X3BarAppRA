"use strict";


import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';


const AdminHomeScreen = () => {
    const navigation: any = useNavigation();

    return (
        <   View>
            <Text>
                This is the admin home page
                TODO: Add details to home page to reflect user stories
            </Text>
        </View>
    );
}

    export default AdminHomeScreen;