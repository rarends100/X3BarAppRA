"use strict"

import LoggedExercisePerWorkout from "./LoggedExercisePerWorkout";

class WorkoutSession {
    #workoutSessionID: number;
    #workoutID: string | null;
    #userID: number | null;
    #Date: Date | null;
    #ExercisesForWorkout: LoggedExercisePerWorkout[] | null;

    constructor(workoutSessionID: number = -1, //default constructor
        workoutID: string | null = null, userID: number | null = null, Date : Date | null = null) {
        this.#workoutSessionID = workoutSessionID;
        this.#workoutID = workoutID;
        this.#userID = userID;
        this.#Date = Date;
        this.#ExercisesForWorkout = null;
    }

    getworkoutSessionID() {
        return this.#workoutSessionID;
    }
    setworkoutSessionID(workoutSessionID: number) {
        this.#workoutSessionID = workoutSessionID;
    }

    // Getter and Setter for #workoutID
    getWorkoutID() {
        return this.#workoutID;
    }
    setworkoutID(workoutID: string) {
        this.#workoutID = workoutID;
    }

    // Getter and Setter for #userID
    getUserID() {
        return this.#userID;
    }
    setUserID(userID: number) {
        this.#userID = userID;
    }

    getExercisesForWorkout(){
        return this.#ExercisesForWorkout;
    }

    setExercisesForWorkout(ExercisesForWorkout : LoggedExercisePerWorkout[]){
        this.#ExercisesForWorkout = ExercisesForWorkout
    }

    getSessionDate(){
        return this.#Date;
    }

    setSessionDate(Date: Date){ //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
        this.#Date = Date;
    }

    

    addExerciseFromWorkout(ExercisesForWorkout: LoggedExercisePerWorkout){
        this.#ExercisesForWorkout?.push(ExercisesForWorkout);
    }

}

export default WorkoutSession;