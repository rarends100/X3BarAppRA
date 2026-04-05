import { useState } from 'react';
import { Button, Text, View } from 'react-native';

import User from '@/business/User';
import { getAllUsers } from '@/database/UserDB';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';


const TestingScreen = () => {

    const [userObjArr, setUserObjArr] = useState<User[]>([]);

    //useEffect(() => {
    //loadUserToArray(db, userObjArr); //2
    //});
    const db = useSQLiteContext();
    return (
        //loading all users
        <ScrollView>
            <View>
                <ScrollView>
                    <Text>{userObjArr.map((elem) => (
                        "\n" + "Username: " + elem.getUsername()
                       +"\n" + "Role: "     + elem.getRole()
                       +"\n" + "Email "     + elem.getEmail()
                    ))}</Text>
                </ScrollView>
                <Button
                    title="load all users"
                    onPress={() => {
                        loadUserToArray(db, setUserObjArr); //callback fn p2


                    }}
                />
            </View>
        </ScrollView>
        //next test case
    )
}

export default TestingScreen;

async function loadUserToArray(db: SQLiteDatabase, func: any) { //1 //callback fn p1
    const usersJSON = await getAllUsers(db);

    let userObjArr = [];

    if (usersJSON !== null) {
        for (let i = 0; i < usersJSON.length; i++) {
            const user = new User();

            user.setUserID(usersJSON[i].UserID);
            user.setUsername(usersJSON[i].UserName);
            user.setEmail(usersJSON[i].Email);
            user.setRole(usersJSON[i].Role);

            userObjArr.push(user);
        }
        //callback fn p1
        func(userObjArr);
    }
}