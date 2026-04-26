import { KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCallback, useEffect, useState } from "react";

import { useSQLiteContext } from 'expo-sqlite';

import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';

import WorkoutSession from '@/business/WorkoutSession';

import { workoutListStyle } from "@/styles";

import WorkoutSegments from "@/components/workout-segments";
import { fetchWorkoutSessionsByUserIDAsync } from "@/database/WorkoutDB";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const workoutListScreen = () => { //https://stackoverflow.com/questions/42261505/getting-error-message-li-key-is-not-a-prop -> key  and ref are special props that exist in every React component regardless of if you define them or not
    const db = useSQLiteContext();

    const [loggedWorkoutsMap, setLoggedWorkoutsMap] = useState(new Map<number, WorkoutSession>()); //

    const { userID, role, username } = useSelector((state: RootState) => state.auth);
    
    useFocusEffect( //This makes it so whenever the screen is focused the logic inside is called
        useCallback(() => { //This is necessary to provide or it will continuously call the contained logic while screen is active
        try {
            fetchWorkoutSessionsByUserIDAsync(db, userID)
                .then(data => {
                    const workoutSessionMap = new Map<number, WorkoutSession>(); https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
                    data?.forEach((value) => {
                        /*console.log("workouts retrieved -> \n\tWorkoutSessionID: " + value.LoggedWorkoutSessionID
                            + " Date: " + value.WorkoutDate
                        );*/
                        //variablalize the data
                        const workoutSessionID = value.LoggedWorkoutSessionID;
                        const workoutID = value.WorkoutID
                        const userID = value.UserID;

                        try {
                            const workoutDate: Date = new Date(value.WorkoutDate);
                            const workoutSession = new WorkoutSession(workoutSessionID, workoutID, userID, workoutDate);
                            console.log("workout session object -> " + workoutSession.getWorkoutSessionID());
                            workoutSessionMap.set(workoutSession.getWorkoutSessionID(), workoutSession);
                        } catch (ex) {
                            console.error("workout-list-screen -> \n\t" + ex)
                        }


                    });
                    setLoggedWorkoutsMap(workoutSessionMap); //https://www.geeksforgeeks.org/reactjs/how-to-use-es6-map-with-react-state-hooks/
                    console.log(workoutSessionMap.size);
                    workoutSessionMap.forEach((value, key) => {
                        console.log("workoutListScreen non state map -> Key is: " + key + "Workout is: " + value.getWorkoutID()); //TODO: solve this bug, not printing key and not working
                    });
                })
                .catch(ex => console.log("issue retrieving workouts by userID in workoutListScreen -> \n\terror: " + ex))
        } catch (ex) {
            console.error(ex);
        }
    }, []));

    useEffect(() => {
        loggedWorkoutsMap.forEach((value, key) => {
            console.log("state map key: " + key + " " + "workoutSessionID: " + value.getWorkoutSessionID())
        }, [loggedWorkoutsMap]);
    });
    //changed to FlatList component from scroll view so that only the currently in view list items are rendered. 
    // determined Animated.ScrollView wasn't right here because it renders everything at once and would likely later lead to lagging
    return (
        <SafeAreaView style={workoutListStyle.container}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <FlatList
                    data={Array.from(loggedWorkoutsMap.values())}
                    keyExtractor={(item) => item.getWorkoutSessionID().toString()}

                    ListHeaderComponent={
                        <View>
                            <Text style={workoutListStyle.userInfo}>{"Username: " + username + "\n" + "Role: " + role + "\n"}</Text>
                            <Text style={workoutListStyle.heading} >Workout Sessions</Text>
                        </View>
                    }

                    renderItem={({ item }) => (
                        <View>
                            <WorkoutSegments
                                key={item.getWorkoutSessionID()}
                                workoutsessionID={item.getWorkoutSessionID()}
                                WorkoutID={item.getWorkoutID()}
                                workoutDate={item.getSessionDate()}
                                textStyle={workoutListStyle.item}
        
                            />
                        </View>
                    )}

                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default workoutListScreen;