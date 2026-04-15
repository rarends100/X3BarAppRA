import AdminHomeScreen from "@/components/X3-Screens/admin/admin-home";
import RegistrationScreen from "@/components/X3-Screens/admin/registration-screen";
import LoginScreen from "@/components/X3-Screens/Auth/login-screen";
import StartScreen from "@/components/X3-Screens/start-screen";
import TestingScreen from "@/components/X3-Screens/Testing/testing-screen";
import TraineeHome from "@/components/X3-Screens/Trainee/trainee-home";
import WorkoutEntryScreen from "@/components/X3-Screens/Trainee/workout-entry-screen";
import WorkoutInfoScreen from "@/components/X3-Screens/Trainee/workout-info-screen";
import workoutListScreen from "@/components/X3-Screens/Trainee/workout-list-screen";

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
      WorkoutEntry: WorkoutEntryScreen,
      workoutList: workoutListScreen,
      WorkoutInfo: {
        screen: WorkoutInfoScreen, //https://reactnavigation.org/docs/nesting-navigators
        options: {
          headerShown: false,
        }
      }

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
//TODO - toward the end add screen Navigation appearance customization