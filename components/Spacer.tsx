import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface SpacerProps {
    h?: number;
    v?: number;
}

const Spacer = ({ h, v }: SpacerProps) => {
    return <View style={{ width: h, height: v }}></View>;
};

export default Spacer;

const styles = StyleSheet.create({});
