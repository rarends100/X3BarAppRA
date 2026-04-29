import { Text, View } from "react-native";
import Button from "./Button/button";

import { deleteUser } from "@/database/UserDB";
import { useSQLiteContext } from "expo-sqlite";

import { adminViewAllUsersPageStyle } from "@/styles";

//Sole purpose is to be called and supplied values to display user items and allow user deletion
// should be flex basis as a row for each segment

interface iUserSegementProps {
    UserName: String,
    Role: String,
    UserID: number,
    onPress: Function
}

/**
 * Sole purpose is to be called and supplied values to display user items and allow user deletion
 * @param props 
 * @returns View
 */
const UserSegments = (props: iUserSegementProps) => {

    const db = useSQLiteContext();

    return (
        <View style={adminViewAllUsersPageStyle.segementsAlignment}>
            <Text style={adminViewAllUsersPageStyle.segmentsText}>
                {props.UserName} 
            </Text>
            <Text style={adminViewAllUsersPageStyle.segmentsText}>
                {props.Role}
            </Text>

            <Button 
                text={"Delete"}
                onPress={() => {
                    deleteUser(db, props.UserID); 
                    props.onPress(); //Pass callback fn back to nthe allUsersScreen so that other functions outside uersegments scope can be executed
                    
                }}
                fontSize={16}
                buttonRadius={20}
            />
        </View>
    )
}

export default UserSegments;