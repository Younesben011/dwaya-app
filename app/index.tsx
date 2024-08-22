import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
} from "react-native-reanimated";
const SplashScreen = () => {
    const { authState } = useAuth();
    const [loading, setLoading] = useState(true);
    const scale = useSharedValue(1);

    // Animated style for the text
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });
    useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.5, { duration: 2000 }), // Zoom in
            -1, // Infinite repeat
            true // Reverse direction (zoom out after zooming in)
        );
    }, []);
    useEffect(() => {
        const loadToken = async () => {
            if (authState!.authenticated) {
                router.replace("/pharmaHome");
            } else {
                router.replace("/home");
            }
        };
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        if (authState && !loading)
            if (authState!.authenticated) {
                router.replace("/pharmaHome");
            } else {
                router.replace("/home");
            }
    }, [authState, loading]);

    // setInterval(() => {

    //     console.log(authState?.authenticated);
    // }, 1000);
    return (
        <View style={styles.container}>
            <Animated.Text
                style={[{ fontSize: 20, fontWeight: "bold" }, animatedStyle]}
            >
                DwayaApp
            </Animated.Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});
