//custom hook RA


// hooks/useLogin.ts   -> custom hooks must be in a .ts file and start the name with user by convention
import User from '@/business/User';
import { isAdminContext, isLoggedInContext, isTraineeContext } from '@/context/RA_user-Auth-context';
import { getUser } from '@/database/UserDB';
import Auth from '@/utilities/Auth';
import { Role } from '@/utilities/Role';
import { useSQLiteContext } from 'expo-sqlite';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';


/**
 * 
 * @returns login() function
 */
export function useLogin() {
    const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
    const { setIsAdmin } = useContext(isAdminContext);
    const { setIsTrainee } = useContext(isTraineeContext);

    const [user, setUser] = useState<User | null>(new User);

    const db = useSQLiteContext();

    /**
     * This is the login function that is returned from the useLogin() hook, 
     * this is necessary for react if you want a proper separation of concerns 
     * and it is insane. Technically the way I am going about this is not wrong,
     * but not the "official React way" either. The thing is, the "official React way" leads
     * to seriously hard to maintain software.
     * @param username string
     * @param password string
     * @returns {boolean}
     */
    const login = async (username: string, password: string) => {
        const retrievedUserRecord = await getUser(db, username);

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

            //const user = new User();
            setUser(user);

            if (user !== null) {
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
                    "hook -> useLogin Has been retrieved from the database and set on the user in .login()");

                if (Auth.checkPassword(user)) {
                    setIsLoggedIn(true);

                    switch (user.getRole()) {
                        case `${Role.ADMIN}`:
                            setIsAdmin(true);
                            break;
                        case `${Role.TRAINEE}`:
                            setIsTrainee(true);
                    }
                    //setUser(null);
                } else {
                    Alert.alert("Message", "wrong password");
                }
            }

        } else {
            Alert.alert("Login Attempt Failed", "Username is incorrect or user does not exist.");
            console.log("Username is incorrect or user does not exist.");
        }


        return isLoggedIn;
    };
    return login; //this will get passed to the variable that is assigned this hook(useLogin)
}