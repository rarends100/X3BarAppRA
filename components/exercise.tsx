"use strict";

import { Text, TextInput, View } from 'react-native';


import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'white', value: 'white' },
    { label: 'light grey', value: 'light grey' },
    { label: 'grey', value: 'grey' },
    { label: 'black', value: 'black' },
    { label: 'orange', value: 'orange' }
]

const Exercise = (props : any) => {
    //errors messages for 3 possibilties
    const repsBad = "You must enter reps as a number.";
    const partialRepsBad = "You must enter partial reps as a number.";
    const bandColorBad = "You select a band color.";

    /**
     * Needs state variables passwed for the reps, partial reps, bandColor, booleans used for validation in the submit, and
     * it also needs those setters passed to its props, as can be seen below here are the variables to pass to for each 
     * workout.
     */
    return (
        <View>
            <Text>{props.exerciseName}</Text>
            <View>
                <Text>reps</Text>
                <TextInput
                    onChangeText={props.setExReps}
                    value={props.exReps}
                    placeholder="0"
                />
                <Text>partial reps</Text>
                <TextInput
                    onChangeText={props.setExPartialReps}
                    value={props.exPartialReps}
                    placeholder="0"
                />
                <Dropdown
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Band Color"
                    value={props.exBandColor}
                    onChange={item => {
                        props.setExBandColor(item.value);
                    }}
                />
            </View>
            {props.ex1RepsGood ? "" : <Text>{repsBad}</Text>}
            {props.ex1PartialRepsGood ? "" : <Text>{partialRepsBad}</Text>}
            {props.ex1BandColorSelectedGood ? "" : <Text>{bandColorBad}</Text>}
        </View>
    );
}

export default Exercise;