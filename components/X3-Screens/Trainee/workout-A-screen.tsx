"use strict";

import { KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/Button/button';

const WorkoutAScreen = () => {

    return (
        <SafeAreaView>
             <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <View>
                    <Text>Workout A</Text>
                </View>
                <Button
                    text="Submit"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default WorkoutAScreen;