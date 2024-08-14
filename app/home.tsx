import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@/components/Spacer";
import { router } from "expo-router";
import { search } from "@/controllers/post";

const Home = () => {
    const findPost = async (text: String) => {
        const res = await search(text);
        console.log(res);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Spacer v={20} />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: 70,
                }}
            >
                <View>
                    <Text style={styles.text}>Wellcome to </Text>
                    <Text style={[styles.text, { marginLeft: 20 }]}>
                        dwayaApp 👋
                    </Text>
                </View>
            </View>
            <TextInput
                style={styles.InputContainer}
                onChangeText={findPost}
                placeholder="Search"
            />
        </SafeAreaView>
    );
};

export default Home;

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
    container: {
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
        gap: 70,
    },
});
