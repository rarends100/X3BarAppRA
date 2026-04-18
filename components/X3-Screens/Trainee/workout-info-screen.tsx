import { Animated, KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { useSQLiteContext } from 'expo-sqlite';

import LoggedExercisePerWorkout from "@/business/LoggedExercisePerWorkout";
import { fetchExercisesByWorkoutSessionIDAsync } from "@/database/ExerciseDB";
import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';


const WorkoutInfoScreen = ({ route }: any) => {
    const db = useSQLiteContext();

    const [loggedExercisesForWorkoutArr, setLoggedExercisesForWorkoutArr]
        = useState(new Array<LoggedExercisePerWorkout>()); //https://react.dev/learn/updating-arrays-in-state <- UPDATE: This article is incorrect, in reality you need to use a typed object like I am doing here. In this case it is an Array object, though I did a similar thing for maps too, I hate outdated docs, the people that wrote them should just delete them.

    const { username } = useSelector((state: RootState) => state.auth);

    const { WorkoutSessionID } = route.params;

    useEffect(() => {
            console.log("in effect");
            const arr: LoggedExercisePerWorkout[] = [];
            const fetchData = async () => await fetchExercisesByWorkoutSessionIDAsync(db, WorkoutSessionID)
                .then(data => {
                    if (data != null || data != undefined) {
                        data.forEach((value) => {
                            console.log(value.loggedExerciseName);
                            const exercise = new LoggedExercisePerWorkout();
                            exercise.setLoggedExerciseName(value.loggedExerciseName);
                            exercise.setLoggedBandcolor(value.loggedBandColor);
                            exercise.setReps(value.reps);
                            exercise.setPartialReps(value.partialReps);
                            console.log(exercise.getLoggedExerciseName());
                            //add item
                            arr.push(exercise);
                            console.log(arr.length);
                        });

                    }
                })
                .catch(ex => console.error(ex));
            fetchData();
            setLoggedExercisesForWorkoutArr(arr);
            
        },[WorkoutSessionID]);


    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Text>Workout Information for Workout Session: {WorkoutSessionID} Trainee: {username}</Text>
                    </View>
                    <View>

                    </View>
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default WorkoutInfoScreen;