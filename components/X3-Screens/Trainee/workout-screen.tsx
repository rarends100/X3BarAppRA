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

const data = [
    { label: 'white', value: 'white' },
    { label: 'light grey', value: 'lightgrey' },
    { label: 'grey', value: 'grey' },
    { label: 'black', value: 'black' },
    { label: 'orange', value: 'orange' }
]

const WorkoutScreen = () => {
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
                console.log(value_obj);
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
                console.log(row[index].ExerciseName);
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

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Dropdown
                            data={workoutOptionArrData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Workout Type"
                            value={workoutSelected}
                            onChange={item => setWorkoutSelected(item.value)}
                        />
                        {enterWorkoutClicked? Validation.isBlank(workoutSelected)? <Text>{workoutNotSelected}</Text> : "": ""}
                    </View>
                    <View>
                        <Text>Workout {workoutSelected}</Text>
                    </View>
                    <View>
                        <Text>{exNamesArr != null? exNamesArr[0] : ""}</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setEx1Reps}
                                value={ex1Reps}
                                placeholder="0"
                            />

                            <Text>partial reps</Text>
                            <TextInput
                                onChangeText={setEx1PartialReps}
                                value={ex1PartialReps}
                                placeholder="0"
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
                            />
                        </View>
                        {enterWorkoutClicked? Validation.isBlank(ex1BandColor) ? <Text>{bandColorBad}</Text>: ""  : ""}
                        <Text>{exNamesArr != null? exNamesArr[1] : ""}</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setEx2Reps}
                                value={ex2Reps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setEx2PartialReps}
                                value={ex2PartialReps}
                                placeholder="0"
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
                            />
                        </View>
                        {enterWorkoutClicked? Validation.isBlank(ex2BandColor) ? <Text>{bandColorBad}</Text>: ""  : ""}
                        <Text>{exNamesArr != null? exNamesArr[2] : ""}</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setEx3Reps}
                                value={ex3Reps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setEx3PartialReps}
                                value={ex3PartialReps}
                                placeholder="0"
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
                            />
                        </View>
                        {enterWorkoutClicked? Validation.isBlank(ex3BandColor) ? <Text>{bandColorBad}</Text>: ""  : ""}
                        <Text>{exNamesArr != null? exNamesArr[3] : ""}</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setEx4Reps}
                                value={ex4Reps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setEx4PartialReps}
                                value={ex4PartialReps}
                                placeholder="0"
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
                            />
                        </View>
                    </View>
                    {enterWorkoutClicked? Validation.isBlank(ex4BandColor) ? <Text>{bandColorBad}</Text>: ""  : ""}
                    <Button
                        text="Submit"
                        onPress={() => {
                            //TODO ensure validation is processed
                            setEnterWorkoutClicked(true);




                            //TODO start working on logic to enter a workout, will need to reference db diagram

                        }}
                    />
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default WorkoutScreen;