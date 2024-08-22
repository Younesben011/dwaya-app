import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Spacer from "@/components/Spacer";
import { useAuth } from "@/hooks/AuthContext";
import { router } from "expo-router";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
} from "expo-location";
const register = () => {
    interface PhoneNumber {
        mobile?: Number;
        local?: Number;
    }
    interface UserProps {
        email?: String;
        password?: String;
        name?: String;
        phoneNumber?: PhoneNumber;
        address: String;
        lng?: Number;
        lat?: Number;
        pharmaPicture?: String;
    }
    const { onRegister } = useAuth();
    const [userProps, setUserProps] = useState<UserProps | any>({});
    const userLocation = async () => {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.error("permission denied");
        }
        let loc = await getCurrentPositionAsync();

        setUserProps({
            ...userProps,
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
        });
    };

    const register = async () => {
        // if (onlogin) {
        const respond = await onRegister!(userProps);
        console.log(userProps);
        if (respond.error) return;
        console.log(respond);
        router.dismissAll();
        router.replace("/pharmaHome");
    };
    return (
        <View>
            <Text style={styles.text}>register</Text>
            <View>
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
                <TextInput
                    onChangeText={(text: String) => {
                        setUserProps({ ...userProps, name: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="Name"
                />
                <TextInput
                    onChangeText={(text: String) => {
                        setUserProps({ ...userProps, address: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="address"
                />
                <TextInput
                    onChangeText={(text: String) => {
                        setUserProps({
                            ...userProps,
                            phoneNumber: {
                                ...userProps.phoneNumber,
                                mobile: Number(text),
                            },
                        });
                    }}
                    style={styles.InputContainer}
                    placeholder="mobile"
                    keyboardType="phone-pad"
                />
                <TextInput
                    onChangeText={(text: String) => {
                        setUserProps({
                            ...userProps,
                            phoneNumber: {
                                ...userProps.phoneNumber,
                                local: Number(text),
                            },
                        });
                    }}
                    style={styles.InputContainer}
                    placeholder="local"
                    keyboardType="phone-pad"
                />
                <Button title="get Location" onPress={userLocation} />
                <Button title="Register" onPress={register} />
            </View>
        </View>
    );
};

export default register;

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
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
