"use strict";

import { SQLiteDatabase } from "expo-sqlite";

import { iExercise } from "@/Interfaces/iExerciseInterface";
import { iLoggedExercisePerWorkout } from "@/Interfaces/iLoggedExercisePerWorkout";


/**
 * Returns an array JSON db obj rows by their workout ID.
 * A row can then be translated to a Exercise obj.
 * @param db 
 * @returns iExercise JSON | undefined
 */ 
export const fetchArrOfExercises = (db: SQLiteDatabase, workout: string) => { //https://docs.expo.dev/versions/latest/sdk/sqlite/#getallasyncsource-params
    
    try {
        const allRows = db.getAllSync<iExercise>(
            `SELECT ExerciseName, WorkoutID, ExerciseVideoLink
             FROM Exercise e
             WHERE e.WorkoutID = ?;
             ORDER BY ExerciseName ASC`,
             [workout]
        );
        
        allRows.forEach(element => { 
           
               console.log("exercise: " + element.ExerciseName );
    });
          return allRows;  
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}

/**
 * Gets all exercises for a workout session. Orders by ExerciseName.
 *       Supply optional param 'orderBool' with false for ASC, true for DESC.
 *       Default order is ASC
 * @param db 
 * @param WorkoutSessionID number
 * @param orderBool boolean
 * @returns allRows: {
        LoggedWorkoutSessionID: string;
        loggedBandColor: string;
        reps: Int32Array<ArrayBufferLike>;
        partialReps: Int32Array;
    }[]
 */
export const fetchExercisesByWorkoutSessionIDSync = (db: SQLiteDatabase, WorkoutSessionID: number, orderBool: boolean = false) => {
    //TODO: fill in functionalty
    console.log("in .fetchExercisesByWorkoutSessionIDAsync() | sessionID is: " + WorkoutSessionID);
    let order;
    orderBool === false? order = "ASC" : order = "DESC";

    try {
        console.log("in .fetchExercisesByWorkoutSessionIDAsync() try/catch");
        const query =  `SELECT LoggedWorkoutSessionID, LoggedExerciseName, LoggedBandColor, reps, partialReps 
                        FROM LoggedExercisesPerWorkout
                        WHERE LoggedWorkoutSessionID = ?
                        ORDER BY LoggedExerciseName ${order};`
             
        const allRows =  db.getAllSync<iLoggedExercisePerWorkout>(query, [WorkoutSessionID]);
             
        console.log("data rows fetched -> " + allRows.length)
  
        return allRows;
    } catch (ex) {
        //console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
        throw new TypeError("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}