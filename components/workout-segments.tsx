import { Animated, Pressable, Text, View } from "react-native";

import { useNavigation, } from "@react-navigation/native";
import { useRef } from "react";

interface iWorkoutSegmentProps { //props tracking
    workoutsessionID: number,
    workoutDate: Date | null,
    WorkoutID: string | null
    textStyle: {}
}

//https://reactnative.dev/docs/using-a-listview
/**
 * Sole purpose of this is to call it in any screen where you need to 
 * render multiple workouts from a map retrieved from the database.
 * @param props 
 * @returns 
 */
const WorkoutSegments = (props: iWorkoutSegmentProps) => {


    //This is so when a list item is clicked it "pops."
    const popAnim = useRef(new Animated.Value(0)).current //Values transition between 0 and 1 or 1 and 0

    const pop = () => { //https://reactnative.dev/docs/animations
        popAnim.setValue(0);
        Animated.timing(popAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };



    const scale = popAnim.interpolate({ //https://reactnative.dev/docs/animations#interpolation
        inputRange: [0,0.5, 1], //trasform start time | mid time | end time
        outputRange: [1, 1.1, 1] //start | mid | end(reset back to normal size)
    });



    const navigation: any = useNavigation();
    return (
        <Animated.View style={{ transform: [{ scale}, {perspective: 1000}]}}>
            {/* OMG, what was I thinking using a flatlist inside a scroll view and rendering multiple, all I need here is a <Text> component... well there goes 4 hours of my life down the drain solving this annoying bug*/}
            <Pressable
                onPressIn={() => {
                    pop();
                }}
                onPress={() => {
                    setTimeout(() => {
                        navigation.navigate('WorkoutInfo', {
                            WorkoutSessionID: props.workoutsessionID
                        });
                    }, 500); //runs enclosed function after 0.5 seconds so animation shows //https://sangwin.medium.com/delays-in-javascript-how-to-make-your-code-wait-the-right-way-0d97522cf8f5

                }}
            >
                <View>
                    <Text key={props.workoutsessionID} style={props.textStyle}>
                        {props.WorkoutID + "\t\t" +
                            "Date: " + props.workoutDate?.getMonth() + "/" + props.workoutDate?.getDay() + "/" +
                            props.workoutDate?.getFullYear() + "\t\t" +
                            "\t\tTime: " + props.workoutDate?.toLocaleTimeString()}

                    </Text>
                </View>
            </Pressable>

        </Animated.View>
    )
}

export default WorkoutSegments;