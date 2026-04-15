import { Animated, KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { useSQLiteContext } from 'expo-sqlite';

import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';

import WorkoutSession from '@/business/WorkoutSession';

import WorkoutSegments from "@/components/workout-segments";
import { fetchWorkoutSessionsByUserIDAsync } from "@/database/WorkoutDB";

const workoutListScreen = () => {
    const db = useSQLiteContext();

    const [loggedWorkoutsMap, setLoggedWorkoutsMap] = useState(new Map<Number, WorkoutSession>()); //

    const { userID, role, username } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        try {
            fetchWorkoutSessionsByUserIDAsync(db, userID)
                .then(data => {
                    const map = new Map<Number, WorkoutSession>(); https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
                    data?.map(value => {
                        /*console.log("workouts retrieved -> \n\tWorkoutSessionID: " + value.LoggedWorkoutSessionID
                            + " Date: " + value.WorkoutDate
                        );*/
                        //variablalize the data
                        const workoutSessionID = value.LoggedWorkoutSessionID;
                        const workoutID = value.WorkoutID
                        const userID = value.UserID;

                        try {
                            const workoutDate : Date = new Date(value.WorkoutDate);
                            const workoutSession = new WorkoutSession(workoutSessionID, workoutID, userID, workoutDate);
                            map.set(workoutSession.getworkoutSessionID(), workoutSession);
                        }catch(ex){
                            console.error("workout-list-screen -> \n\t" + ex)
                        }

                        
                    });
                    setLoggedWorkoutsMap(map);
                })
                .catch(ex => console.log("issue retrieving workouts by userID in workoutListScreen -> \n\terror: " + ex))
        } catch (ex) {
            console.error(ex);
        }
    }, []);

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Text>{"Username: " + username + "\n" + "Role: " + role}</Text>
                    </View>
                    <View>
                        <Text>Workout Sessions</Text>
                    </View>
                    <View>
                        {Array.from(loggedWorkoutsMap.entries()).map(([key, value]) => (
                            <WorkoutSegments
                                WorkoutSessionID={key}
                                WorkoutID={value.getWorkoutID()}
                                workoutDate={value.getSessionDate()}
                            />
                        ))}
                    </View>
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default workoutListScreen;