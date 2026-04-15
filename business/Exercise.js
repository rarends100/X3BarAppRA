"use strict";

class Exercise {
    #exerciseName
    #workoutID
    #exerciseVideoLink

    setExerciseName(exerciseName){
        this.#exerciseName = exerciseName;
    }

    setWorkoutID(workoutID){
        this.setWorkoutID = workoutID;
    }

    setExerciseVideoLink(videoLink){
        this.setExerciseVideoLink = videoLink;
    }

    getExerciseName(){
        return this.#exerciseName;
    }

    getWorkoutID(){
        return this.#workoutID;
    }

    getExerciseVideoLink(){
        return this.#exerciseVideoLink;
    }
}