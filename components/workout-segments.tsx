import { FlatList, Pressable, Text, View } from "react-native";

import { useNavigation, } from "@react-navigation/native";

interface iWorkoutSegmentProps { //props tracking
    WorkoutSessionID: Number,
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
            <View>
                <FlatList data={[
                    { key: props.WorkoutSessionID }, //required
                    { workoutDate: props.workoutDate },//required
                    { WorkoutID: props.WorkoutID}//required
                ]}
                    renderItem={({ item }) =>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('', {
                                    WorkoutSessionID: item.key
                                });
                            }}
                        >
                            <View>
                                <Text>
                                    {item.WorkoutID + " \t\t\t " +
                                         + "Date: " + item.workoutDate?.getDate() + " " + item.workoutDate?.getTime()}
                                </Text>
                            </View>
                        </Pressable>
                    }
                    scrollEnabled={false}
                />
            </View>
        </View>
    )
}

export default WorkoutSegments;