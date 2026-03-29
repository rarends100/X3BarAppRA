
export interface iUser {
    UserID: number,
    UserName: String,
    Email: string,
    Credential: string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    EmployeeID: string,
    Points: number,
    Role: string,
    //getUsername: () => User["getUsername"]; //Indexed access type -> tells the ts the return type of this function is whatever the type of getUsername is in the user class
    //getUserID: () => User["getUserID"];
    //getEmail: () => User["getEmail"];
}

//typed to the same names as the db columns