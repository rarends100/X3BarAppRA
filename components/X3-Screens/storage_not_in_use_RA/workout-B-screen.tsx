"use strict";

import { Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button/button';
import { useState } from 'react';

import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'white', value: 'white' },
    { label: 'light grey', value: 'light grey' },
    { label: 'grey', value: 'grey' },
    { label: 'black', value: 'black' },
    { label: 'orange', value: 'orange' }
]

const WorkoutBScreen = () => {
  
    //Values state
    const [ex1Reps, setEx1Reps] = useState("");
    const [ex1PartialReps, setEx1PartialReps] = useState("");
    const [ex1BandColor, setEx1BandColor] = useState("");

    const [ex2Reps, setEx2Reps] = useState("");
    const [ex2PartialReps, setEx2PartialReps] = useState("");
    const [ex2BandColor, setEx2BandColor] = useState("");

    const [ex3Reps, setEx3Reps] = useState("");
    const [ex3PartialReps, setEx3PartialReps] = useState("");
    const [ex3BandColor, setEx3BandColor] = useState("");

    const [ex4Reps, setEx4Reps] = useState("");
    const [ex4PartialReps, setEx4PartialReps] = useState("");
    const [ex4BandColor, setEx4BandColor] = useState("");

    //Validation state
    const [ex1RepsGood, setEx1RespsGood ] = useState(true);
    const [ex1PartialRepsGood,setEx1PartialRepsGood ] = useState(true);
    const [ex1BandColorSelectedGood,setEx1BandColorSelectedGood ] = useState(true);

    const [ex2RepsGood, setEx2RespsGood ] = useState(true);
    const [ex2PartialRepsGood,setEx2PartialRepsGood ] = useState(true);
    const [ex2BandColorSelectedGood,setEx2BandColorSelectedGood ] = useState(true);

    const [ex3RepsGood, setEx3RespsGood ] = useState(true);
    const [ex3PartialRepsGood,setEx3PartialRepsGood ] = useState(true);
    const [ex3BandColorSelectedGood,setEx3BandColorSelectedGood ] = useState(true);

    const [ex4RepsGood, setEx4RespsGood ] = useState(true);
    const [ex4PartialRepsGood,setEx4PartialRepsGood ] = useState(true);
    const [ex4BandColorSelectedGood,setEx4BandColorSelectedGood ] = useState(true);

    //errors messages for 3 possibilties
    const repsBad = "You must enter reps as a number.";
    const partialRepsBad = "You must enter partial reps as a number.";
    const bandColorBad = "You select a band color.";

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Text>Workout B - Pull Day</Text>
                    </View>
                    <View>
                        <Text>Dead Lift</Text>
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
                                value={setEx1BandColor}
                                onChange={item => {
                                    setEx1BandColor(item.value);
                                }}
                            />
                        </View>
                        {ex1RepsGood? "" : <Text>{repsBad}</Text>}
                        {ex1PartialRepsGood? "" : <Text>{partialRepsBad}</Text>}
                        {ex1BandColorSelectedGood? "" : <Text>{bandColorBad}</Text>}
                        <Text>Bentover Row</Text>
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
                        {ex2RepsGood? "" : <Text>{repsBad}</Text>}
                        {ex2PartialRepsGood? "" : <Text>{partialRepsBad}</Text>}
                        {ex2BandColorSelectedGood? "" : <Text>{bandColorBad}</Text>}
                        <Text>Bicep curl</Text>
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
                        {ex3RepsGood? "" : <Text>{repsBad}</Text>}
                        {ex3PartialRepsGood? "" : <Text>{partialRepsBad}</Text>}
                        {ex3BandColorSelectedGood? "" : <Text>{bandColorBad}</Text>}
                        <Text>Calf Raise</Text>
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
                    {ex4RepsGood? "" : <Text>{repsBad}</Text>}
                    {ex4PartialRepsGood? "" : <Text>{partialRepsBad}</Text>}
                    {ex4BandColorSelectedGood? "" : <Text>{bandColorBad}</Text>}
                    <Button
                        text="Submit"
                        onPress={() => {
                             //TODO ensure validation is processed


                             //TODO start working on logic to enter a workout, will need to reference db diagram
                        }}
                    />
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default WorkoutBScreen;