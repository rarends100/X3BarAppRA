import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
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


export const loginPageStyle = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        flexDirection: 'column'
    },
    headers: { 
        color: 'orange',
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 180
    },
    input: {
        color: 'orange',
        backgroundColor: 'black',
        borderColor: 'orange',
        borderWidth: 5,
        marginLeft: 120,
        marginBottom: 3,
        padding: 10,
        width: 200,
        fontSize: 20,
    },
    inputContainer: { 
      marginBottom: 10  
    },
    image: {
        width: 400,
        height: 430
    }
});


export const registerPageStyle = StyleSheet.create({
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

export const WorkoutScreenStyle = StyleSheet.create({
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
    
});

export const WorkoutInfoScreenStyle = StyleSheet.create({
    container: { 
        padding: 1,
        backgroundColor: 'orange',
        flex: 1
    },
    listContainer: { 
        flex: 4/5,
        color: '#eee894'
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'orange'
    }
});

export const ExerciseSegmentsStyle = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 1,
        width: 400,
        marginLeft: 15,
        marginTop: 10,
    },
    exerciseName: {
        backgroundColor: 'white',
        fontSize: 24,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    exerciseInfoContainer: {
        backgroundColor: '#f8c453',

    },
    exerciseInfoText: {
        fontSize: 18,
        textAlign: 'left',
    },
    header: { 
        backgroundColor: 'black',
    },
    headerTextStyle: {
        fontSize: 24,
        color: 'orange',
        textAlign: 'center'
    }
});

export const workoutListStyle = StyleSheet.create({
    containerMain: { 
        padding: 1,
        backgroundColor: 'orange',
        flex: 1
    },
    containerSecondary: {
        flexDirection: 'row',
        marginTop: 20
    },
    item: {
        color: 'black',
        fontSize: 18,
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 5,
        padding: 2,
        borderWidth: 1,
        borderColor: 'black',
        fontWeight: '500'
        
    },
    heading: {
        fontSize: 30,
        fontWeight: 'condensedBold',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        textAlign: 'center',
        color: 'orange',
        backgroundColor: 'black'
    },  
    userInfo: { 
        fontSize: 16,
        fontFamily: 'sans-serif',
        marginLeft: 30,
    }
});

export const traineeHomeStyle = StyleSheet.create({
    container: {
        backgroundColor: '#fd7403ef',
        flex: 1,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: 'orange',
        padding: 30,
        textAlign: 'center',
        marginBottom: 50,
        

    },
    image: {
        width: 400,
        height: 400
    }
});
