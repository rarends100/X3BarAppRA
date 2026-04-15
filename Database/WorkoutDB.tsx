"use strict";

import { SQLiteDatabase } from "expo-sqlite";

import LoggedExercisePerWorkout from '@/business/LoggedExercisePerWorkout';

/**
 * Inserts a workout and exercises associated to it for parameters provided from the workout screen. 
 * @param db 
 * @param workoutID 
 * @param userID 
 * @param Params rest operator type LoggedExercisesPerWorkout[]
 * @returns boolean -> true successful, false otherwise
 */
export const insertWorkoutAsync = async (db: SQLiteDatabase, workoutID: string, userID: any, ...Params: LoggedExercisePerWorkout[]) => {
    let success = false;
    const now = new Date().toISOString(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    try {
        const result = await db.runAsync(
            `INSERT INTO WorkoutSessionLog
             (WorkoutID, UserID, WorkoutDate)
             VALUES
             (?, ?, ?)`,
            [workoutID, userID, now]
        );

        console.log("New workout inserted for user " + userID + "." +
            "\nresult returned for inserted WorkoutSessionLogID: " + result.lastInsertRowId
        );
        Params.map(value => {
            value.setLoggedWorkoutSessionID(result.lastInsertRowId);
        });
        helperInsertWorkoutExercisesAsync(db, ...Params)
        .then(data => {success = true})
        .catch(ex => console.error(ex));
    } catch (ex) {
        console.error("WorkoutDB -> .insertWorkout() -> \nError: " + ex);
    } finally {
        return success;
    }

}

/**
 * After a workoutSessionLog is entered, this function then inserts all of the exercises to be logged 
 * for that workout.
 * @param db 
 * @param LoggedWorkoutSessionID 
 * @param Params 
 */
export const helperInsertWorkoutExercisesAsync = async (db: SQLiteDatabase, ...Params: LoggedExercisePerWorkout[]) => {
    let success = false;
    //console.log("\n\n\n" + Params);
    Params.map((value) => {
        //console.log("helperInserWorkoutExercisesAsync " + value.LoggedExerciseName);
        const LoggedExerciseName = value.getLoggedExerciseName();
        const LoggedBandColor = value.getLoggedBandcolor();
        const reps = value.getReps();
        const partialReps = value.getPartialReps();
        const LoggedWorkoutSessionID = value.getLoggedWorkoutSessionID();

        console.log(`LoggedWorkoutSessionID: ${LoggedWorkoutSessionID}\nLoggedExerciseName: ${LoggedExerciseName}\n
                    LoggedBandColor: ${LoggedBandColor} \nreps: ${reps} \npartialReps: ${partialReps}`);
        try {
            async () => {
                await db.runAsync(
                    `INSERT INTO LoggedExercisesPerWorkout
                    (LoggedWorkoutSessionID, LoggedExerciseName, LoggedBandColor, reps, partialReps)
                     VALUES
                    (?, ?, ?, ?, ?)`,
                    [LoggedWorkoutSessionID, LoggedExerciseName, LoggedBandColor, reps, partialReps]
                );}
                success = true;
            }catch(ex){
                console.log(".helperInsertWorkoutExercisesAsync() -> \n\tError: " + ex);
                success = false;
            }
    });
    console.log(success);
    return success;
   
}

/**
 * returns an array of JSON obj containing array of strings of workoutID's in ascending order. With the ID being a string.
 * @param db 
 * @returns [][]
 */
export const fetchJSONArrAvailableWorkoutTypes = async (db: SQLiteDatabase) => { //https://docs.expo.dev/versions/latest/sdk/sqlite/#getallasyncsource-params

    try {
        const allRows = await db.getAllAsync<any>(
            `SELECT w.WorkoutID 
             FROM Workout AS w 
             ORDER BY w.WorkoutID ASC;`,
        );

        allRows.map((value) => {
            console.log("exercise: " + value)
        });
        return allRows;
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}