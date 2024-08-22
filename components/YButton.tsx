import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { alignCenter, centerItems } from "@/constants/Styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

const YButton = ({
    width,
    height,
    func,
    color,
    title,
    disable,
    style,
}: any) => {
    return (
        <TouchableOpacity
            style={[
                styles.buttonContainer,
                centerItems,
                {
                    backgroundColor: disable
                        ? "gray"
                        : color
                        ? color
                        : "#5bafda",
                    width,
                    height,
                },
                style,
            ]}
            disabled={disable}
            onPress={func ? func : null}
        >
            <Text
                style={[{ color: "white", fontWeight: "bold", fontSize: 16 }]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default YButton;

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        height: 48,
        borderRadius: 15,
    },
});
