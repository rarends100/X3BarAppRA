"use strict"

import Button from '@/components/Button/button';
import { Image, Text, View } from 'react-native';

import Logout from '@/components/logout';

import { useNavigation } from '@react-navigation/native';

import { traineeHomeStyle } from '@/styles';

const TraineeHome = () =>{

    const navigation: any = useNavigation();
    return (
        <View style={traineeHomeStyle.container}>
            <Text style={traineeHomeStyle.header}>
                Trainee Home
            </Text>
            <Button
                text="Enter Workout"
                 onPress={() => {navigation.navigate("WorkoutEntry");}}
                 marginBottom={10}
            />
            <Button
                text="View Workouts"
                onPress={async () => {navigation.navigate("workoutList");}}
                marginBottom={10}
            />
            <Logout/>
            <Image
                source={require('@/images/x3-thumb-2.jpg')}
                style={traineeHomeStyle.image}
            />
        </View>
    )
}

export default TraineeHome;
