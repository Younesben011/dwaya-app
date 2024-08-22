import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/hooks/AuthContext";
import { PostProvider } from "@/hooks/PostContext";
import { Button } from "react-native";
import { RegProvider } from "@/hooks/RegisterContex";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RegLayout() {
    return (
        <ThemeProvider value={DefaultTheme}>
            <AuthProvider>
                <RegProvider>
                    <Stack>
                        <Stack.Screen
                            name="phase01"
                            options={{ headerShown: false }}
                        />
                        {/* <Stack.Screen
                            name="phase02"
                            options={{ headerShown: false }}
                        /> */}
                        {/* <Stack.Screen
                            name="phase03"
                            options={{ headerShown: false }}
                        /> */}
                    </Stack>
                </RegProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
