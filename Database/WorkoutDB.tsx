"use strict";

import { SQLiteDatabase } from "expo-sqlite";

import LoggedExercisePerWorkout from '@/business/LoggedExercisePerWorkout';
import { iWorkoutSession } from "@/Interfaces/iWorkoutSession";

/**
 * Inserts a workout and exercises associated to it for parameters provided from the workout screen. 
 * @param db 
 * @param workoutID 
 * @param userID 
 * @param Params rest operator type LoggedExercisesPerWorkout[]
 * @returns boolean -> true successful, false otherwise
 */
export const insertWorkoutSync = (db: SQLiteDatabase, workoutID: string, userID: any, ...Params: LoggedExercisePerWorkout[]) => {
    let success = false;
    const now = new Date().toISOString(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    try {
        const result = db.runSync(
            `INSERT INTO WorkoutSessionLog
             (WorkoutID, UserID, WorkoutDate)
             VALUES
             (?, ?, ?)`,
            [workoutID, userID, now]
        );

        console.log("New workout inserted for user " + userID + "." +
            "\nresult returned for inserted WorkoutSessionLogID: " + result.lastInsertRowId
        );
        Params.map((value) => {
            const loggedExercise = new LoggedExercisePerWorkout();
            loggedExercise.setLoggedWorkoutSessionID(result.lastInsertRowId);
            loggedExercise.setLoggedExerciseName(value.getLoggedExerciseName());
            loggedExercise.setLoggedBandcolor(value.getLoggedBandcolor());
            loggedExercise.setReps(value.getReps());
            loggedExercise.setPartialReps(value.getPartialReps());

            helperInsertWorkoutExercisesSync(db, loggedExercise);

        });

    } catch (ex) {
        console.error("WorkoutDB -> .insertWorkout() -> \nError: " + ex);
    }

}

export const deleteWorkout = (db: SQLiteDatabase, workoutSessionID: number) => {
    let success = false;

    console.log("workout session id being deleted: " + workoutSessionID);

    try{
        const result1 = db.runSync(`
            DELETE FROM
            LoggedExercisesPerWorkout
            WHERE LoggedWorkoutSessionID = ?
            `, [workoutSessionID]);

        const result2 = db.runSync(`
            DELETE FROM
            WorkoutSessionLog
            WHERE LoggedWorkoutSessionID = ?
            `, [workoutSessionID]);
        console.log("delete result1: " + result1 + "\ndelete result 2: " + result2 );

        if(result1 && result2){ //if both workouts and exercises belonging to that workout are deleted
            success = true;
        }
    }catch(ex){
        console.error("Could not delete select workout, reason -> \n\tError -> " + ex);
    }

    return success;
}

/**
 * After a workoutSessionLog is entered, this function then inserts all of the exercises to be logged 
 * for that workout.
 * @param db 
 * @param LoggedWorkoutSessionID 
 * @param Params 
 */
const helperInsertWorkoutExercisesSync = (db: SQLiteDatabase, exercise: LoggedExercisePerWorkout) => {
    let success = false;
    //console.log("\n\n\n" + Params);


    console.log(`.helperInsertWorkoutExercisesAsync() -> \n\t\tLoggedWorkoutSessionID: ${exercise.getLoggedWorkoutSessionID()}
            \n\t\tLoggedExerciseName: ${exercise.getLoggedExerciseName()}\n\t\t
            LoggedBandColor: ${exercise.getLoggedBandcolor()} \n\t\treps: ${exercise.getReps()} 
            \n\t\tpartialReps: ${exercise.getPartialReps()}`);

    const loggedWorkoutSessionID = exercise.getLoggedWorkoutSessionID();
    const loggedExerciseName = exercise.getLoggedExerciseName();
    const loggedBandColor = exercise.getLoggedBandcolor();
    const reps = exercise.getReps();
    const partialReps = exercise.getPartialReps();


    const result = db.runSync(
        `INSERT INTO LoggedExercisesPerWorkout
                (LoggedWorkoutSessionID, LoggedExerciseName, LoggedBandColor, Reps, PartialReps)
                    VALUES
                (?, ?, ?, ?, ?)`,
        [loggedWorkoutSessionID, loggedExerciseName, loggedBandColor, reps, partialReps]
    );
    console.log('.helperInsertWorkoutExercisesAsync() -> result value -> ' + result);

    success = true;
    //throw new TypeError(".helpterInserworkoutExersisesSync -> Issue with helper inserting the exercises.");

}

/**
 * returns an array of JSON obj containing array of strings of workoutID's in ascending order. With the ID being a string.
 * @param db 
 * @returns [][]
 */
export const fetchJSONArrAvailableWorkoutTypes = async (db: SQLiteDatabase) => { //https://docs.expo.dev/versions/latest/sdk/sqlite/#getallasyncsource-params
    //NOTE to self: If issues persist may need to rework to sync 
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

/**
 * Gets all workout Sessions for a given user by userID.
 * @param db 
 * @returns allRows: {
        LoggedWorkoutSessionID: number;
        WorkoutID: string;
        UserID: number;
    }[]
 */
export const fetchWorkoutSessionsByUserIDAsync = async (db: SQLiteDatabase, userID: any) => {
    //TODO: fill in functionalty

    try {
        const allRows = await db.getAllAsync<iWorkoutSession>(
            `SELECT LoggedWorkoutSessionID , WorkoutID, UserID, WorkoutDate 
             FROM WorkoutSessionLog 
             WHERE userID = ?;`,
            userID
        );

        allRows.map((value) => {
            console.log(".fetchWorkoutSessionsAsync() -> \nworkoutSessionID: "
                + value.LoggedWorkoutSessionID + " workout date: " + value.WorkoutDate);
        });
        return allRows;
    } catch (ex) {
        console.error("Exercise DB -> .fetchArrOfExercises() -> \nException: " + ex);
    }
}