"use strict";

import { Animated, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button/button';
import { useState } from 'react';

import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'white', value: 'white' },
    { label: 'light grey', value: 'lightgrey' },
    { label: 'grey', value: 'grey' },
    { label: 'black', value: 'black' },
    { label: 'orange', value: 'orange' }
]

const WorkoutBScreen = () => {
    const [chestPressReps, setChestPressReps] = useState("");
    const [chestPressPartialReps, setChestPressPartialReps] = useState("");
    const [chestPressBandColor, setChestPressBandColor] = useState("");

    const [tricepPressReps, setTricepPressReps] = useState("");
    const [tricepPressPatialReps, setTricepPressPatialReps] = useState("");
    const [tricepPressBandColor, setTricepPressBandColor] = useState("");

    const [overHeadPressReps, setOverHeadPressReps] = useState("");
    const [overHeadPressPartialReps, setOverHeadPressPartialReps] = useState("");
    const [overHeadPressBandColor, setOverHeadPressBandColor] = useState("");

    const [frontsquatReps, setFrontsquatReps] = useState("");
    const [frontsquatPartialReps, setFrontsquatPartialReps] = useState("");
    const [frontsquatBandColor, setFrontsquatBandColor] = useState("");


    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Text>Workout A - Push Day</Text>
                    </View>
                    <View>
                        <Text>Chest Press</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setChestPressReps}
                                value={chestPressReps}
                                placeholder="0"
                            />
                            <Text>partial reps</Text>
                            <TextInput
                                onChangeText={setChestPressPartialReps}
                                value={chestPressPartialReps}
                                placeholder="0"
                            />
                            <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={chestPressBandColor}
                                onChange={item => {
                                    setChestPressBandColor(item.value);
                                }}
                            />
                        </View>
                        <Text>Tricep Press</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setTricepPressReps}
                                value={tricepPressReps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setTricepPressPatialReps}
                                value={tricepPressPatialReps}
                                placeholder="0"
                            />
                              <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={tricepPressBandColor}
                                onChange={item => {
                                    setTricepPressBandColor(item.value);
                                }}
                            />
                        </View>
                        <Text>Overhead Press</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setOverHeadPressReps}
                                value={overHeadPressReps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setOverHeadPressPartialReps}
                                value={overHeadPressPartialReps}
                                placeholder="0"
                            />
                              <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={overHeadPressBandColor}
                                onChange={item => {
                                    setOverHeadPressBandColor(item.value);
                                }}
                            />
                        </View>
                        <Text>Front Squat</Text>
                        <View>
                            <Text>reps</Text>
                            <TextInput
                                onChangeText={setFrontsquatReps}
                                value={frontsquatReps}
                                placeholder="0"
                            />
                            <TextInput
                                onChangeText={setFrontsquatPartialReps}
                                value={frontsquatPartialReps}
                                placeholder="0"
                            />
                              <Dropdown
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Band Color"
                                value={frontsquatBandColor}
                                onChange={item => {
                                    setFrontsquatBandColor(item.value);
                                }}
                            />
                        </View>

                    </View>
                    <Button
                        text="Submit"
                        onPress={() => {
                            
                        }}
                    />
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default WorkoutBScreen;