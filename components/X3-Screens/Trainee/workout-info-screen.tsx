import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { useSQLiteContext } from 'expo-sqlite';

import LoggedExercisePerWorkout from "@/business/LoggedExercisePerWorkout";
import ExerciseSegments from "@/components/exercise-segments";
import { fetchExercisesByWorkoutSessionIDAsync } from "@/database/ExerciseDB";
import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';

import { WorkoutInfoScreenStyles } from "@/styles";

const WorkoutInfoScreen = ({ route }: any) => {
    const db = useSQLiteContext();

    const [loggedExercisesForWorkoutArr, setLoggedExercisesForWorkoutArr]
        = useState(new Array<LoggedExercisePerWorkout>()); //https://react.dev/learn/updating-arrays-in-state <- UPDATE: This article is incorrect, in reality you need to use a typed object like I am doing here. In this case it is an Array object, though I did a similar thing for maps too, I hate outdated docs, the people that wrote them should just delete them.

    const { username } = useSelector((state: RootState) => state.auth);

    const { WorkoutSessionID } = route.params;

    useEffect(() => {
        console.log("in effect");
        const arr: LoggedExercisePerWorkout[] = [];
        try {
            const fetchData = async () => await fetchExercisesByWorkoutSessionIDAsync(db, WorkoutSessionID)
                .then(data => {
                    if (data != null || data != undefined) {
                        data.forEach((value) => {
                            console.log(value.LoggedExerciseName);
                            const exercise = new LoggedExercisePerWorkout();
                            exercise.setLoggedExerciseName(value.LoggedExerciseName);
                            exercise.setLoggedBandcolor(value.LoggedBandColor);
                            exercise.setReps(value.Reps);
                            exercise.setPartialReps(value.PartialReps);
                            console.log(exercise.getLoggedExerciseName());
                            //add item
                            arr.push(exercise);
                            console.log(arr.length);
                        });
                        setLoggedExercisesForWorkoutArr(arr);
                    }
                })
                .catch(ex => console.error(ex));
            fetchData();
        } catch (ex) {
            console.log(ex);
        }


    }, [WorkoutSessionID, []]); //fire on initial access and every time WorkoutSessionID changes

    useEffect(() => {
        console.log("exercise array length is -> " + loggedExercisesForWorkoutArr.length);
    }, [loggedExercisesForWorkoutArr, []]);

    return (
        <SafeAreaView style={WorkoutInfoScreenStyles.container}>

            <Text>Workout Information {"\n"}Workout Session: {WorkoutSessionID} {"\n"}Trainee: {username} {"\n\n"}</Text>
            <View>
                <Text style={WorkoutInfoScreenStyles.header}>Exercises</Text>
            </View>
            <FlatList
                data={Array.from(loggedExercisesForWorkoutArr.values())}
                keyExtractor={(item) => item.getLoggedExerciseName()}




                renderItem={({ item }) => (
                    <ExerciseSegments
                        LoggedWorkoutSessionID={WorkoutSessionID}
                        LoggedExerciseName={item.getLoggedExerciseName()}
                        LoggedBandColor={item.getLoggedBandcolor()}
                        Reps={item.getReps()}
                        PartialReps={item.getPartialReps()}
                    />

                )} />


        </SafeAreaView>

    )
}

export default WorkoutInfoScreen;