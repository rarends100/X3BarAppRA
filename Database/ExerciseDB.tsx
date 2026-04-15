"use strict";

import { SQLiteDatabase } from "expo-sqlite";
import { Alert } from "react-native";

import { iExercise } from "@/Interfaces/iExerciseInterface";
import { iLoggedExercisePerWorkout } from "@/Interfaces/iLoggedExercisePerWorkout";

const insertExercise = (db: SQLiteDatabase,) => {
    Alert
}
/**
 * Returns an array JSON db obj rows by their workout ID.
 * A row can then be translated to a Exercise obj.
 * @param db 
 * @returns iExercise JSON | undefined
 */ 
export const fetchArrOfExercises = async (db: SQLiteDatabase, workout: string) => { //https://docs.expo.dev/versions/latest/sdk/sqlite/#getallasyncsource-params
    
    try {
        const allRows = await db.getAllAsync<iExercise>(
            `SELECT ExerciseName, WorkoutID, ExerciseVideoLink
             FROM Exercise e
             WHERE e.WorkoutID = ?;
             ORDER BY ExerciseName ASC`,
             [workout]
        );
        
        allRows.map((notUsed,index,row) => 
            {
               console.log("exercise: " + row[index].ExerciseName);
            })
          return allRows;  
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}

/**
 * Gets all exercises for a workout session.
 * @param db 
 * @param WorkoutSessionID 
 * @returns allRows: {
        LoggedWorkoutSessionID: string;
        loggedExerciseName: string;
        loggedBandColor: string;
        reps: Int32Array<ArrayBufferLike>;
        partialReps: Int32Array;
    }[]
 */
export const fetchExercisesByWorkoutSessionIDAsync = async (db: SQLiteDatabase, WorkoutSessionID: string) => {
    //TODO: fill in functionalty
    
    try {
        const allRows = await db.getAllAsync<iLoggedExercisePerWorkout>(
            `SELECT LoggedWorkoutSessionID, LoggedExerciseName, LoggedBandColor, reps, partialReps 
             FROM LoggedExercisesPerWorkout
             WHERE LoggedWorkoutSessionID = 2;`,
             WorkoutSessionID
        );

        allRows.map((value) => {
            console.log(".fetchExercisesByWorkoutSessionIDAsync() -> \n\texercise: " 
                + value.loggedExerciseName)
        });
        return allRows;
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}