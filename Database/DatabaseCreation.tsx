'use strict';
/**
 * This function is responsible for creating the initial database if it does not exist.
 */
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let {user_version: currentDbVersion} : any = await db.getFirstAsync<{
    user_version: number;
  }>('PRAGMA user_version');
    if (currentDbVersion >= DATABASE_VERSION){
      console.log('Database is current and already exists');
      return;
    }
    if (currentDbVersion === 0) {
      try{
        await db.execAsync(`
              PRAGMA journal_mode = 'wal';
              PRAGMA foreign_keys = ON;

              /*User tables*/
              CREATE TABLE IF NOT EXISTS User(
                 UserID INTEGER PRIMARY KEY AUTOINCREMENT
                ,Username TEXT NOT NULL UNIQUE
                ,Email TEXT NOT NULL
                ,Password TEXT NOT NULL
                ,FirstName TEXT NOT NULL
                ,LastName TEXT NOT NULL
              );

              CREATE TABLE IF NOT EXISTS UserRole(
                 Role TEXT NOT NULL
                ,UserID INTEGER NOT NULL
                ,FOREIGN KEY(UserID) REFERENCES Users(UserID)
              );
              
              /*Workout tables*/
              CREATE TABLE IF NOT EXISTS BandLevel(
                BandColor TEXT PRIMARY KEY
               ,BandMinResistanceInLbs REAL NOT NULL
               ,BandMaxResistanceInLbs REAL NOT NULL 
              );

              CREATE TABLE IF NOT EXISTS Workout( /*Note -> Workouts work in a succession order or A, B, C, etc*/
                WorkoutID TEXT PRIMARY KEY
               ,WorkoutDescription TEXT
              );

              CREATE TABLE IF NOT EXISTS Exercise(
                ExerciseName TEXT 
               ,WorkoutBelongingTo TEXT 
               ,ExerciseDescription TEXT
               ,PRIMARY KEY(ExerciseName, WorkoutBelongingTo)
               ,FOREIGN KEY(WorkoutBelongingTo) REFERENCES Workout(WorkoutID)
              );

              /*records*/
              CREATE TABLE IF NOT EXISTS WorkoutSessionLog( /*Workout session logger step 1*/
                LoggedWorkoutID ID
               ,LoggedUserID INTEGER 
               ,PRIMARY KEY(LoggedUserID)
               ,FOREIGN KEY(LoggedUserID) REFERENCES User(UserID)
               );

              CREATE TABLE IF NOT EXISTS LoggedExercisesPerWorkout( /*Workout session logger step 2*/
                LoggedWorkoutID INTEGER 
               ,LoggedExerciseName TEXT
               ,LoggedBandColor TEXT 
               ,PRIMARY KEY(LoggedWorkoutID, LoggedExerciseName, LoggedBandColor)
               ,FOREIGN KEY(LoggedWorkoutID) REFERENCES WorkoutSessionLog(LoggedWorkoutID)
               ,FOREIGN KEY(LoggedExerciseName) REFERENCES Exercise(ExerciseName)
               ,FOREIGN KEY(LoggedBandColor) REFERENCES BandLevel(Bandcolor)

              );

              CREATE TABLE IF NOT EXISTS Messages(
                senderUserID INTEGER NOT NULL
               ,recieverUserID INTEGER NOT NULL
               ,messageText TEXT 
               ,Date DATETIME NOT NULL
               ,PRIMARY KEY(senderUserID, recieverUserID)
               ,FOREIGN KEY(senderUserID) REFERENCES User(UserID)
               ,FOREIGN KEY(recieverUserID) REFERENCES User(UserID)
              );

              CREATE TABLE IF NOT EXISTS Logs(
                LoggedUsername TEXT NOT NULL
               ,DateLogged DATETIME NOT NULL
               ,LoggedAction TEXT NOT NULL
               ,Notes TEXT
               ,PRIMARY KEY(LoggedUsername, DateLogged)
              );

              

              INSERT INTO Users
              (UserName, Password, FirstName, LastName)
              VALUES
              ('Apple', '$2b$10$8t5DiypbVpEvWvs9cX/SCu911ftJ59ZRVT/zD26LOorDJIhabiHG2', 'Apple', 'Sauce' ),
              ('Geralt', '$2b$10$8t5DiypbVpEvWvs9cX/SCu911ftJ59ZRVT/zD26LOorDJIhabiHG2', 'WitcherGaralt', 'Witcher'),
              ('Samurai', '$2b$10$8t5DiypbVpEvWvs9cX/SCu911ftJ59ZRVT/zD26LOorDJIhabiHG2', 'Johny', 'Silverhand');

              /*TODO: write the remaining insert statements*/
              
          `);

          // To Professor: All preloaded users have a Plain text Password of: Password_1 
          //Apple has transactions, the other 2 do not.
          currentDbVersion = 1;
          console.log('Database tables Users and Transactions created successfully');
      }catch(ex){
          console.log('Database creation failure: ' + ex);
        }
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}