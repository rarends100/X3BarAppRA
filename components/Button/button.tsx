import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";


//https://reactnative.dev/docs/animated#example

const Button = (props: any) => {
    const { style = {}, text, onPress, buttonColor = 'orange', fontSize = 24, buttonSideSize = 50, buttonRadius = 0,
        buttonTextColor = 'black', borderColor = 'black', fontWeight = 'normal' } = props;

    const fadeAnim = useRef(new Animated.Value(1)).current

    const fade = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 60,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={{ opacity: fadeAnim, }}
            >
                <Pressable
                    onPressIn={() => fade()}
                    onPress={() => {
                        onPress?.();
                    }}
                    style={[styles.ButtonText, style, {
                        backgroundColor: buttonColor,
                        paddingLeft: buttonSideSize, paddingRight: buttonSideSize,
                        borderRadius: buttonRadius, borderColor: borderColor
                    }]}

                >
                    <Text style={{ fontSize: fontSize, color: buttonTextColor, fontWeight: fontWeight }}>
                        {text}
                    </Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}






const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    fadingContainer: {

        backgroundColor: 'lightgreen',
    },
    fadingText: {
        fontSize: 36,
    },
    ButtonText: {
        paddingBottom: 2,
        borderWidth: 2,
        fontWeight: 'bold'

    },
});


export default Button;