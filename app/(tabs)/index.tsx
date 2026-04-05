"use strict"

//navigation
import { NavigationIndependentTree } from '@react-navigation/native';

//Authorization
import { AdminStack, AuthStack, TraineeStack } from '@/utilities/Navigation';
import { Role } from '@/utilities/Role';
import { RootState, store } from '@/utilities/store';
import { Provider, useSelector } from 'react-redux';
//DATABASE Imports
import { migrateDbIfNeeded } from '@/database/DatabaseCreation';
import {
  SQLiteProvider
} from 'expo-sqlite';
import { useEffect, useState } from 'react';



const databaseName = "RAX3BarData";
function App() {
  //Authentication step 3 ->  Root navigator switches stacks based on auth state
  const { userID, role, username } = useSelector((state: RootState) => state.auth);
  const [authKey, setAuthKey] = useState(0);
  
  //force re-render anytime the auth state changes. - What a nightmare, since recalling App() breaks it all
  useEffect(() => {
    //when auth state changes, increment the key
    if(authKey === 0){
      setAuthKey(prevKey => prevKey + 1);
    }else{
      setAuthKey(prevKey => prevKey - 1);
    }
    
  }, [userID, role, username]); //Depedencies -> if any of these change, trigger the authKey to change -> triggers the NavigationIndepenetTree container to re-render and thus switch stacks
  
  return (
    <NavigationIndependentTree key={authKey}>
        <SQLiteProvider databaseName={databaseName} onInit={migrateDbIfNeeded}>{/*toplevel SQLite data*/}
          { !userID && <AuthStack /> }
          { userID && role === Role.ADMIN && <AdminStack /> }
          { userID && role === Role.TRAINEE && <TraineeStack /> }
        </SQLiteProvider>
    </NavigationIndependentTree>
  );
}


const AppWrapper = () => {   //https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
  return (
    <Provider store={store}>
      <App />{/**Now app has access to context */}
    </Provider>
  )
}

export default AppWrapper;


