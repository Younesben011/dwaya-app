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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={DefaultTheme}>
            <AuthProvider>
                <Stack>
                    {/* <Stack.Screen
                        name="register"
                        options={{ headerShown: true }}
                    /> */}
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="home"
                        options={{
                            headerRight: () => (
                                <Button
                                    title="Login"
                                    onPress={() => {
                                        router.navigate("/login");
                                    }}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen name="createPost" />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </AuthProvider>
        </ThemeProvider>
    );
}
