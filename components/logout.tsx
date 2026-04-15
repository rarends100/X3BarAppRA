import Button from '@/components/Button/button';
import { logout } from '@/utilities/AuthSlice';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

const Logout =() => {

    const dispatch = useDispatch();

    return (
        <View>
            <Button
                buttonColor='black'
                text='Logout'
                buttonTextColor='white'
                onPress={() => {
                    dispatch(logout());
                }}
            ></Button>
        </View>
    );
}

export default Logout;