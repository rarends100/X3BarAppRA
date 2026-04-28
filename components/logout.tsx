import Button from '@/components/Button/button';
import { logout } from '@/utilities/AuthSlice';
import { useSQLiteContext } from 'expo-sqlite';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

const Logout =() => {

    const db = useSQLiteContext();
    const dispatch = useDispatch();

    return (
        <View>
            <Button
                buttonColor='black'
                text='Logout'
                buttonTextColor='white'
                onPress={() => {
                    dispatch(logout());
                    db.closeSync(); //IMPORTANT NOTE ->
                // Call this anytime I need to reload the stack after an action,
                //  in my case after authorization of the user then it remounts 
                // the SQLite db and if this isn't called then what happens is
                //  that the db doesn't close properly and future db calls lead
                //  to concurrency issues (the old db instance stays open when a new one attempts to open).
                //  Within my app that means this needs to
                //  be called once after the login actions and once after the logout
                //  actions in the respespective functional components

                /*so now ->
                    1. The database connection is properly closed before the navigation stack changes
                    2. When the SQLiteProvider remounts (if needed), it creates a fresh connection
                    3. No concurrent database operations occur that could cause crashes

                    issue solved -> 
                     Error: Call to function 'NativeDatabase.prepareAsync' has been rejected.
                     call stack React Native -> 
                        Caused by: java.lang.NullPointerException: java.lang.NullPointerException

                        Call Stack
                        construct (<native>)
                        apply (<native>)
                        _construct (node_modules\@babel\runtime\helpers\construct.js)
                        Wrapper (node_modules\@babel\runtime\helpers\wrapNativeSuper.js)
                        construct (<native>)
                        _callSuper (node_modules\@babel\runtime\helpers\callSuper.js)
                        NamelessError (node_modules\@expo\metro-runtime\src\metroServerLogs.native.ts)
                        captureCurrentStack (node_modules\@expo\metro-runtime\src\metroServerLogs.native.ts)
                        HMRClient.log (node_modules\@expo\metro-runtime\src\metroServerLogs.native.ts)
                        console.level (node_modules\react-native\Libraries\Core\setUpDeveloperTools.js)
                        fetchWorkoutSessionsByUserIDAsync (database\WorkoutDB.tsx)
                        throw (<native>)
                        asyncGeneratorStep (node_modules\@babel\runtime\helpers\asyncToGenerator.js)
                        _throw (node_modules\@babel\runtime\helpers\asyncToGenerator.js)
                        tryCallOne (address at (InternalBytecode.js:1:1180)
                        anonymous (address at (InternalBytecode.js:1:1874)
                        LOG  0
                        Android Bundled 56ms node_modules\expo-router\entry.j
                */
                }}
            ></Button>
        </View>
    );
}

export default Logout;