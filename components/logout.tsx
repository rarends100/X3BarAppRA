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
                    db.closeSync(); //Call this anytime I need to reload the stack after an action,
                //  in my case after authorization of the user then it remounts 
                // the SQLite db and if this isn't called then what happens is
                //  that the db doesn't close properly and future db calls lead
                //  to concurrency issues. Within my app that means this leans to
                //  be called once after the login actions and once after the logout
                //  actions in the respespective functional components
                }}
            ></Button>
        </View>
    );
}

export default Logout;