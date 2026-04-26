import User from '@/business/User';
import { getUser } from '@/database/UserDB';
import Auth from '@/utilities/Auth';
import { SQLiteDatabase } from 'expo-sqlite';
import { Alert } from 'react-native';

export const login = async (username: string, password: string, db: SQLiteDatabase) => {
    //get the user values
    const retrievedUserJSONRecord = await getUser(db, username);
    const user = new User();

    if (retrievedUserJSONRecord !== null) {
        const userID = retrievedUserJSONRecord.UserID;
        const username = retrievedUserJSONRecord.UserName;
        const role = retrievedUserJSONRecord.Role;
        const credential = retrievedUserJSONRecord.Credential;
        const firstname = retrievedUserJSONRecord.FirstName;
        const middlename = retrievedUserJSONRecord.MiddleName;
        const lastname = retrievedUserJSONRecord.LastName;
        const email = retrievedUserJSONRecord.Email;
        const employeeID = retrievedUserJSONRecord.EmployeeID;

        user.setUserID(userID);
        user.setUsername(username);
        user.setRole(role);
        user.setPassword(password);
        user.setHashedPassword(credential);
        user.setEmail(email);
        user.setFirstname(firstname);
        user.setMiddlename(middlename);
        user.setLastname(lastname);
        if (employeeID !== null) {
            user.setEmployeeID(employeeID);
        }


        console.log(username +
            ".login() Has been retrieved from the database and set on the user in .login()\nAuthenticating user...");

        if (Auth.checkIfPasswordMatch(password, credential)) {
            return user;
        } else {
            Alert.alert("Message", "wrong password");
            return null;
        }

    } else {
        Alert.alert("Login Attempt Failed", "Username is incorrect or user does not exist.");
        console.log("Username is incorrect or user does not exist.");

    }
}