import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import YInput from "@/components/YInput";
import YButton from "@/components/YButton";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebase, firebaseConfig } from "@/firebase/firebaseConfig";
const phase01 = () => {
    const [showOtp, setShowOtp] = useState(false);
    const [numberClear, setNumberClear] = useState(false);
    const [phonenumber, setPhonenumber] = useState<string>("");
    const [code, setCode] = useState("");
    const [verificationId, setVerificationId] = useState<string>("");
    const recaptchaVerifier = useRef(null);
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        if (recaptchaVerifier.current) {
            phoneProvider
                .verifyPhoneNumber(phonenumber, recaptchaVerifier.current)
                .then(setVerificationId)
                .catch(console.log);
        }
    };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
                console.log("verified");
                setCode("");
            })
            .catch(console.log);
    };
    const numberHandler = (text: string) => {
        if (text.length === 10) {
            setNumberClear(true);
            console.log(`+213${text.slice(1)}`);
            setPhonenumber(`+213${text.slice(1)}`);
        } else setNumberClear(false);
    };
    const otpAuth = () => {
        if (!showOtp) {
            console.log("send");
            setShowOtp(true);
            sendVerification();
        } else {
            console.log("verify");
            confirmCode();
        }
    };
    return (
        <View style={styles.container}>
            {/* <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            /> */}
            <View style={[styles.TextView]}>
                <Text style={styles.icon}>☎</Text>
                <Text style={styles.header}>Your Phone</Text>
                <Text>Pleas enter your phone</Text>
            </View>
            <View style={[styles.form]}>
                <YInput
                    func={numberHandler}
                    disable={showOtp}
                    inputType="numeric"
                    placeholder="00 00 00 00 00"
                />
                {showOtp && <YInput func={setCode} placeholder="Otp" />}
            </View>
            <YButton
                disable={!numberClear}
                width="50%"
                height={45}
                title="continue"
                func={otpAuth}
            />
        </View>
    );
};

export default phase01;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    form: {
        width: "80%",
        gap: 20,
    },
    TextView: {
        marginTop: 50,
        alignItems: "center",
        gap: 10,
    },
    icon: {
        fontSize: 80,
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
    },
});
