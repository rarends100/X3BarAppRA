"use strict"

import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screen imports
import { createStaticNavigation, NavigationIndependentTree } from '@react-navigation/native';
import StartScreen from './../../components/X3-Screens/start-screen';

export default function App() {
  return  (
      <NavigationIndependentTree>
        <Navigation/>
      </NavigationIndependentTree>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Start',
  screens: {
    Start: {
      screen: StartScreen,
    },
    /**
     * TODO implement screens: 
     *  other screens format -> 
     *    if: signedIn //Val can be true or false
     *    screen: AdminScreen
     */

  }
});

const Navigation = createStaticNavigation(RootStack);

