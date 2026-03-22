
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
 * @returns {boolean} If user added to db returns true, else false
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
            const role: string = user.getRole();

            if (!username || !email || !hashPass || !firstName || !lastname) {
                console.error("userDB -> addUserSync() -> Error: One or more required user fields are missing.");
            }

            if (user.getRole() === `${Role.ADMIN}`) {
                const empID = 'empl' + Math.random() * (100000 - 100) + 10;
                //user.setEmployeeID(empID);
                //const employeeID = user.getEmployeeID();
                if (!empID) {
                    console.error("Gen Admin -> Error: One or more required user fields are missing.");
                }

                db.runSync(
                    `INSERT INTO User
                    (Username, Credential, password, firstname, lastname, EmployeeID)
                    VALUES
                    (?,?,?,?,?,?);`,
                    [   username,
                        email,
                        hashPass,
                        firstName,
                        lastname,
                        empID]
                );

                console.log('admin added to database');
            } else if (user.getRole() === `${Role.TRAINEE}`) {
                db.runSync(
                    `INSERT INTO User
                    (Username, email, Credential, firstname, lastname)
                    VALUES
                    (?,?,?,?,?);`,
                    [username,
                        email,
                        hashPass,
                        firstName,
                        lastname,]
                );

                console.log('Trainee added to database');
            } else {
                console.error('Some issue in the registration screen role, near line 80');
            }




            console.log(`user added to db: ` + user.getUsername() + ' ' + user.getPassword() +
                ' ' + user.getFirstname() + ' ' + user.getLastname() + ' ' + user.getEmail()
            );

            const newCreatedUsersID = getUsername(db, username); //TODO -> Debug this getUserID() 3/14/26 
            db.runSync(
                `
                INSERT INTO UserRole
                (UserID, Role)
                VALUES
                (?, '?');`,
                newCreatedUsersID,
                role,


            )


            Alert.alert('Success!', 'Registration Successful: \n' +
                'Username: ' + user.getUsername() + "\nrole: " + user.getRole());

            userAdded = true; //if true then registration is successful
            console.log('HashPassword: ' + user.getUsername() + 'Password(plain text): ' + user.getPassword());
        } catch (ex) {
            console.log('\n\nError entering information into database: \n' + ex + '\n\n');

            if (ex = `Error: Call to function NativeStatement.finalizeSync' has been rejected.
                → Caused by: Error code : UNIQUE constraint failed: User.UserName`) {

                Alert.alert('Alert', 'username already exists, please choose another username.');

            }
        }
    } else {
        console.log('User is null');
    }
    //}else{
    //console.log('User Object null when attempting to insert into db, adding new user failed.');
    //}

    return userAdded;
}


export function getUsername(db: SQLiteDatabase, username: string) {
    let retreivedUserIDRow;

    try {
        //1 get the userID

        retreivedUserIDRow =
            db.getAllSync<iUser>(
                `SELECT *
                 FROM User
                 WHERE username = ?;`,
                [username]

            )

        //possibly null
        retreivedUserIDRow !== null ? console.log('db fn helperGetUserID: userid val: ' + retreivedUserIDRow.forEach((elem) => elem.Username)) : console.log('fn db helperGetUserID: userid is null');


    } catch (ex) {
        console.log('helperGetUserID() ->  ' + ex);

    }

    if (retreivedUserIDRow) {
        return retreivedUserIDRow[0].UserID; //can be null
    } else {
        return null;
    }


}

/**
 * This function gets 1 user from the database.
 * @param db 
 * @param username 
 * @returns a Promise repersented as a User Object.
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
        console.log('.getUser() -> ' + oneRow?.Username + 'User information retrieved from db.');
        return oneRow;
    } catch (ex) {
        console.log('Failed to retrieve user ' + username + ' from the database.');
        throw ex;
    }
}


export async function getAllUsers(db: SQLiteDatabase): Promise<iUser[] | null> { //typed by my defined user interface 

    try {
        const allRows = await db.getAllAsync<iUser>(`SELECT * 
                                                    FROM User AS u JOIN UserRole AS r
                                                        ON u.UserID = r.UserID;`);
                                                        
        console.log('.getAllUsers() -> ' + allRows.map((elem) => (elem.Username)));
        return allRows;
    } catch (ex) {
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