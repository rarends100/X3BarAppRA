export interface iLoggedExercisePerWorkout{
    LoggedWorkoutSessionID: number;
    LoggedExerciseName: string;
    LoggedBandColor: string;
    Reps: number;
    PartialReps: number; //Aha this was the issue all along since SQL doesn't return a typed int32Array and only returns basic js types like number, string, etc
}