import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Spacer from "@/components/Spacer";
import { useAuth } from "@/hooks/AuthContext";
import { router } from "expo-router";
import YInput from "@/components/YInput";
import YButton from "@/components/YButton";

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
    const [timeLimit, setTimeLimit] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    setTimeout(() => {
        if (errMsg !== "") setErrMsg("");
    }, 4000);
    const login = async () => {
        setErrMsg("");
        const { email, password } = userProps;
        console.log("email", email, "password", password);
        if (email === "" || password === "") {
            setErrMsg("please complete all fields");
            return;
        }
        setSubmitting(true);
        // if (onlogin) {
        const respond = await onlogin!(email, password);
        if (respond.error) {
            console.log(respond);
            setErrMsg(respond.message);
            setSubmitting(false);

            return;
        }
        setSubmitting(false);

        router.dismissAll();
        router.replace("/pharmaHome");
        // }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View style={styles.form}>
                <YInput
                    func={(text: String) => {
                        console.log(text);

                        setUserProps({ ...userProps, email: text });
                    }}
                    placeholder="Email"
                />
                <YInput
                    func={(text: String) => {
                        setUserProps({ ...userProps, password: text });
                    }}
                    placeholder="Password"
                />
                <Text style={styles.errorMsg}>{errMsg}</Text>
            </View>
            <View style={styles.buttons}>
                <YButton
                    width={200}
                    height={48}
                    title="Login"
                    func={login}
                    disable={submitting}
                />
                {/* <Button title="Login" onPress={login} /> */}
                <Text>Don't have an account?</Text>

                <Button
                    title="Register"
                    onPress={() => router.replace("/register/phase01")}
                />
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 20,
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    form: {
        flexDirection: "column",
        // alignItems: "center",
        width: "80%",
        gap: 20,
        marginBottom: 30,
    },
    buttons: {
        width: "auto",
        alignItems: "center",
        gap: 10,
    },
    errorMsg: {
        fontSize: 14,
        marginLeft: 10,
        color: "red",
    },
});
