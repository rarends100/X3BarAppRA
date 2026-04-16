import { Pressable, Text, View } from "react-native";

import { useNavigation, } from "@react-navigation/native";

interface iWorkoutSegmentProps { //props tracking
    workoutsessionID: number,
    workoutDate: Date | null,
    WorkoutID: string | null
}

//https://reactnative.dev/docs/using-a-listview
/**
 * Sole purpose of this is to call it in any screen where you need to 
 * render multiple workouts from a map retrieved from the database.
 * @param props 
 * @returns 
 */
const WorkoutSegments = (props: iWorkoutSegmentProps) => {

    const navigation: any = useNavigation();
    return (
        <View>
            {/* OMG, what was I thinking using a flatlist inside a scroll view and rendering multiple, all I need here is a <Text> component... well there goes 4 hours of my life down the drain solving this annoying bug*/}
            <Pressable
                onPress={() => {
                    navigation.navigate('WorkoutInfo', {
                        WorkoutSessionID: props.workoutsessionID
                    });
                }}
            >
                <View>
                    <Text  key={props.workoutsessionID}>
                        {props.WorkoutID + "\t\t" + 
                        "Date: " + props.workoutDate?.getMonth() + "/" + props.workoutDate?.getDay()  + "/" + 
                            props.workoutDate?.getFullYear() + "\t\t" +
                        "\t\tTime: " + props.workoutDate?.toLocaleTimeString()}
                            
                    </Text>
                </View>
            </Pressable>

        </View>
    )
}

export default WorkoutSegments;