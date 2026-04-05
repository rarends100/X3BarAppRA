import AdminHomeScreen from "@/components/X3-Screens/admin/admin-home";
import RegistrationScreen from "@/components/X3-Screens/admin/registration-screen";
import LoginScreen from "@/components/X3-Screens/Auth/login-screen";
import StartScreen from "@/components/X3-Screens/start-screen";
import TestingScreen from "@/components/X3-Screens/Testing/testing-screen";
import TraineeHome from "@/components/X3-Screens/Trainee/trainee-home";
import WorkoutAScreen from "@/components/X3-Screens/Trainee/workout-A-screen";
import WorkoutBScreen from "@/components/X3-Screens/Trainee/workout-B-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";


const notHideScreens = false;

//Authentication step 1 using redux -> create the navigators
export const AuthStack = createStaticNavigation(
  createDrawerNavigator({
    initialRouteName: 'Login',
    screens: {
      Login: LoginScreen,
    },
  })
);

export const TesterStack = createStaticNavigation(
  createDrawerNavigator({
    initialRouteName: 'Home',
    screens: {
       Home: StartScreen,
       
    },
  })
);

export const TraineeStack = createStaticNavigation(
  createDrawerNavigator({
    initialRouteName: 'TraineeHome',
    screens: {
       TraineeHome: TraineeHome,
       WorkoutA: WorkoutAScreen,
       WorkoutB: WorkoutBScreen
       
    },
  })
);

export const AdminStack = createStaticNavigation(
  createDrawerNavigator({
    initialRouteName: 'AdminHome',
    screens: {
      AdminHome: AdminHomeScreen,
      Register: RegistrationScreen,
      Testing: TestingScreen,
      
    },
  })
);
      //TODO: add trainee pages to flow once I have made some and as I make them


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
