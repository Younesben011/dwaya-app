import {
    Button,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "@/components/Spacer";
import { router } from "expo-router";
import { search } from "@/controllers/post";
import YInput from "@/components/YInput";
import Ymed from "@/components/Ymed";

const Home = () => {
    const [data, setData] = useState([]);
    const [shearchAppear, setShearchAppear] = useState(false);
    const searchref = useRef(null);
    const showSearch = () => {
        console.log("search");
        setShearchAppear(true);
    };
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
        <TouchableWithoutFeedback
            onPress={() => {
                setShearchAppear(false);
                Keyboard.dismiss();
            }}
        >
            <SafeAreaView style={styles.container}>
                {!shearchAppear && (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            gap: 70,
                            width: "80%",
                        }}
                    >
                        <View>
                            <Text style={styles.text}>Wellcome to </Text>
                            <Text style={[styles.text, { marginLeft: 20 }]}>
                                dwayaApp 👋
                            </Text>
                        </View>
                    </View>
                )}
                <Spacer v={20} />
                <View style={styles.searchForm}>
                    <YInput
                        focusFun={showSearch}
                        placeholder="Search"
                        func={findPost}
                    />
                </View>
                <Spacer v={20} />

                {data.map((item: any) => {
                    return <Ymed key={item.med} item={item} />;
                })}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default Home;

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 10,
    },

    container: {
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
    },
    searchForm: {
        width: "80%",
    },
});
