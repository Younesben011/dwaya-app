import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import Spacer from "./Spacer";
import { shadowProps } from "@/constants/Styles";

const Ymed = ({ item }: any) => {
    return (
        <TouchableHighlight>
            <View style={[shadowProps, styles.medContainer]}>
                <Text style={{ fontWeight: "bold" }}>Medicine</Text>
                <Text>{item.med}</Text>
                <Text style={{ fontWeight: "bold" }}>discretion</Text>
                <Text>{item.dis}</Text>
            </View>
        </TouchableHighlight>
    );
};

export default Ymed;

const styles = StyleSheet.create({
    medContainer: {
        flexDirection: "column",
        width: "100%",
        height: 100,
        shadowColor: "black",
        backgroundColor: "white",
    },
});
