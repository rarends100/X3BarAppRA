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
                ,EmployeeID Text
                ,Points INTEGER --plan is to add the ability for trainees to get points to purchase things, if I get that far...
              );

              CREATE TABLE IF NOT EXISTS UserRole(
                 Role TEXT NOT NULL
                ,UserID INTEGER NOT NULL
                ,PRIMARY KEY(Role, UserID)
                ,FOREIGN KEY(UserID) REFERENCES User(UserID)
              );
              
              /*Workout tables*/
              CREATE TABLE IF NOT EXISTS BandLevel(
                BandColor TEXT PRIMARY KEY
               ,BandSingledMinResistanceInLbs INTEGER NOT NULL
               ,BandSingledMaxResistanceInLbs INTEGER NOT NULL
               ,BandDoubledResistanceInLbs INTEGER NOT NULL
              );

              CREATE TABLE IF NOT EXISTS Workout( /*Note -> Workouts work in a succession order or A, B, C, etc*/
                WorkoutID TEXT PRIMARY KEY
               ,WorkoutDescription TEXT
              );

              CREATE TABLE IF NOT EXISTS Exercise(
                ExerciseName TEXT 
               ,WorkoutID TEXT 
               ,ExerciseVideoLink TEXT
               ,PRIMARY KEY(ExerciseName)
               ,FOREIGN KEY(WorkoutID) REFERENCES Workout(WorkoutID)
              );

              /*records*/
              CREATE TABLE IF NOT EXISTS WorkoutSessionLog( /*Workout session logger step 1*/
                LoggedWorkoutSessionID INTEGER
               ,WorkoutID TEXT 
               ,UserID INTEGER 
               ,PRIMARY KEY(LoggedWorkoutSessionID)
               ,FOREIGN KEY(UserID) REFERENCES User(UserID)
               ,FOREIGN KEY(WorkoutID) REFERENCES Workout(WorkoutID)
               );

               CREATE TABLE IF NOT EXISTS LoggedExercisesPerWorkout( /*Workout session logger step 2*/
                 LoggedWorkoutSessionID INTEGER 
                ,LoggedExerciseName TEXT
                ,LoggedBandColor TEXT 
                ,reps INTEGER
                ,partialReps INTEGER
                ,PRIMARY KEY(LoggedWorkoutSessionID, LoggedExerciseName, LoggedBandColor)
                ,FOREIGN KEY(LoggedWorkoutSessionID) REFERENCES WorkoutSessionLog(LoggedWorkoutSessionID)
                ,FOREIGN KEY(LoggedExerciseName) REFERENCES Exercise(ExerciseName)
                ,FOREIGN KEY(LoggedBandColor) REFERENCES BandLevel(Bandcolor)
              );

              CREATE TABLE IF NOT EXISTS Messages(
                senderUserID INTEGER NOT NULL
               ,recieverUserID INTEGER NOT NULL
               ,messageText TEXT 
               ,messageDate DATETIME NOT NULL
               ,PRIMARY KEY(senderUserID, recieverUserID)
               ,FOREIGN KEY(senderUserID) REFERENCES User(UserID)
               ,FOREIGN KEY(recieverUserID) REFERENCES User(UserID)
              );

              CREATE TABLE IF NOT EXISTS Logs(
                LoggedUsername TEXT
               ,LoggedAction TEXT 
               ,LogDate DATETIME 
               ,Notes TEXT
               ,PRIMARY KEY(LoggedUsername, LogDate, LoggedAction)
              );

              
              /*SAMPLE DATA INSERTS*/

              INSERT INTO User
              (UserName, Email, Password, FirstName, LastName)
              VALUES
              ('Geralt', 'remail1234@email.com', '$2b$10$8t5DiypbVpEvWvs9cX/SCu911ftJ59ZRVT/zD26LOorDJIhabiHG2', 'WitcherGaralt', 'Witcher'),
              ('Orange', 'remail1234@email.com', '$2b$10$8t5DiypbVpEvWvs9cX/SCu911ftJ59ZRVT/zD26LOorDJIhabiHG2', 'Orange', 'Winter'),
              ('Samurai', 'remail1234@email.com', '$2b$10$8t5DiypbVpEvWvs9cX/SCu911ftJ59ZRVT/zD26LOorDJIhabiHG2', 'Johny', 'Silverhand');

              INSERT INTO UserRole
              (UserID, Role)
              VALUES
              (1, 'ADMIN'),
              (2, 'Trainee'),
              (3, 'Trainee');  

              INSERT INTO BandLevel
              (BandColor, BandSingledMinResistanceInLbs, BandSingledMaxResistanceInLbs, BandDoubledResistanceInLbs)
              VALUES
              ('white', 10, 50, 100),
              ('light grey', 25, 80, 160),
              ('grey', 50, 120, 240),
              ('black', 60, 150, 300),
              ('Orange Elite', 110, 300, 600); /*the max single resistance is the min doubled resistance*/

              INSERT INTO Workout
              (WorkoutID, workoutDescription)
              VALUES
              ('A', 'Push Day'),
              ('B', 'Pull Day');

              INSERT INTO Exercise
              (ExerciseName, WorkoutID)
              VALUES
              ('chest press', 'A'),
              ('over head press', 'A'),
              ('front squat', 'A'),
              ('tricep press', 'A'),
              ('dead lift', 'B'),
              ('bent over row', 'B'),
              ('bicep curl', 'B'),
              ('calf raises', 'B');

              INSERT INTO WorkoutSessionLog
              (loggedworkoutSessionid, userid, workoutid)
              VALUES
              (1, 2, 'A'),
              (2, 3, 'B');

              INSERT INTO LoggedExercisesPerWorkout
              (loggedworkoutSessionid, loggedexercisename, loggedbandcolor, reps, partialreps)
              VALUES
              (1, 'chest press', 'black', 20, 3),
              (1, 'over head press', 'light grey', 20, 5),
              (1, 'front squat', 'grey', 20, 5 ),
              (1, 'tricep press', 'black', 20, 5),
              (2, 'dead lift', 'grey', 20, 4),
              (2, 'bent over row', 'light grey', 20, 10),
              (2, 'bicep curl', 'light grey', 15, 5),
              (2, 'calf raises', 'grey', 20, 3);

              INSERT INTO Messages (senderUserID, recieverUserID, messageText, messageDate) VALUES
              (1, 2, 'Hello, how are you doing today?', '2026-03-12 10:00:00'),
              (2, 1, 'I am doing great, thanks for asking!', '2026-03-12 10:05:00'),
              (1, 3, 'Reminder: Train hard!.', '2026-03-12 11:30:00'),
              (3, 1, 'Got the reminder, I plan to!', '2026-03-12 11:35:00'),
              (2, 3, 'Can you review my workout?', '2026-03-12 14:00:00'),
              (3, 2, 'Sure, I''ll take a look and critique it.', '2026-03-12 14:10:00');

              /*Multiple logs per user with different actions and timestamps (to satisfy the PRIMARY KEY)*/
              INSERT INTO Logs (LoggedUsername, LoggedAction, LogDate, Notes) VALUES
              ('Orange', 'LOGIN', '2026-03-12 09:00:00', 'Successful login from IP 192.168.1.100'),
              ('Geralt', 'MESSAGE_SENT', '2026-03-12 10:00:00', 'Sent message to user 2'),
              ('Geralt', 'LOGOUT', '2026-03-12 17:00:00', 'Session ended normally'),
              ('Samurai', 'LOGIN', '2026-03-12 09:15:00', 'Successful login from mobile device'),
              ('Orange', 'MESSAGE_SENT', '2026-03-12 10:05:00', 'Replied to message from user 1'),
              ('Samurai', 'LOGIN', '2026-03-12 14:00:00', 'Successful login from pc'),
              ('Geralt', 'LOGIN', '2026-03-12 10:30:00', 'Admin login with elevated privileges'),
              ('Samurai', 'MESSAGE_SENT', '2026-03-12 11:35:00', 'Replied to message from user 1'),
              ('Geralt', 'BACKUP_CREATED', '2026-03-12 16:45:00', 'Workout DATABASE Data backed up successfully');

              /*TODO: if any 1.indexes, 2.views, or 3.stored procedures are needed designate them here in
                      the order listed. */
          `);
          // link to query db fast and easy https://sqliteonline.com/

          // To Glenn: All preloaded users have a Plain text Password of: Password_1 
          currentDbVersion = 1;
          console.log('Database tables created successfully');
      }catch(ex){
          console.log('Database creation failure: ' + ex);
        }
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}