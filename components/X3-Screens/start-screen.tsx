import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';

const StartScreen = () => {
    const navigation : any = useNavigation();

    const test = true;

    if (test){
        return (
            <View>
                <Text>
                    //Todo add login and register page navigation
                </Text>
            </View>
        );
    }else{
       navigation.navigate('AdminHome');
       return (
        <View>
            <Text>
                Administrators only!!!
            </Text>
        </View>
       )
    }
    
}

export default StartScreen;