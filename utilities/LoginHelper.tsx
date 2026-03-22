import User from '@/business/User';
import { getUser } from '@/database/UserDB';
import Auth from '@/utilities/Auth';
import { SQLiteDatabase } from 'expo-sqlite';
import { Alert } from 'react-native';

export const login = async (username: string, password: string, db: SQLiteDatabase) => {
    //get the user values
    const retrievedUserRecord = await getUser(db, username);
    const user = new User();
    if (retrievedUserRecord !== null) {
        const userID = retrievedUserRecord.UserID;
        const username = retrievedUserRecord.Username;
        const role = retrievedUserRecord.Role;
        const credential = retrievedUserRecord.Credential;
        const firstname = retrievedUserRecord.FirstName;
        const middlename = retrievedUserRecord.MiddleName;
        const lastname = retrievedUserRecord.LastName;
        const email = retrievedUserRecord.Email;
        const employeeID = retrievedUserRecord.EmployeeID;

        if (retrievedUserRecord !== null) {

            user.setUserID(userID);
            user.setUsername(username);
            user.setRole(role);
            user.setPassword(password);
            user.setHashedPassword(credential);
            user.setEmail(email);
            user.setFirstname(firstname);
            user.setMiddlename(middlename);
            user.setLastname(lastname);

            console.log(username +
                ".login() Has been retrieved from the database and set on the user in .login()");

            if (Auth.checkIfPasswordMatch(password, credential)) {

            } else {
                Alert.alert("Message", "wrong password");

            }
        }
    } else {
        Alert.alert("Login Attempt Failed", "Username is incorrect or user does not exist.");
        console.log("Username is incorrect or user does not exist.");

    }
    return user;
}