//database
import {
    SQLiteDatabase,
    deleteDatabaseSync
} from "expo-sqlite";

//alerts
import { Alert } from 'react-native';

const databaseName = "RAX3BarData";

export function deleteDatabase(db: SQLiteDatabase){
        console.log("database path: " + db.databasePath);
      
           
        
        Alert.alert('Alert', `Are you sure you want to delete the '${databaseName}' database? `, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive',
            },
            {
                text: 'Delete', 
                onPress: () => 
                    {
                        try{
                            db.closeSync(); //freeup the db by closing it
                            deleteDatabaseSync(databaseName);
                            console.log('Database deleted ' + databaseName);
                            Alert.alert('Alert', 'Database ' + databaseName + " " + 'deleted, close and reopen app to re-create database from scratch.');
                        }catch(er){
                            console.log("db delete: " + er);
                            Alert.alert('Alert', 'Database ' +  databaseName  + ' already deleted, close then reopen the app to recreate it.');
                        }
                    },
                style: 'default' //https://reactnative.dev/docs/alert#alertbuttonstyle-ios
            },
        ]);
       
        

        //https://docs.expo.dev/versions/latest/sdk/sqlite/
    }