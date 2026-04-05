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
            <Text>
                select a workout
            </Text>
            <Button
                text="Workout A"
                 onPress={() => {navigation.navigate("WorkoutA")}}
            />
            <Button
                text="Workout B"
                onPress={() => {navigation.navigate("WorkoutB")}}
            />
        </View>
    )
}

export default TraineeHome;
