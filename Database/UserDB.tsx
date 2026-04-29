
//database
import { SQLiteDatabase } from "expo-sqlite";

//encryption
//import bcrypt from "bcryptjs";
//import * as Crypto from 'expo-crypto';

//alerts
import { Alert } from 'react-native';

import Auth from '@/utilities/Auth';
//business
import User from "@/business/User";

import { iUser } from "@/Interfaces/iUserInterface";

import { Role } from '@/utilities/Role';

/**
 * This function adds a user to the database.
 * @param db 
 * @param user 
 * @returns (boolean) If user added to db returns true, else false
 */
export function insertUserSync(db: SQLiteDatabase, user: User) {
    let userAdded = false;


    if (user !== null) {
        //if(checkUsernameNotExist(db, user.getUsername())){
        console.log('hit add user fn');
        Auth.generateHash(user);

        try {
            const username: string = user.getUsername();
            const email: string = user.getEmail();
            const hashPass: string = user.getHashPass();
            const firstName: string = user.getFirstname();
            const lastname: string = user.getLastname();
            const role: string = user.getRole().toString();
            const password: string = user.getPassword();

            if (!username || !email || !hashPass || !firstName || !lastname) {
                console.error("UserDB -> insertUserSync() -> Error: One or more required user fields are missing.");
            }

            if (user.getRole() === Role.ADMIN) {
                const timestamp = Date.now();
                const random = Math.floor(Math.random() * 10000);
                const empID: string = `empl${timestamp}${random}`.toString();

                if (!empID) {
                    console.error("UserDB -> insertUserSync() -> Gen Admin -> Error: Employee ID failed to populate for ADMIN");
                }

                try {
                    db.runSync(
                        `INSERT INTO User
                    (Username, Email, Credential, firstname, lastname, EmployeeID)
                    VALUES
                    (?, ?, ?, ?, ?, ?);`, //6 values
                        [username,
                            email,
                            hashPass,
                            firstName,
                            lastname,
                            empID]
                    );
                } catch (ex) {
                    console.log("UserDB -> .insertUserSync() -> Attempting to insert ADMIN user -> \nexception: " + ex);
                }


                console.log('UserDB -> insertUserSync() -> admin added to database');
            } else if (user.getRole() === Role.TRAINEE) {
                try {
                    db.runSync(
                        `INSERT INTO User
                    (Username, email, Credential, firstname, lastname)
                    VALUES
                    (?, ?, ?, ?, ?);`, //5 values
                        [username,
                            email,
                            hashPass,
                            firstName,
                            lastname]
                    );
                }catch(ex){
                    console.log("UserDB -> .insertUserSync() -> Attempting to TRAINEE user -> \nexception: " + ex);
                }
              

                console.log('UserDB -> insertUserSync() -> Trainee added to database');
            } else {
                console.error('UserDB -> insertUserSync() ->Some issue in the registration screen role, near line 80');
            }




            console.log(`UserDB -> insertUserSync() -> user added to db: ` + username + ' ' + password +
                ' ' + firstName + ' ' + lastname + ' ' + email
            );

            try {
                const newCreatedUsersID = getUserID(db, username); //TODO -> Debug this getUserID() 3/14/26 
                db.runSync(
                    `
                    INSERT INTO UserRole
                    (UserID, Role)
                    VALUES
                    (?, ?);`,
                    [newCreatedUsersID,
                        role],
                );
                Alert.alert('UserDB -> insertUserSync() -> Success!', 'Registration Successful: \n' +
                'Username: ' + username + "\nrole: " + role); //At this point, registration succeeded if it didn't already throw an exception 

                 userAdded = true; //if true then registration is successful 
                 console.log('UserDB -> insertUserSync() -> HashPassword: ' + hashPass + 'Password(plain text): ' + password +
                " username: " + username
            );
            } catch (ex) {
                console.log("UserDB -> .insertUserSync() -> Attempting to insert role -> \nexception: " + ex);
            }

        } catch (ex: any) { //returns Error obj
            console.log('\n\nUserDB -> insertUserSync() -> Error entering information into database: \n' + ex + '\n\n');

            if (ex.message.includes(`UNIQUE constraint failed: User.UserName`)) {

                Alert.alert('Alert', 'username already exists, please choose another username.');


            }
        }
    } else {
        console.log('User is null');
    }

    return userAdded;
}

/**
 * Re
 * @param db 
 * @param username 
 * @returns value userame or null
 */
export function getUserID(db: SQLiteDatabase, username: string) {
    let retreivedUserIDRow;

    try {
        retreivedUserIDRow =
            db.getAllSync<iUser>(
                `SELECT UserID
                 FROM User
                 WHERE username = ?;`,
                [username]

            );

        //possibly null
        retreivedUserIDRow !== null ? console.log('db fn getUserID: userid val: ' + retreivedUserIDRow.forEach((elem) => elem.UserName)) : console.log('fn db getUserID: userid is null');


    } catch (ex) {
        console.log('getUserID() ->  ' + ex);

    }

    if (retreivedUserIDRow !== undefined && retreivedUserIDRow !== null) {//can be undefined
        return retreivedUserIDRow[0].UserID;
    } else {
        return null;
    }


}

/**
 * This function gets 1 user from the database.
 * @param db 
 * @param username 
 * @returns a Promise repersented as a JSON object of User Object data.
 * Values retrieved from db -> UserID, Username, Email, 
 * Credential (this the hash), FirstName, LastName,
 * EmployeeID, Points, Role (role then controls which screens render and can be accessed) 
 */
export async function getUser(db: SQLiteDatabase, username: string): Promise<iUser | null> {
    try {
        const oneRow = await db.getFirstAsync<iUser>(
            `SELECT * 
             FROM User AS u JOIN UserRole AS r
                ON u.UserID = r.UserID
             WHERE UserName = ?;`,
            [username]
        );
        if (oneRow !== null && oneRow !== undefined) {
            console.log('UserDB -> .getUser() -> ' + oneRow.UserName + 'User information retrieved from db.');
            console.log('UserDB -> .getUser() -> ' + oneRow);
        }

        return oneRow; //JSON object
    } catch (ex) {
        console.log('Failed to retrieve user ' + username + ' from the database.');
        throw ex;
    }
}
/**
 * Returns a JSON object representing an array of User objects data
 * @param db 
 * @returns a Promise repersented as a array of JSON objects representing the data of a User Object.
 */
export async function getAllUsers(db: SQLiteDatabase): Promise<iUser[] | null> { //1. typed by my defined user interface 

    try {
        const allRows = await db.getAllAsync<iUser>(`SELECT * 
                                                    FROM User AS u JOIN UserRole AS r
                                                        ON u.UserID = r.UserID;`); //2. So that each JSON object returned here follows
        //  the structure of the iUser interface i.e. {"userID: 1, Username: "Geralt", role: "ADMIN"}
        //3. Now I should be able to call .map, filter(), or .forEach without any extra parsing since it is returning an array of JSON objects in the calling code
        console.log('.getAllUsers() -> ' + allRows.map((elem) => elem.UserName + "\n" + elem.Role));
        
        return allRows; //Array of JSON objects containing user values or null
    } catch (ex) {
        console.log('Failed to get users from the database', ex);
        throw ex; //rethrown out to calling program so it knows it failed
    }

}

export function deleteUser(db: SQLiteDatabase, userID: number) {
    try{
        const result = db.runSync(
            `DELETE FROM User
             WHERE UserID = ?`,
             [userID]
        );

        console.log("User Deleted");
    }catch(ex){
        throw new Error("UserDB -> Admin -> Failed to delete user -> \n\tReason: " + ex );
        
    }
}   