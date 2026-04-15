"use strict";

class LoggedExercisePerWorkout{
    #loggedWorkoutSessionID;
    #loggedExerciseName;
    #loggedBandColor;
    #reps;
    #partialReps;
    #workoutDate;

    constructor(){
       this.#loggedWorkoutSessionID = null;
       this.#loggedExerciseName = null;
       this.#loggedBandColor = null;
       this.#reps = null;
       this.#partialReps = null;
    }

    setLoggedWorkoutSessionID(loggedWorkoutSessionID){
        this.#loggedWorkoutSessionID = loggedWorkoutSessionID;
    }

    setLoggedExerciseName(loggedExerciseName){
        this.#loggedExerciseName = loggedExerciseName;
    }

    setLoggedBandcolor(loggedBandColor){
        this.#loggedBandColor = loggedBandColor;
    }

    setReps(reps){
        this.#reps = reps;
    }

    setPartialReps(partialReps){
        this.#partialReps = partialReps;
    }

    setWorkoutDate(workoutDate){
        this.#workoutDate = workoutDate;
    }

    getLoggedWorkoutSessionID(){
        return this.#loggedWorkoutSessionID;
    }

    getLoggedExerciseName(){
        return this.#loggedExerciseName;
    }

    getLoggedBandcolor(){
        return this.#loggedBandColor;
    }

    getReps(){
        return this.#reps;
    }

    getPartialReps(){
        return this.#partialReps;        
    }

    getWorkoutDate(){
        return this.#workoutDate;
    }
}

export default LoggedExercisePerWorkout;