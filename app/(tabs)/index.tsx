"use strict"

//navigation imports
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

//https://www.dhiwise.com/post/mastering-the-art-of-separating-ui-and-logic-in-react -> custom hooks
import { createDrawerNavigator } from '@react-navigation/drawer';

//utility imports
import { useState } from 'react';

//screen imports
//navigation
import { createStaticNavigation, NavigationIndependentTree } from '@react-navigation/native';
//screens
import { default as AdminHomeScreen } from '@/components/X3-Screens/admin/admin-home';
import { default as RegistrationScreen } from '@/components/X3-Screens/admin/registration-screen';
import { default as LoginScreen } from '@/components/X3-Screens/Auth/login-screen';
import { default as StartScreen } from '@/components/X3-Screens/start-screen';
import { default as TestingScreen } from '@/components/X3-Screens/Testing/testing-screen';

//app context import
import {
  isAdminContext,
  isLoggedInContext,
  isTraineeContext,
  usernameContext
} from '@/context/RA_user-Auth-context.js';

//DATABASE Imports
import { migrateDbIfNeeded } from '@/database/DatabaseCreation';
import {
  SQLiteProvider
} from 'expo-sqlite';

//custom stack switcher import
import { RootDrawerNavigatorStackSwitcher_RA } from '@/utilities/RootNavigator';


const databaseName = "RAX3BarData";
export default function App() {

  const [isTrainee, setIsTrainee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  //const [role, setRole] = useState("");

  const RootNavigator = RootDrawerNavigatorStackSwitcher_RA(AuthStack, AdminStack);

  const DrawerNavigation = createStaticNavigation(RootNavigator);


  return ( //TODO:this is a mess, I need to fix it
    <NavigationIndependentTree>
      <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <isAdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          <isTraineeContext.Provider value={{ isTrainee, setIsTrainee }}>
            <usernameContext.Provider value={{ username, setUsername }}>
              <SQLiteProvider databaseName={databaseName} onInit={migrateDbIfNeeded}>{/*toplevel SQLite data*/}
                <DrawerNavigation />
              </SQLiteProvider>
            </usernameContext.Provider>
          </isTraineeContext.Provider>
        </isAdminContext.Provider>
      </isLoggedInContext.Provider>
    </NavigationIndependentTree>
  );
}





const AdminStack = createDrawerNavigator({
  initialRouteName: 'Start',
  screens: {
    Start: {
      screen: StartScreen
    },
    AdminHome: AdminHomeScreen,
    Register: RegistrationScreen,
    Testing: TestingScreen
  }
});

const AuthStack = createDrawerNavigator({
  initialRouteName: 'Start',
  screens: {
    Start: LoginScreen

  }
});

const DrawerNavigation = createStaticNavigation(AuthStack);

/* uncomment once I start making trainee screens
const TraineeStack = createDrawerNavigator({
    initialRouteName: 'TraineeHome',
    screens: {
      TraineeHome: TraineeHomeScreen,
    }
}); */

//const DrawerNavigation = createStaticNavigation(Drawer);



/**
    * TODO: implement all screens
    * TODO: customize all screens
    */




//const BaseNavigation = createStaticNavigation(rootStack);
