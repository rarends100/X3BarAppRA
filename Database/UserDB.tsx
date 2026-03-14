
//database
import { SQLiteDatabase } from "expo-sqlite";

//encryption
//import bcrypt from "bcryptjs";
//import * as Crypto from 'expo-crypto';

//alerts
import { Alert } from 'react-native';

import Auth from './../Auth';
//business
import User from "@/business/User";

/**
 * This function adds a user to the database.
 * @param db 
 * @param user 
 * @returns {boolean} If user added to db returns true, else false
 */
export function addUserSync(db: SQLiteDatabase, user: User){
    let userAdded = false;


    if (user !== null){
        //if(checkUsernameNotExist(db, user.getUsername())){
            console.log('hit add user fn');
            Auth.generateHash(user);

            try{
                db.runSync(
                    `INSERT INTO User
                    (UserName, Email, Password, FirstName, LastName)
                    VALUES
                    (?,?,?,?,?);`,
                    [user.getUsername(), //in case a white space added to end or start inadvertently
                    user.getEmail(),
                    user.getHashPass(),
                    user.getFirstname(),
                    user.getLastname(),]
                    

                );
                console.log(`user added to db: ` + user.getUsername() + ' ' + user.getPassword() + 
                    ' ' + user.getFirstname() + ' ' + user.getLastname() + ' ' + user.getEmail()
                );

                const newCreatedUsersID = getUserID(db, user.getUsername());
                db.runSync(
                    `
                    INSERT INTO UserRole
                    (UserID, Role)
                    VALUES
                    (?, '?');`,
                    newCreatedUsersID,
                    user.getRole(),

                    
                )


                Alert.alert('Success!','Registration Successful: \n' + 
                    'Username: ' + user.getUsername);
                    
                userAdded = true; //if true then registration is successful
                console.log('HashPassword: ' +  user.getUsername() + 'Password(plain text): ' + user.getPassword());
            }catch(ex){
                console.log('\n\nError entering information into database: \n' + ex +  '\n\n');

                if(ex = `Error: Call to function NativeStatement.finalizeSync' has been rejected.
                    → Caused by: Error code : UNIQUE constraint failed: Users.UserName`){

                        Alert.alert('Alert', 'Username already exists, please choose another username.');

                }
            }
        }else{ 
            console.log('Username already exists.');
        }
        //}else{
            //console.log('User Object null when attempting to insert into db, adding new user failed.');
        //}

    return userAdded;
}


export function getUserID(db : SQLiteDatabase, username: string){
    let userid = null;
    try{
         //1 get the userID
        let retreivedUserIDRow : any = null;

        type UserIDRow = {userID: string};
        retreivedUserIDRow =
            db.getAllSync<UserIDRow>(
            `SELECT UserID
             FROM User
             WHERE username = ?;`,
             [username]

        )

        userid = retreivedUserIDRow?.UserID; //possibly null
        userid !== null? console.log('db fn helperGetUserID: userid val: ' + userid): console.log('fn db helperGetUserID: userid is null');


    }catch(ex){
        console.log('helperGetUserID() ->  ' + ex);

    }

    
    return userid; //can be null

}

/*export function checkUsernameNotExist(db : SQLiteDatabase, username: string){
    let UserIDNotExist = false;

    try{
         //1 get the userID
        let retreivedUserIDRow : any = null;

        type UsernameRow = {username: string};
        retreivedUserIDRow =
            db.getFirstSync<UsernameRow>(
            `SELECT username
             FROM User
             WHERE username = ?;`,
             [username]

        )

        const userid = retreivedUserIDRow?.UserID; //possibly null
        userid !== undefined? console.log('userdb fn checkUserNameNotExist: userid val: ' + userid): console.log('userdbfn checkUserNameNotExist: userid is null');

        userid === null? UserIDNotExist = true : console.log('This user id exists.');
        userid !== null? Alert.alert('Username taken, choose another one.') : '';
    }catch(ex){
        console.log('helperGetUserID() ->  ' + ex);

    }

    return UserIDNotExist;

}*/