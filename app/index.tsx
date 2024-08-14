import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/AuthContext";

const SplashScreen = () => {
    const { authState } = useAuth();
    const [loading, setLoading] = useState(true);
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>DwayaApp</Text>
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
