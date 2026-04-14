"use strict";

import { SQLiteDatabase } from "expo-sqlite";
import { Alert } from "react-native";

import { iExercise } from "@/Interfaces/iExerciseInterface";

const insertExercise = (db: SQLiteDatabase,) => {
    Alert
}
/**
 * Returns an array JSON db obj rows by their workout ID.
 * A row can then be translated to a Exercise obj.
 * @param db 
 * @returns JSON
 */ 
export const fetchArrOfExercises = async (db: SQLiteDatabase, workout: string) => { //https://docs.expo.dev/versions/latest/sdk/sqlite/#getallasyncsource-params
    
    try {
        const allRows = await db.getAllAsync<iExercise>(
            `SELECT ExerciseName, WorkoutID, ExerciseVideoLink
             FROM Exercise e
             WHERE e.WorkoutID = ?;`,
             [workout]
        );
        
        allRows.map(row => 
            {
               console.log("exercise: " + row.ExerciseName);
            })
          return allRows;  
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}