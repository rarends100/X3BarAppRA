"use strict";

import { isAdminContext, isLoggedInContext } from '@/RA_user-Auth-context';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { Text, View } from 'react-native';


const AdminHomeScreen = () => {
    const navigation : any = useNavigation();
    const isAdminContextObj = useContext(isAdminContext);
    const isLoggedInContextObj = useContext(isLoggedInContext);

    console.log("AdminHomeScreen -> " + isAdminContextObj.isAdmin );
    const test = true;
    if (isAdminContextObj.isAdmin && isLoggedInContextObj.isLoggedIn){
        return(
        <   View>
                <Text>
                    This is the admin home page
                    TODO: Add details to home page to reflect user stories
                </Text>
            </View>
        );
    }else{
       //navigation.navigate('Start'); causes a recursion issue used this way 
       //   before a return statement, interesting
       return (
        <View>
            <Text>
                Administrators only!!!
            </Text>
        </View>
       )
    }

}

export default AdminHomeScreen;