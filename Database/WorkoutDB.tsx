"use strict";

import { SQLiteDatabase } from "expo-sqlite";
import { Alert } from "react-native";

const insertWorkout = (db:SQLiteDatabase, workout: Workout) => {
    Alert.alert("TODO make functions to insert workouts on button press")
}

/**
 * returns an array of JSON obj containing array of strings of workoutID's in ascending order. With the ID being a string.
 * @param db 
 * @returns string[][]
 */
export const fetchJSONArrAvailableWorkoutTypes = async (db: SQLiteDatabase) => { //https://docs.expo.dev/versions/latest/sdk/sqlite/#getallasyncsource-params
    
    try {
        const allRows = await db.getAllAsync<any>(
            `SELECT w.WorkoutID 
             FROM Workout AS w 
             ORDER BY w.WorkoutID ASC;`,
        );
        
        allRows.map((value) => 
            {
               console.log("exercise: " +value)
            });
          return allRows;  
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}