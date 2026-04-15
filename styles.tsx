import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
       //General Text Styling
    errors: {
        color: 'red',
        fontWeight: 'bold'
    },
    Text: {
        color: 'black',
        fontSize: 16,
    }
});


export const loginPageStyles = StyleSheet.create({

});


export const registerPageStyles = StyleSheet.create({
    //Dropdown styling
    dropdown: {
        marginRight: 82,
        marginLeft: 50,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: 'orange'
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    //View styling
    topView: {
        fontSize: 12,
        marginLeft: 50,
        marginTop: 10

    },
    SafeMainView: {
        flex: 1,
        backgroundColor: '#f5bd6a'
    },
    //TextInput styling
    inputs: {
        borderColor: 'black',
        borderWidth: 0.75,
        fontSize: 12,
        width: 300,
        color: 'black',
        backgroundColor: 'white'

    },
    registerButton: {
        marginLeft: 150,
        marginTop: 30,
        marginRight: 0
    },
    //Banner Styling
    banner: {
        color: 'black',
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth: 2,
        paddingVertical: 50,
        paddingHorizontal: 100,
        marginLeft: 2,
        marginRight: 2,
        fontWeight: 'condensedBold',
        fontSize: 25
    },
    //General Text Styling
    errors: {
        color: 'red',
        fontWeight: 'bold'
    },
    Text: {
        color: 'black',
        fontSize: 16,
    }

});

export const WorkoutScreenStyles = StyleSheet.create({
    container: {
        backgroundColor: "orange",
        padding: 2,
        flex: 1
    },
    input: {
        margin: 20,
        borderColor: "#0000",
        borderWidth: 1,
        backgroundColor: "black",
        color: "orange",
        width: 200
        
    },
    exerciseName: {
        fontFamily: "sans-serif",
        fontSize: 20,
        fontWeight: "bold"
    },
    workoutTypeText: {
        fontFamily: "sans-serif",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 20,
        borderTopColor: 'black',
        borderBottomColor: 'black',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    username: {
        fontFamily: "sans-serif",
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 75,
        width: 300,
        borderBottomWidth: 5,
        borderBlockColor: "black",
        backgroundColor: "gold"
    },
    dropDownContainer: {
        padding: 0,
        backgroundColor: "black",
        fontSize: 14,
        fontWeight: 'condensedBold'
    },
    selectWorkoutDropDown: {
        width: 100,
        marginTop: 20,
        marginLeft: 165,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "black",
        borderColor: 'black',
        borderWidth: 5,
        fontSize: 14,
        fontWeight: 'condensedBold'

    },
    selectBandColorDropDown: {
        width: 250,
        marginTop: 0,
        marginLeft: 25,
        padding: 20,
        backgroundColor: "black",
        borderColor: 'black',
        borderWidth: 5,
    },
    dropDownTextColor: {
        color: "orange"
    },
    enterWorkoutButton: {
        marginTop: 20
    },
    repsText: { 
        marginLeft: 20
    }
    
})