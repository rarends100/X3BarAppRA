"use strict"

import LoggedExercisePerWorkout from "./LoggedExercisePerWorkout";

class WorkoutSession {
    #workoutSessionID: number;
    #workoutID: string = "";
    #userID: string = "";
    #Date: Date | null = null;
    #ExercisesForWorkout: LoggedExercisePerWorkout[] | null;

    constructor(workoutSessionID: any, workoutID: any, userID: any) {
        this.#workoutSessionID = workoutSessionID;
        this.#workoutID = workoutID;
        this.#userID = userID;
        this.#ExercisesForWorkout = null;
    }

    get workoutSessionID() {
        return this.#workoutSessionID;
    }
    set workoutSessionID(workoutSessionID) {
        this.#workoutSessionID = workoutSessionID;
    }

    // Getter and Setter for #workoutID
    get workoutID() {
        return this.#workoutID;
    }
    set workoutID(workoutSessionID) {
        this.#workoutID = workoutSessionID;
    }

    // Getter and Setter for #userID
    get userID() {
        return this.#userID;
    }
    set userID(workoutSessionID) {
        this.#userID = workoutSessionID;
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