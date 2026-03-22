"use strict"

import bcrypt from "bcryptjs";
import * as Crypto from "expo-crypto";

import User from '@/business/User';


//Database Imports

//context imports




//Needed or bcrypt will always fail, sadly their documentation is TRASH and this took
//  FOREVER to FIND in stack overflow, which sucks in many ways too. -> Rant over -> this is 
// needed to generate the salt or bcrypt will fail since it has no built in cryptography, alternatively
// I could just use rand int with a for loop to generate and array of bytes, but that would 
// be insecure and easy to crack.  
bcrypt.setRandomFallback((len) => Array.from(Crypto.getRandomBytes(len)));

export default class Auth {

    /**
     * Generates a password hash, stores it in the referenced User object,
     * then by reference the calling object now has the data, like an 
     * array would, passing the object back to the calling code -> Safe in RN since it respects state and is not
     * using a hook, so it should execute entirely before re-render
     * @param user 
     */
    static generateHash(user: User) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.getPassword(), salt); //https://stackoverflow.com/questions/39542974/bcrypt-node-is-throwing-error-no-callback-function-was-given
            console.log(".generateHash() -> alt: " + salt);
            console.log(".generateHash() -> hash: " + hash);
            user.setHashedPassword(hash);
            //user.setSalt(salt); 
        } catch (ex) {
            console.log("utilties -> Auth class ->  fn .generateHash() -> error -> " + ex);
        }

    }

    /**
     * Checks if the pasword passed is the same as the passsword in the database.
     * @param password plain text password
     * @param hash hashed password retrieved from db
     * @returns {boolean} //true if matching, otherwise false
     */
    static checkIfPasswordMatch(password: string, hash: string) {
        let isCorrect = false;

        try {
            isCorrect = bcrypt.compareSync(password, hash);
        } catch (ex) {
            console.log("Utility class ->  fn .checkPassword() -> error -> " + ex);
        }

        return isCorrect; //bool
    }

}