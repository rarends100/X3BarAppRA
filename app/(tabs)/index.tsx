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
import { default as RegistrationScreen } from '../../components/X3-Screens/admin/registration-screen';
import { default as Testing } from '../../components/X3-Screens/Testing/testing';
import { default as AdminHomeScreen } from './../../components/X3-Screens/admin/admin-home';
import { default as StartScreen } from './../../components/X3-Screens/start-screen';

//app context import
import {
  isAdminContext,
  isLoggedInContext,
  isTraineeContext,
  usernameContext
} from '@/context/RA_user-Auth-context.js';

//DATABASE Imports
import { migrateDbIfNeeded } from '@/Database/DatabaseCreation';
import {
  SQLiteProvider
} from 'expo-sqlite';



const databaseName = "RAX3BarData";
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
              <SQLiteProvider databaseName={databaseName} onInit={migrateDbIfNeeded}>{/*toplevel SQLite data*/}
                  <DrawerNavigation/>
              </SQLiteProvider>
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
    AdminHome: AdminHomeScreen,
    Register: RegistrationScreen,
    Testing: Testing
    
    /**
     * TODO: implement all screens
     * TODO: customize all screens
     */

  }
});

/*
//Screens I don't want to appear in the drawer.
const rootStack = createNativeStackNavigator({
  screens: {
    Register: RegistrationScreen
  }
})
  */

const DrawerNavigation = createStaticNavigation(Drawer);
//const BaseNavigation = createStaticNavigation(rootStack);
