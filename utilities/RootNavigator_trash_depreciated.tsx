import { isAdminContext, isLoggedInContext, isTraineeContext } from "@/context/RA_user-Auth-context";
import { useContext } from "react";


/**
 * Intended to recieve DrawerNavigator ReactNavation/drawer value, and then switches between them, which
 * can then be called in the drawer creation function to initialize the correct stack based on user role. -> 
 * 
 * Simpliifed -> This controls what screens are displayed to the user by choosing which stack is used for 
 *                  navigation.
 * @param AuthStack 
 * @param AdminStack 
 * @returns DrawerNavigator
 */
export const RootDrawerNavigatorStackSwitcher_RA = (AuthStack: any, AdminStack: any ) => { //TODO add trainee stack once I start to make the trainee pages
    const isLoggedIn = useContext(isLoggedInContext); //I don't need my setState() fn here
    const isAdmin = useContext(isAdminContext);
    const isTrainee = useContext(isTraineeContext);

    if(!isLoggedIn) return AuthStack;
    if(isLoggedIn && isAdmin) return AdminStack;
}