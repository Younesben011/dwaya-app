import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import React, { useRef, useState } from "react";
import { shadowProps } from "@/constants/Styles";

type InputType = "email-address" | "default" | "numeric" | "phone-pad";
const YInput = ({
    placeholder,
    func,
    focusFun,
    disable,
    returnKeyType,
    inputType: InputType,
}: any) => {
    const focused = () => {
        console.log("ssss");
    };
    const searchRef = useRef<TextInput>(null);
    const [text, setText] = useState("");
    return (
        <View>
            <TextInput
                onFocus={focusFun ? focusFun : null}
                placeholder={placeholder}
                ref={searchRef}
                onChangeText={(e) => {
                    setText(e);
                    func ? func(e) : null;
                }}
                style={[
                    styles.input,
                    shadowProps,
                    { backgroundColor: disable ? "#cccbca" : "white" },
                ]}
                placeholderTextColor="gray"
                returnKeyType={returnKeyType ? returnKeyType : "done"}
                onSubmitEditing={() => {
                    func ? func(text) : null;
                }}
                editable={!disable}
                keyboardType={InputType}
            />
        </View>
    );
};

export default YInput;

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        borderRadius: 15,
        padding: 12,
        shadowColor: "#000",
        // borderWidth: 1,
        backgroundColor: "white",
        alignSelf: "center",
        // flex: 1,
    },
});
