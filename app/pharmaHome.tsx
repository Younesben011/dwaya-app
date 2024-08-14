import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { router } from "expo-router";
import { search } from "@/controllers/post";
import Spacer from "@/components/Spacer";

const PharmaHome = () => {
    const { onlogout } = useAuth();
    const [data, setData] = useState([]);
    console.log(data);

    const findPost = async (text: String) => {
        // setKeyWord(text);
        setData([]);
        if (text === "") {
            setData([]);
            console.log("empty");

            return;
        }
        const res = await search(text);
        let sRes: any = [];
        if (res) {
            res.data.map((item: any) => {
                sRes = [...sRes, { med: item.medicine, dis: item.discretion }];
            });
        }
        setData(sRes);
    };
    return (
        <View>
            <Text>pharmaHome</Text>
            <TextInput
                style={styles.InputContainer}
                onChangeText={findPost}
                placeholder="Search"
            />
            <Button
                title="Add Post"
                onPress={() => {
                    router.navigate("/createPost");
                }}
            />
            <Button
                title="Logout"
                onPress={() => {
                    onlogout!();
                    router.replace("/home");
                }}
            />
            {data.map((item: any) => {
                return (
                    <View
                        style={{ flexDirection: "row", gap: 20, width: "100%" }}
                    >
                        <Text style={{ fontWeight: "bold" }}>Medicine</Text>
                        <Text>{item.med}</Text>
                        <Text style={{ fontWeight: "bold" }}>discretion</Text>
                        <Text>{item.dis}</Text>
                        <Spacer v={30} />
                    </View>
                );
            })}
        </View>
    );
};

export default PharmaHome;

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
