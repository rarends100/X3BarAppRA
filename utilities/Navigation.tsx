import AdminHomeScreen from "@/components/X3-Screens/admin/admin-home";
import allUsersScreen from "@/components/X3-Screens/admin/all-users-screen";
import RegistrationScreen from "@/components/X3-Screens/admin/registration-screen";
import LoginScreen from "@/components/X3-Screens/Auth/login-screen";
import StartScreen from "@/components/X3-Screens/start-screen";
import TraineeHome from "@/components/X3-Screens/Trainee/trainee-home";
import WorkoutEntryScreen from "@/components/X3-Screens/Trainee/workout-entry-screen";
import WorkoutInfoScreen from "@/components/X3-Screens/Trainee/workout-info-screen";
import workoutListScreen from "@/components/X3-Screens/Trainee/workout-list-screen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";

import Ionicons from '@expo/vector-icons/Ionicons';


const notHideScreens = false;


//Authentication step 1 using redux -> create the navigators
export const AuthStack = createStaticNavigation(
  createDrawerNavigator({
    initialRouteName: 'Login',
    screens: {
      Login: {
        screen: LoginScreen,
        options: {
          title: "Login",
          drawerActiveBackgroundColor: 'black',
          headerLeft: () =>
              <Ionicons name="barbell-sharp" size={50} color="orange" />
               
          , //https://stackoverflow.com/questions/70758201/react-navigation-default-drawer-icon-how-to-change-it})
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        }
      },
    },
    screenOptions: { //common styles
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'orange',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'TimeNewRoman',
      },
      drawerActiveTintColor: 'black',
      drawerStyle: {
        backgroundColor: 'orange',
        width: 200
      }
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
      TraineeHome: {
        screen: TraineeHome,
        options: {
          title: "Training Home",
          drawerActiveBackgroundColor: 'black',
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        }
      },
      WorkoutEntry: {
        screen: WorkoutEntryScreen,
        options: {
          title: "Enter Workout",
          drawerActiveBackgroundColor: 'black',
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        }
      },
      workoutList: {
        screen: workoutListScreen,
        options: {
          title: "Past Workouts",
          drawerActiveBackgroundColor: 'black',
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        },

      },
      WorkoutInfo: {
        screen: WorkoutInfoScreen, //https://reactnavigation.org/docs/nesting-navigators
        options: {
          headerShown: false,
          drawerItemStyle: { display: 'none' }, //https://stackoverflow.com/questions/60395508/react-navigation-5-hide-drawer-item
          title: "Workout Info"

        }
      }, //nested

    },
    screenOptions: { //common styles
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'orange',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'TimeNewRoman',
      },
      drawerActiveTintColor: 'black',
      drawerStyle: {
        backgroundColor: 'orange',
        width: 250
      }
    },
  })
);


export const AdminStack = createStaticNavigation(
  createDrawerNavigator({
    initialRouteName: 'AdminHome',
    screens: {
      AdminHome: {
        screen: AdminHomeScreen,
        options: {
          title: "Admin Portal",
          drawerActiveBackgroundColor: 'black',
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        }
      },
      Register: {
        screen: RegistrationScreen,
        options: {
          title: "Register New User",
          drawerActiveBackgroundColor: 'black',
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        }
      },
      Users: {
        screen: allUsersScreen,
        options: {
          title: "View All Users",
          drawerActiveBackgroundColor: 'black',
          drawerLabelStyle: {
            color: "orange",
            fontSize: 20,
          }
        }
      },

    },
    screenOptions: { //common styles
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'orange',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'TimeNewRoman',
      },
      drawerActiveTintColor: 'black',
      drawerStyle: {
        backgroundColor: 'orange',
        width: 250
      }
    },
  })
);
//TODO - toward the end add screen Navigation appearance customization