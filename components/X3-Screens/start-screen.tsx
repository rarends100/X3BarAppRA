import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import Button from '../Button/button';

import { deleteDatabase } from '@/database/DeleteDB';
import { useSQLiteContext } from 'expo-sqlite';

const StartScreen = () => {
    const navigation : any = useNavigation();
    const db = useSQLiteContext();

    return (
        <View>
            <Button
                text='Register'
                onPress={() => {
                    console.log('Registration button pressed');
                    navigation.navigate('Register');
                }}
            />
            <Button
                text='Login'
                onPress={() => {
                    console.log('Login button pressed');
                    navigation.navigate('Login');
                }}
            />
            <Button
                text='Delete Database'
                onPress={() => {
                    console.log('Delete Database Button Pressed');
                    deleteDatabase(db);
                }}
            />
        </View>
    );

    
}

export default StartScreen;