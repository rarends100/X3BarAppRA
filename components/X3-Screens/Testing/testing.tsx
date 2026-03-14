import { useState } from 'react';
import { Button, Text, View } from 'react-native';

import User from '@/business/User';
import { getAllUsers } from '@/Database/UserDB';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';


const Testing = () => {

    const [userObjArr, setUserObjArr] = useState<User[]>([]);

    //useEffect(() => {
       //loadUserToArray(db, userObjArr); //2
    //});
    const db = useSQLiteContext();
    return(
        <View>
            <ScrollView>
                <Text>{userObjArr.map((elem) => (
                    "\n" + elem.getUsername()
                ))}</Text>
            </ScrollView>
            <Button
                title="load all users"
                onPress={() => {
                        loadUserToArray(db, setUserObjArr); //callback fn p2
                        
                 
                }}
            />
        </View>
    )
}

export default Testing;

async function  loadUserToArray(db: SQLiteDatabase, func: any){ //1 //callback fn p1
    const users = await getAllUsers(db);
    
    let userObjArr = [];
     for(let i = 0; i < users.length; i++){
        const user = new User();

        user.setUserID(users[i].UserID);
        user.setUsername(users[i].Username);
        user.setEmail(users[i].Email);
        user.setRole(users[i].role);

        userObjArr.push(user);
     }
    //callback fn p1
     func(userObjArr); 
    }