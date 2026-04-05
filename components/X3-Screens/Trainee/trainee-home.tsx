"use strict"

import Button from '@/components/Button/button';
import { Text, View } from 'react-native';

const TraineeHome = () =>{

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
            />
            <Button
                text="Workout B"
            />
        </View>
    )
}

export default TraineeHome;
