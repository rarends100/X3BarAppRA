"use strict"

//navigation imports
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//utility imports
import { useState } from 'react';

//screen imports
  //navigation
import { createStaticNavigation, NavigationIndependentTree } from '@react-navigation/native';
  //screens
import { default as AdminHomeScreen } from './../../components/X3-Screens/admin/admin-home';
import { default as StartScreen } from './../../components/X3-Screens/start-screen';

//app context import
import {
  isAdminContext,
  isLoggedInContext,
  isTraineeContext,
  usernameContext
} from '@/RA_user-Auth-context.js';



export default function App() {
  
  const [isTrainee, setIsTrainee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return  (
      <NavigationIndependentTree>
          <isLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
          <isAdminContext.Provider value={{isAdmin, setIsAdmin}}>
          <isTraineeContext.Provider value={{isTrainee, setIsTrainee}}>
          <usernameContext.Provider value={{username, setUsername}}>
              <Navigation/>
          </usernameContext.Provider>
          </isTraineeContext.Provider>
          </isAdminContext.Provider>
          </isLoggedInContext.Provider>
      </NavigationIndependentTree>
  );
}




const Drawer = createDrawerNavigator({
  initialRouteName: 'Start',
  screens: {
    Start: StartScreen,
    AdminHome: AdminHomeScreen
    
    /**
     * TODO implement screens
     */

  }
});

const Navigation = createStaticNavigation(Drawer);

