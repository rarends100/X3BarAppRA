"use strict";

import { Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button/button';
import { useEffect, useState } from 'react';

import { Dropdown } from 'react-native-element-dropdown';

import { fetchJSONArrAvailableWorkoutTypes } from '@/database/WorkoutDB';

import { useSQLiteContext } from 'expo-sqlite';

import Validation from '@/Validation';
import { fetchArrOfExercises } from '@/database/ExerciseDB';
import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';

import { insertWorkoutAsync } from '@/database/WorkoutDB';


import LoggedExercisePerWorkout from '@/business/LoggedExercisePerWorkout';

import { WorkoutScreenStyles, globalStyles } from '@/styles';

const data = [
    { label: 'white', value: 'white' },
    { label: 'light grey', value: 'lightgrey' },
    { label: 'grey', value: 'grey' },
    { label: 'black', value: 'black' },
    { label: 'orange', value: 'orange' }
]





const WorkoutEntryScreen = () => {
    //hooks
    const db = useSQLiteContext();
    const [workoutOptionArrData, setWorkoutOptionArrData] = useState([]);
    const [workoutSelected, setWorkoutSelected] = useState("");
    const [workoutSelectedGood, setWorkoutSelectedGood] = useState();

    const [enterWorkoutClicked, setEnterWorkoutClicked] = useState(false);

    //user values stored in the redux store
    const { userID, role, username } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        /*
          1. get the workouts available -> call the needed WorkoutDB function
          2. translate that data to an array of JS objects called workoutData
          3. use that array in the "Select Workout Type" dropdown at the top of the UI
        */
        let optionsData: any = [];
        const workoutTypes = fetchJSONArrAvailableWorkoutTypes(db);
        workoutTypes
            .then(data => data?.map((value_obj, index, row) => {
                //console.log(value_obj);
                optionsData.push({ label: row[index].WorkoutID, value: row[index].WorkoutID }); //finally got my JS object
                setWorkoutOptionArrData(optionsData);
            }))
            .catch(error => console.log("Error retrieving workout options. \nError: " + error));
    }, []);

    useEffect(() => {
        console.log("workoutSelectedEffect fired");
        let arr: string[] = [];
        fetchArrOfExercises(db, workoutSelected)
            .then(data => data?.map((value, index, row) => {
                //console.log(row[index].ExerciseName);
                arr.push(row[index].ExerciseName); //populate array
                arr.map(value => console.log("value: " + value)); //show array
                setExNamesArr(arr); //set array to state obj
            }))
            .catch(err => console.error("Issue retrieving exercises. \nError: " + err));
    }, [workoutSelected]); // anytime this value changes, the effect will fire

    //Values state
    const [exNamesArr, setExNamesArr] = useState([""]); //stores all of the exercise names populated from the useEffect() exercise data fetch so that they display on the form and can be used for data entry.

    const [ex1Reps, setEx1Reps] = useState("0");
    const [ex1PartialReps, setEx1PartialReps] = useState("0");
    const [ex1BandColor, setEx1BandColor] = useState("");

    const [ex2Reps, setEx2Reps] = useState("0");
    const [ex2PartialReps, setEx2PartialReps] = useState("0");
    const [ex2BandColor, setEx2BandColor] = useState("");

    const [ex3Reps, setEx3Reps] = useState("0");
    const [ex3PartialReps, setEx3PartialReps] = useState("0");
    const [ex3BandColor, setEx3BandColor] = useState("");

    const [ex4Reps, setEx4Reps] = useState("0");
    const [ex4PartialReps, setEx4PartialReps] = useState("0");
    const [ex4BandColor, setEx4BandColor] = useState("");

    //errors messages for 2 possibilties
    const bandColorBad = "You must select a band color.";
    const workoutNotSelected = "You must select a workout.";
    const repsAndPartialRepsbad = "The value entered for reps and partial reps must be a number.";

    return (
        <SafeAreaView style={WorkoutScreenStyles.container}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Text style={WorkoutScreenStyles.username}>Username: {username}</Text>
                        <View style={WorkoutScreenStyles.selectWorkoutDropDown}>
                            <Dropdown
                                data={workoutOptionArrData}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Workout Type"
                                value={workoutSelected}
                                onChange={item => setWorkoutSelected(item.value)}
                                searchPlaceholderTextColor='orange'
                                iconColor='orange'
                                containerStyle={WorkoutScreenStyles.dropDownContainer}
                                activeColor='#4f240e'
                                itemTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                selectedTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                placeholderStyle={WorkoutScreenStyles.dropDownTextColor}
                            />
                        </View>
                        {enterWorkoutClicked ? Validation.isBlank(workoutSelected) ? <Text style={globalStyles.errors}>{workoutNotSelected}</Text> : "" : ""}
                    </View>
                    <View>
                        <Text style={WorkoutScreenStyles.workoutTypeText}>Workout {workoutSelected}</Text>
                    </View>
                    <View>{/**NOTE: Lots of duplicate exercise structures... I could make this so 
                     * that each workout is auto generated by turing these structures into
                     *  separate React components that I could then call, here, this would expand 
                     * functionality to allow any number of exercises for a workout, as it is there i
                     * s a hard cap on 4 workouts... Due to time constraints I will not do that, but
                     *  if I had more time I would, I will do this after CapStone is over, since I will
                     *  be using this app and maintaining it, might even put it on the play store once it 
                     * is at a level I like. */}
                        <Text style={WorkoutScreenStyles.exerciseName}>{exNamesArr != null ? exNamesArr[0] : ""}</Text>
                        <View>
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>reps</Text>
                            <TextInput
                                onChangeText={setEx1Reps}
                                value={ex1Reps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />

                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>partial reps</Text>
                            <TextInput
                                onChangeText={setEx1PartialReps}
                                value={ex1PartialReps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={ex1BandColor}
                                onChange={item => {
                                    setEx1BandColor(item.value);
                                }}
                                searchPlaceholderTextColor='orange'
                                iconColor='orange'
                                containerStyle={WorkoutScreenStyles.dropDownContainer}
                                activeColor='#4f240e'
                                itemTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                selectedTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                style={WorkoutScreenStyles.selectBandColorDropDown}
                                placeholderStyle={WorkoutScreenStyles.dropDownTextColor}
                            />
                        </View>
                        {enterWorkoutClicked ? Validation.isBlank(ex1BandColor) ? <Text style={globalStyles.errors}>{bandColorBad}</Text> : "" : ""}
                        {enterWorkoutClicked ? Validation.isNum(ex1Reps) && Validation.isNum(ex1PartialReps) ? "" : <Text style={globalStyles.errors}>{repsAndPartialRepsbad}</Text> : ""}
                        <Text style={WorkoutScreenStyles.exerciseName}>{exNamesArr != null ? exNamesArr[1] : ""}</Text>
                        <View>
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>reps</Text>
                            <TextInput
                                onChangeText={setEx2Reps}
                                value={ex2Reps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>partial reps</Text>
                            <TextInput
                                onChangeText={setEx2PartialReps}
                                value={ex2PartialReps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={ex2BandColor}
                                onChange={item => {
                                    setEx2BandColor(item.value);
                                }}
                                searchPlaceholderTextColor='orange'
                                iconColor='orange'
                                containerStyle={WorkoutScreenStyles.dropDownContainer}
                                activeColor='#4f240e'
                                itemTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                selectedTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                style={WorkoutScreenStyles.selectBandColorDropDown}
                                placeholderStyle={WorkoutScreenStyles.dropDownTextColor}
                            />
                        </View>
                        {enterWorkoutClicked ? Validation.isBlank(ex2BandColor) ? <Text style={globalStyles.errors}>{bandColorBad}</Text> : "" : ""}
                        {enterWorkoutClicked ? Validation.isNum(ex2Reps) && Validation.isNum(ex2PartialReps) ? "" : <Text style={globalStyles.errors}>{repsAndPartialRepsbad}</Text> : ""}
                        <Text style={WorkoutScreenStyles.exerciseName}>{exNamesArr != null ? exNamesArr[2] : ""}</Text>
                        <View>
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>reps</Text>
                            <TextInput
                                onChangeText={setEx3Reps}
                                value={ex3Reps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>partial reps</Text>
                            <TextInput
                                onChangeText={setEx3PartialReps}
                                value={ex3PartialReps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={ex3BandColor}
                                onChange={item => {
                                    setEx3BandColor(item.value);
                                }}
                                searchPlaceholderTextColor='orange'
                                iconColor='orange'
                                containerStyle={WorkoutScreenStyles.dropDownContainer}
                                activeColor='#4f240e'
                                itemTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                selectedTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                style={WorkoutScreenStyles.selectBandColorDropDown}
                                placeholderStyle={WorkoutScreenStyles.dropDownTextColor}
                            />
                        </View>
                        {enterWorkoutClicked ? Validation.isBlank(ex3BandColor) ? <Text style={globalStyles.errors}>{bandColorBad}</Text> : "" : ""}
                        {enterWorkoutClicked ? Validation.isNum(ex3Reps) && Validation.isNum(ex3PartialReps) ? "" : <Text style={globalStyles.errors}>{repsAndPartialRepsbad}</Text> : ""}
                        <Text style={WorkoutScreenStyles.exerciseName}>{exNamesArr != null ? exNamesArr[3] : ""}</Text>
                        <View>
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>reps</Text>
                            <TextInput
                                onChangeText={setEx4Reps}
                                value={ex4Reps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Text style={[globalStyles.Text, WorkoutScreenStyles.repsText]}>partial reps</Text>
                            <TextInput
                                onChangeText={setEx4PartialReps}
                                value={ex4PartialReps}
                                placeholder="0"
                                style={WorkoutScreenStyles.input}
                            />
                            <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={ex4BandColor}
                                onChange={item => {
                                    setEx4BandColor(item.value);
                                }}
                                searchPlaceholderTextColor='orange'
                                iconColor='orange'
                                containerStyle={WorkoutScreenStyles.dropDownContainer}
                                activeColor='#4f240e'
                                itemTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                selectedTextStyle={WorkoutScreenStyles.dropDownTextColor}
                                style={WorkoutScreenStyles.selectBandColorDropDown}
                                placeholderStyle={WorkoutScreenStyles.dropDownTextColor}

                            />
                        </View>
                    </View>
                    {enterWorkoutClicked ? Validation.isBlank(ex4BandColor) ? <Text style={globalStyles.errors}>{bandColorBad}</Text> : "" : ""}
                    {enterWorkoutClicked ? Validation.isNum(ex4Reps) && Validation.isNum(ex4PartialReps) ? "" : <Text style={globalStyles.errors}>{repsAndPartialRepsbad}</Text> : ""}
                    <Button
                        text="Enter Workout"
                        borderColor="black"
                        buttonColor="black"
                        buttonTextColor="orange"
                        buttonRadius={10}
                        style={WorkoutScreenStyles.enterWorkoutButton}
                        onPress={() => {
                            //ensure validation is processed - done
                            setEnterWorkoutClicked(true);
                            if (!Validation.isBlank(ex1BandColor) && !Validation.isBlank(ex2BandColor)
                                && !Validation.isBlank(ex3BandColor) && !Validation.isBlank(ex4BandColor)
                                && !Validation.isBlank(workoutSelected)

                                && Validation.isNum(ex1Reps) && Validation.isNum(ex1PartialReps)
                                && Validation.isNum(ex2Reps) && Validation.isNum(ex2PartialReps)
                                && Validation.isNum(ex3Reps) && Validation.isNum(ex3PartialReps)
                                && Validation.isNum(ex4Reps) && Validation.isNum(ex4PartialReps)) {
                                try {
                                    console.log("chack me:2011-10-05T14:48:00.000Z " + exNamesArr[1]);
                                    const workoutLog1 = new LoggedExercisePerWorkout();
                                    workoutLog1.setLoggedExerciseName(exNamesArr[0]); //Name arr starts at 0 index and WorkoutLogs start at 1, they must be PARELLELL to properly insert correct data into db
                                    workoutLog1.setLoggedBandcolor(ex1BandColor);
                                    workoutLog1.setReps(ex1Reps);
                                    workoutLog1.setPartialReps(ex1PartialReps);
                                    const workoutLog2 = new LoggedExercisePerWorkout();
                                    workoutLog2.setLoggedExerciseName(exNamesArr[1]);
                                    workoutLog2.setLoggedBandcolor(ex2BandColor);
                                    workoutLog2.setReps(ex2Reps);
                                    workoutLog2.setPartialReps(ex2PartialReps);
                                    const workoutLog3 = new LoggedExercisePerWorkout();
                                    workoutLog3.setLoggedExerciseName(exNamesArr[2]);
                                    workoutLog3.setLoggedBandcolor(ex3BandColor);
                                    workoutLog3.setReps(ex3Reps);
                                    workoutLog3.setPartialReps(ex3PartialReps);
                                    const workoutLog4 = new LoggedExercisePerWorkout();
                                    workoutLog4.setLoggedExerciseName(exNamesArr[3]);
                                    workoutLog4.setLoggedBandcolor(ex4BandColor);
                                    workoutLog4.setReps(ex4Reps);
                                    workoutLog4.setPartialReps(ex4PartialReps);

                                    try {
                                        insertWorkoutAsync(db, workoutSelected, userID,
                                            workoutLog1, workoutLog2, workoutLog3, workoutLog4);

                                        setEnterWorkoutClicked(false); //do this at the end
                                    } catch (ex) {
                                        console.error(ex);
                                    }
                                } catch (ex) {
                                    console.error(ex);
                                }
                            }

                            //start working on logic to enter a workout, will need to reference db diagram - done

                        }}
                    />
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default WorkoutEntryScreen;