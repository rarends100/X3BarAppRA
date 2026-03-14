import User from './User';


export default class Admin extends User{
    #EmployeeID

    setEmployeeID(employeeID){
        this.#EmployeeID = employeeID;
    }
    
    getEmployeeID(){
       return this.#EmployeeID
    }

}