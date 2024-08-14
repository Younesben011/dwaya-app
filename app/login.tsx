import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Spacer from "@/components/Spacer";
import { useAuth } from "@/hooks/AuthContext";
import { router } from "expo-router";

const Login = () => {
    interface userProps {
        email: String;
        password: String;
    }
    const { onlogin } = useAuth();
    const [userProps, setUserProps] = useState<userProps>({
        email: "",
        password: "",
    });
    const login = async () => {
        const { email, password } = userProps;

        // if (onlogin) {
        const respond = await onlogin!(email, password);
        console.log(userProps);
        if (respond.error) return;
        console.log(respond);
        router.dismissAll();
        router.replace("/pharmaHome");
        // }
    };
    return (
        <View
            style={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                gap: 20,
            }}
        >
            <Text style={styles.text}>Login</Text>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <TextInput
                    onChangeText={(text: String) => {
                        setUserProps({ ...userProps, email: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="Email"
                />
                <Spacer v={20} />
                <TextInput
                    onChangeText={(text: String) => {
                        setUserProps({ ...userProps, password: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="Password"
                />
                <Button title="Login" onPress={login} />
                <Text>Don't have an account?</Text>
                <Button
                    title="Register"
                    onPress={() => router.replace("/register")}
                />
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    InputContainer: {
        width: "80%",
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
    },
});
