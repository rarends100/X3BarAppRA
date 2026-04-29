import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import User from '@/business/User';
import { getAllUsers } from '@/database/UserDB';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';


const allUsersScreen = () => {

    const [userObjArr, setUserObjArr] = useState(Array<User>);

    useEffect(() => {
        loadUserToArray(db, setUserObjArr); //callback fn p2 alternate
    }, []);

    const db = useSQLiteContext();
    return (
        //loading all users
        <ScrollView>
            <View>
                <View>
                    <Button
                    title="Reload List"
                    onPress={() => {
                        loadUserToArray(db, setUserObjArr); //callback fn p2
                    }}
                    color={"blue"}
                    
                />
                </View>
                <View>
                    <Text>{userObjArr.map((elem) => (
                        "\n" + "Username: " + elem.getUsername()
                       + insertEndSpaces(30, elem.getUsername()) + "Role: " + elem.getRole()
                    ))}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default allUsersScreen;

async function loadUserToArray(db: SQLiteDatabase, func: any) { //1 //callback fn p1
    const usersJSON = await getAllUsers(db);

    let tempArr = [];

    if (usersJSON !== null) {
        for (let i = 0; i < usersJSON.length; i++) {
            const user = new User();

            user.setUserID(usersJSON[i].UserID);
            user.setUsername(usersJSON[i].UserName);
            user.setEmail(usersJSON[i].Email);
            user.setRole(usersJSON[i].Role);

            tempArr.push(user);
        }
        const userObjArr = [...tempArr];
        //callback fn p1
        func(userObjArr);
    }
}

function insertEndSpaces(num: number = 0, str: string = "", targetNum: number = 0): string{
    if(targetNum === 0){
        targetNum = num;
        targetNum = targetNum - (targetNum - str.length);
    }
    if(num >= targetNum){
        num -= 1;
        return " " + insertEndSpaces(num, "", targetNum);
    }else{
        return "";
    }
}