import { useCallback, useState } from 'react';
import { Button, View } from 'react-native';

import { getAllUsers } from '@/database/UserDB';
import { adminViewAllUsersPageStyle } from '@/styles';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserSegments from '@/components/user-segments';
import { iUser } from '@/Interfaces/iUserInterface';
import { useFocusEffect } from 'expo-router';
const allUsersScreen = () => {

    const [userObjArr, setUserObjArr] = useState();

    useFocusEffect(
        useCallback( () => {
            console.log('loading all users...');
            loadUserToArray(db, setUserObjArr); //callback fn p2 alternate
        }, []))


    const db = useSQLiteContext();
    return (
        //loading all users
        <SafeAreaView style={adminViewAllUsersPageStyle.container}>
            <View style={adminViewAllUsersPageStyle.reloadButton}>
                <Button
                    title="Reload List"
                    onPress={() => {
                        loadUserToArray(db, setUserObjArr); //callback fn p2
                    }}
                    color={"blue"}

                />
            </View>
            <FlatList
                data={userObjArr}
                keyExtractor={(item: any) => item.UserName}

                renderItem={({ item }: { item: iUser }) => ( //dstructuring the item in iUser so the code doesn't think that var item represents ALL of the metadata object provided by the Flatlist, so that I can isolate my user data from it
                    <UserSegments
                        UserName={item.UserName}
                        UserID={item.UserID}
                        Role={item.Role}
                        onPress={() => {
                            loadUserToArray(db, setUserObjArr);

                        }}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default allUsersScreen;

async function loadUserToArray(db: SQLiteDatabase, func: any) { //1 //callback fn p1
    const usersJSON = await getAllUsers(db);

    let tempArr = [];

    if (usersJSON !== null) { //push JSON objects to a array one by one
        for (let i = 0; i < usersJSON.length; i++) {
            tempArr.push(usersJSON[i]);
        }
        const userJSONArr = [...tempArr]; //use spread to copy tempArr to userJSONArr
        //callback fn p1
        func(userJSONArr); //pass array of JSON objects to function
    }
}

/*function insertEndSpaces(num: number = 0, str: string = "", targetNum: number = 0): string {
    if (targetNum === 0) {
        targetNum = num;
        targetNum = targetNum - (targetNum - str.length);
    }
    if (num >= targetNum) {
        num -= 1;
        return " " + insertEndSpaces(num, "", targetNum);
    } else {
        return "";
    }
} NOTE: I wish I did not even take the time to write this fn... oh well, at least it was some good practice with recursion logic*/