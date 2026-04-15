import { Animated, KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { useSQLiteContext } from 'expo-sqlite';

import { RootState } from '@/utilities/store';
import { useSelector } from 'react-redux';

const WorkoutInfoScreen = () => {
    const db = useSQLiteContext();
    
    const [loggedWorkoutsArr, setLoggedWorkoutsArr] = useState();

    const { userID, role, username } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
       
    });
    
    return(
        <SafeAreaView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <Animated.ScrollView>
                    <View>
                        <Text>Workout Sessions</Text>
                    </View>
                    <View>

                    </View>
                </Animated.ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default WorkoutInfoScreen;