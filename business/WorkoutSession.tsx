"use strict"

import LoggedExercisePerWorkout from "./LoggedExercisePerWorkout";

class WorkoutSession {
    #workoutSessionID: any;
    #workoutID: string = "";
    #userID: string = "";
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

    addExerciseFromWorkout(ExercisesForWorkout: LoggedExercisePerWorkout){
        this.#ExercisesForWorkout?.push(ExercisesForWorkout);
    }

}