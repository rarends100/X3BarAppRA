import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import Button from '../Button/button';

const StartScreen = () => {
    const navigation : any = useNavigation();


    return (
        <View>
            <Button
                text='Register'
                onPress={() => {
                    console.log('Registration button pressed');
                    navigation.navigate('Register');
                }}
            />
        </View>
    );

    
}

export default StartScreen;