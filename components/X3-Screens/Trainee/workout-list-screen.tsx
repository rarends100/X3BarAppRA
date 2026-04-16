import { Animated, KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { useSQLiteContext } from 'expo-sqlite';

import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';

import WorkoutSession from '@/business/WorkoutSession';

import WorkoutSegments from "@/components/workout-segments";
import { fetchWorkoutSessionsByUserIDAsync } from "@/database/WorkoutDB";

const workoutListScreen = () => { //https://stackoverflow.com/questions/42261505/getting-error-message-li-key-is-not-a-prop -> key  and ref are special props that exist in every React component regardless of if you define them or not
    const db = useSQLiteContext();

    const [loggedWorkoutsMap, setLoggedWorkoutsMap] = useState(new Map<number, WorkoutSession>()); //

    const { userID, role, username } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        try {
            fetchWorkoutSessionsByUserIDAsync(db, userID)
                .then(data => {
                    const map = new Map<number, WorkoutSession>(); https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
                    data?.forEach(value => {
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
                            console.log("workout session object -> " + workoutSession.getWorkoutSessionID());
                            map.set(workoutSession.getWorkoutSessionID(), workoutSession);
                        }catch(ex){
                            console.error("workout-list-screen -> \n\t" + ex)
                        }

                        
                    });
                    setLoggedWorkoutsMap(map); //https://www.geeksforgeeks.org/reactjs/how-to-use-es6-map-with-react-state-hooks/
                    console.log(map.size);
                    map.forEach((value, key) => {
                        console.log("workoutListScreen non state map -> Key is: " + key + "Workout is: " + value.getWorkoutID()); //TODO: solve this bug, not printing key and not working
                    });
                })
                .catch(ex => console.log("issue retrieving workouts by userID in workoutListScreen -> \n\terror: " + ex))
        } catch (ex) {
            console.error(ex);
        }
    }, []);

    useEffect(() => {
        loggedWorkoutsMap.forEach((value, key) => {
            console.log("state map key: " + key + " " + "workoutSessionID: " + value.getWorkoutSessionID() )
        },[loggedWorkoutsMap]);
    });

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
                                key={key}
                                workoutsessionID={value.getWorkoutSessionID()}
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