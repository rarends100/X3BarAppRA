import { Text, View } from 'react-native';

const AdminHomeScreen = () => {
    const test = true;
    if (test){
        return(
        <   View>
                <Text>
                    This is the admin home page
                    TODO: Add details to home page to reflect user stories
                </Text>
            </View>
        );
    }else{
        return null; //nav to start page
    }
    

}

export default AdminHomeScreen;