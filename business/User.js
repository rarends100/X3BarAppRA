"use strict"

class User{
    #userID;
    #username;
    #firstname;
    #lastname;
    #email;
    #password;
    #hashPass;
    #role;

    constructor(){
        this.#userID = null;
        this.#username = null;
        this.#firstname = null;
        this.#lastname = null;
        this.#email = null;
        this.#password = null;
        this.#hashPass = null;
        this.#role = null;
    }

    //Getters
    getUserID(){
        return this.#userID;
    }

    getUsername(){
        return this.#username;
    }

    getFirstname(){
        return this.#firstname;
    }

    getLastname(){
        return this.#lastname;
    }

    getEmail(){
        return this.#email;
    }

    getPassword(){
        return this.#password;
    }

    getHashPass(){
        return this.#hashPass;
    }

    getRole(){
        return this.#role;
    }

    //Setters
    setUserID(userID){
        this.#userID = userID;
    }

    setUsername(username){
        this.#username = username;
    }

    setFirstname(firstname){
        this.#firstname = firstname;
    }

    setLastname(lastname){
        this.#lastname = lastname;
    }

    setEmail(email){
        this.#email = email;
    }

    setPassword(password){
        this.#password = password;
    }

    setHashedPassword(hashPass){
        this.#hashPass = hashPass;
    }

    setRole(role){
        this.#role = role;
    }
}

export default User;