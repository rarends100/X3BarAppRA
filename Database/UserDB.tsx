
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

import { UserInterface } from "@/Interfaces/Interfaces";
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
                const username: string = user.getUsername();
                const email: string = user.getEmail();
                const hashPass: string = user.getHashPass();
                const firstName: string = user.getFirstname();
                const lastname: string = user.getLastname();
                const role: string = user.getRole();

                 if (!username || !email || !hashPass || !firstName || !lastname) {
                console.error("userDB -> addUserSync() -> Error: One or more required user fields are missing.");
                 }

                if(user.getRole() === 'Admin'){
                const empID = 'empl' + Math.random() * (100000 - 100) + 10;
                //user.setEmployeeID(empID);
                //const employeeID = user.getEmployeeID();
                if (!empID) {
                console.error("Gen Admin -> Error: One or more required user fields are missing.");
                }

                  db.runSync(
                       `INSERT INTO User
                        (Username, email, password, firstname, lastname, EmployeeID)
                        VALUES
                        (?,?,?,?,?,?);`,
                        [username, 
                        email,
                        hashPass,
                        firstName,
                        lastname,
                        empID] 
                    );

                    console.log('admin added to database');
                }else{
                    db.runSync(
                       `INSERT INTO User
                        (Username, email, password, firstname, lastname)
                        VALUES
                        (?,?,?,?,?);`,
                        [username, 
                        email,
                        hashPass,
                        firstName,
                        lastname,]  
                    );

                    console.log('Trainee added to database');
                }
                
                    

               
                console.log(`user added to db: ` + user.getUsername() + ' ' + user.getPassword() + 
                    ' ' + user.getFirstname() + ' ' + user.getLastname() + ' ' + user.getEmail()
                );

                const newCreatedUsersID = getUser(db, username); //TODO -> Debug this getUserID() 3/14/26 
                db.runSync(
                    `
                    INSERT INTO UserRole
                    (UserID, Role)
                    VALUES
                    (?, '?');`,
                    newCreatedUsersID,
                    role,

                    
                )


                Alert.alert('Success!','Registration Successful: \n' + 
                    'Username: ' + user.getUsername() + "\nrole: " + user.getRole());
                    
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
            console.log('User is null');
        }
        //}else{
            //console.log('User Object null when attempting to insert into db, adding new user failed.');
        //}

    return userAdded;
}


export function getUser(db : SQLiteDatabase, username: string){
    let retreivedUserIDRow;
    
    try{
         //1 get the userID
       
        retreivedUserIDRow =
            db.getAllSync<UserInterface>(
            `SELECT *
             FROM User
             WHERE username = ?;`,
             [username]

        )

         //possibly null
        retreivedUserIDRow !== null? console.log('db fn helperGetUserID: userid val: ' + retreivedUserIDRow): console.log('fn db helperGetUserID: userid is null');


    }catch(ex){
        console.log('helperGetUserID() ->  ' + ex);

    }

    if (retreivedUserIDRow){
        return retreivedUserIDRow[0].UserID; //can be null
    }else{
        return null;
    }
    

}


export async function getAllUsers(db: SQLiteDatabase) : Promise<UserInterface[]>{ //typed by my defined user interface 
    
    try{
        const allRows = await db.getAllAsync<UserInterface>('SELECT * FROM User;');
        console.log('.getAllUsers() -> ' + allRows.map((elem) => (elem.Username)));
        return allRows;
    }catch(ex){
        console.log('Failed to get users from the database', ex);
        throw ex; //rethrown out to calling program so it knows it failed
    }
    




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