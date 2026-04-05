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
    const [deadLiftreps, setDeadLiftReps] = useState("");
    const [deadLiftPartialReps, setDeadLiftPartialReps] = useState("");
    const [deadLiftBandColor, setDeadLiftBandColor] = useState("");

    const [bentOverRowReps, setBentOverRowReps] = useState("");
    const [BentOverRowPartialReps, setBentOverRowPartialReps] = useState("");
    const [bentOverRowBandColor, setBentOverRowBandColor] = useState("");

    const [bicepCurlReps, setBicepCurlReps] = useState("");
    const [BicepCurlPartialReps, setBicepCurlPartialReps] = useState("");
    const [bicepCurlBandColor, setBicepCurlBandColor] = useState("");

    const [calfRaiseReps, setCalfRaiseReps] = useState("");
    const [CalfRaisePartialReps, setCalfRaisePartialReps] = useState("");
    const [calfRaiseBandColor, setCalfRaiseBandColor] = useState("");


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
                                onChangeText={setDeadLiftReps}
                                value={deadLiftreps}
                                placeholder="0"
                            />
                            <Text>partial reps</Text>
                            <TextInput
                                onChangeText={setDeadLiftPartialReps}
                                value={deadLiftPartialReps}
                                placeholder="0"
                            />
                            <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={deadLiftBandColor}
                                onChange={item => {
                                    setDeadLiftBandColor(item.value);
                                }}
                            />
                        </View>
                        <Text>Bentover Row</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setBentOverRowReps}
                                value={bentOverRowReps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setBentOverRowPartialReps}
                                value={BentOverRowPartialReps}
                                placeholder="0"
                            />
                              <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={bentOverRowBandColor}
                                onChange={item => {
                                    setBentOverRowBandColor(item.value);
                                }}
                            />
                        </View>
                        <Text>Bicep curl</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setBicepCurlReps}
                                value={bicepCurlReps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setBicepCurlPartialReps}
                                value={BicepCurlPartialReps}
                                placeholder="0"
                            />
                              <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={bicepCurlBandColor}
                                onChange={item => {
                                    setBicepCurlBandColor(item.value);
                                }}
                            />
                        </View>
                        <Text>Calf Raise</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setCalfRaiseReps}
                                value={calfRaiseReps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setCalfRaisePartialReps}
                                value={CalfRaisePartialReps}
                                placeholder="0"
                            />
                              <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={calfRaiseBandColor}
                                onChange={item => {
                                    setCalfRaiseBandColor(item.value);
                                }}
                            />
                        </View>

                    </View>
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