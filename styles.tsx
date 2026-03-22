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