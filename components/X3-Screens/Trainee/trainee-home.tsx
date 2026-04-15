"use strict"

import Button from '@/components/Button/button';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const TraineeHome = () =>{

    const navigation: any = useNavigation();
    return (
        <View>
            <Text>
                Trainee Home
            </Text>
            <Button
                text="Enter Workout"
                 onPress={() => {navigation.navigate("Workout");}}
            />
        </View>
    )
}

export default TraineeHome;
