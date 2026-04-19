import { View } from "react-native";

import { iLoggedExercisePerWorkout } from "@/Interfaces/iLoggedExercisePerWorkout";
import { useNavigation, } from "@react-navigation/native";

import { ExerciseSegmentsStyle } from "@/styles";

import { DataTable } from 'react-native-paper';
//https://reactnative.dev/docs/using-a-listview
/**
 * Sole purpose of this is to call it in any screen where you need to 
 * render multiple exercises from a map retrieved from the database.
 * @param props 
 * @returns 
 */
const ExerciseSegments = (props: iLoggedExercisePerWorkout) => {

    const navigation: any = useNavigation();
    return (
        <View style={ExerciseSegmentsStyle.container}>
            <View>
                <DataTable style={ExerciseSegmentsStyle.exerciseInfoContainer}>
                    <DataTable.Header style={ExerciseSegmentsStyle.header}>
                        <DataTable.Title>Exercise: {props.LoggedExerciseName}</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell>Band Color: {props.LoggedBandColor}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Reps: {props.Reps}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>Partial Reps: {props.PartialReps}</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>


        </View>
    )
}

export default ExerciseSegments;