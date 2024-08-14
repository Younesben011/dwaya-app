import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { usePost } from "@/hooks/PostContext";
import Spacer from "@/components/Spacer";
import { router } from "expo-router";
import { createPost } from "@/controllers/post";

const CreatePost = () => {
    interface Postprops {
        medicine?: String;
        discretion?: String;
        category?: String;
        price?: Number;
        images?: String[];
    }
    const [postProps, setpostProps] = useState<Postprops | any>({ images: [] });

    const addPost = async () => {
        console.log(postProps);
        const respond = await createPost(postProps);
        if ((respond as { error: boolean; msg: string }).error) return;
        console.log(respond);
        router.replace("/pharmaHome");
    };
    return (
        <View>
            <Text style={styles.text}>Create Post</Text>
            <View>
                <TextInput
                    onChangeText={(text: String) => {
                        setpostProps({ ...postProps, medicine: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="medicine"
                />
                <Spacer v={20} />
                <TextInput
                    onChangeText={(text: String) => {
                        setpostProps({ ...postProps, discretion: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="discretion"
                />
                <TextInput
                    onChangeText={(text: String) => {
                        setpostProps({ ...postProps, category: text });
                    }}
                    style={styles.InputContainer}
                    placeholder="category"
                />
                <TextInput
                    onChangeText={(text: String) => {
                        setpostProps({ ...postProps, price: Number(text) });
                    }}
                    style={styles.InputContainer}
                    keyboardType="number-pad"
                    placeholder="price"
                />

                <Button title="create" onPress={addPost} />
            </View>
        </View>
    );
};

export default CreatePost;

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
