import { useEffect, useState } from 'react';
import { Button, View } from 'react-native';

import { getAllUsers } from '@/database/UserDB';
import { adminViewAllUsersPageStyle } from '@/styles';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import UserSegments from '@/components/user-segments';
import { iUser } from '@/Interfaces/iUserInterface';
const allUsersScreen = () => {

    const [userObjArr, setUserObjArr] = useState();

    useEffect(() => {
        loadUserToArray(db, setUserObjArr); //callback fn p2 alternate
    }, []);

    const db = useSQLiteContext();
    return (
        //loading all users
        <SafeAreaView style={adminViewAllUsersPageStyle.container}>
            <View>
                <Button
                    title="Reload List"
                    onPress={() => {
                        loadUserToArray(db, setUserObjArr); //callback fn p2
                    }}
                    color={"blue"}

                />
            </View>
            <FlatList
                data = {userObjArr}
                keyExtractor = {(item: any) => item.UserName}
                
                renderItem={({item}: {item: iUser}) => ( //dstructuring the item in iUser so the code doesn't think that var item represents ALL of the metadata object provided by the Flatlist, so that I can isolate my user data from it
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

    if (usersJSON !== null) {
        for (let i = 0; i < usersJSON.length; i++) {
            tempArr.push(usersJSON[i]);
        }
        const userJSONArr = [...tempArr];
        //callback fn p1
        func(userJSONArr);
    }
}

function insertEndSpaces(num: number = 0, str: string = "", targetNum: number = 0): string {
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
}