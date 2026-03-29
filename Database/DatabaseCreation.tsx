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
                ,UserName TEXT NOT NULL UNIQUE
                ,Email TEXT NOT NULL
                ,Credential TEXT NOT NULL
                ,FirstName TEXT NOT NULL
                ,MiddleName TEXT
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
              CREATE TABLE IF NOT EXISTS BandColor(
                BandColor TEXT PRIMARY KEY
               ,BandSingledMinResistanceInLbs INTEGER NOT NULL
               ,BandSingledMaxResistanceInLbs INTEGER NOT NULL
               ,BandDoubledResistanceInLbs INTEGER NOT NULL
              );
			        /*Note - Workouts work in a succession order or A, B, C, etc*/
              CREATE TABLE IF NOT EXISTS Workout( 

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
                ,FOREIGN KEY(LoggedBandColor) REFERENCES BandColor(Bandcolor)
              );

              CREATE TABLE IF NOT EXISTS Message(
                senderUserID INTEGER NOT NULL
               ,recieverUserID INTEGER NOT NULL
               ,messageText TEXT 
               ,messageDate DATETIME NOT NULL
               ,PRIMARY KEY(senderUserID, recieverUserID)
               ,FOREIGN KEY(senderUserID) REFERENCES User(UserID)
               ,FOREIGN KEY(recieverUserID) REFERENCES User(UserID)
              );

              CREATE TABLE IF NOT EXISTS Log(
                LogID INTEGER
			         ,UserID NOT NULL
               ,LoggedAction TEXT 
               ,LogDate DATETIME 
               ,Notes TEXT
               ,FOREIGN KEY (UserID) REFERENCES User(UserID)
              );

              
              /*SAMPLE DATA INSERTS*/

              INSERT INTO User
              (UserName, Email, Credential, FirstName, LastName)
              VALUES
              ('Geralt', 'remail1234@email.com', '$2b$10$Z19zNy6nmmB6F990p3PCuVRGWMDtv3..U2lGZOxqqXJdiUB7fxVC', 'WitcherGaralt', 'Witcher'),
              ('Orange', 'remail1234@email.com', '$2b$10$Z19zNy6nmmB6F990p3PCuVRGWMDtv3..U2lGZOxqqXJdiUB7fxVC', 'Orange', 'Winter'),
              ('Samurai', 'remail1234@email.com', '$2b$10$Z19zNy6nmmB6F990p3PCuVRGWMDtv3..U2lGZOxqqXJdiUB7fxVC', 'Johny', 'Silverhand');
               /* Credential - Password = Password_1 */
              
              INSERT INTO UserRole
              (UserID, Role)
              VALUES
              (1, 'ADMIN'),
              (2, 'TRAINEE'),
              (3, 'TRAINEE');  

              INSERT INTO BandColor
              (BandColor, BandSingledMinResistanceInLbs, BandSingledMaxResistanceInLbs, BandDoubledResistanceInLbs)
              VALUES
              ('white', 10, 50, 100),
              ('light grey', 25, 80, 160),
              ('grey', 50, 120, 240),
              ('black', 60, 150, 300),
              ('Orange Elite', 110, 300, 600); /* the max single resistance is the min doubled resistance*/

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

              INSERT INTO Message (senderUserID, recieverUserID, messageText, messageDate) VALUES
              (1, 2, 'Hello, how are you doing today', '2026-03-12 100000'),
              (2, 1, 'I am doing great, thanks for asking!', '2026-03-12 100500'),
              (1, 3, 'Reminder Train hard!.', '2026-03-12 113000'),
              (3, 1, 'Got the reminder, I plan to!', '2026-03-12 113500'),
              (2, 3, 'Can you review my workout', '2026-03-12 140000'),
              (3, 2, 'Sure, I''ll take a look and critique it.', '2026-03-12 141000');

              INSERT INTO Log (UserID, LoggedAction, LogDate, Notes) VALUES
              (1, 'LOGIN', '2026-03-12 090000', 'Successful login from IP 192.168.1.100'),
              (1, 'MESSAGE_SENT', '2026-03-12 100000', 'Sent message to user 2'),
              (2, 'LOGOUT', '2026-03-12 170000', 'Session ended normally'),
              (3, 'LOGIN', '2026-03-12 091500', 'Successful login from mobile device'),
              (3, 'MESSAGE_SENT', '2026-03-12 100500', 'Replied to message from user 1'),
              (2, 'LOGIN', '2026-03-12 140000', 'Successful login from pc'),
              (1, 'LOGIN', '2026-03-12 103000', 'Admin login with elevated privileges'),
              (2, 'MESSAGE_SENT', '2026-03-12 113500', 'Replied to message from user 1'),
              (1, 'BACKUP_CREATED', '2026-03-12 164500', 'Workout DATABASE Data backed up successfully');


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