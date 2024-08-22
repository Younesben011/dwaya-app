import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";
import { URL } from "@/env";

interface authStateType {
    token: String | null;
    authenticated: Boolean | null;
    pharma_id: String | null;
}
interface authType {
    onRegister?: (registerProps: any) => Promise<any>;
    onlogin?: (login: String, password: String) => Promise<any>;
    onlogout?: () => void;
    onupdate?: (props: any, id: String) => void;
    authState?: authStateType;
    tokenLoading: boolean;
}

const AuthContext = createContext<authType>({ tokenLoading: true });

const APIURL = `${URL}auth`;

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<authStateType>({
        token: null,
        authenticated: null,
        pharma_id: null,
    });
    const [tokenLoading, setTokenLoading] = useState(true);
    console.log("token:", authState);
    useEffect(() => {
        const loadToken = async () => {
            // await SecureStore.setItemAsync("token", respond.data.token)
            const token = await SecureStore.getItemAsync("token");
            const id = await SecureStore.getItemAsync("id");
            if (token) {
                setAuthState({
                    token: token,
                    authenticated: true,
                    pharma_id: String(id),
                });
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;

                // setReload((prev) => !prev);
            }
        };
        loadToken();
        // console.log(authState);
    }, []);

    // {
    //     username,password,email,firstname,lastname,gender,phonenumber,profilepicture,address,
    //     usertype,
    // }
    const uploadImage = async (image: any) => {
        const respond = await FileSystem.uploadAsync(URL + "upload", image, {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file",
        });
        return respond.body;
    };
    const update = async (props: any, id: any) => {
        console.log(`${URL}update?id=${id}`);
        try {
            const res = await axios.post(
                `${URL}users/update?id=${id}`,
                {
                    user: props,
                },
                { timeout: 10000 }
            );
            if (res.status == 200) {
                console.log("secceed");
                return true;
            }
        } catch (error) {
            console.log("🚀 ~ updateBio ~ error:", error);
        }
        return false;
    };
    const register = async (registerProps: any) => {
        try {
            let uploadRespond;
            let ParesedRes;
            if (registerProps.pharmaPicture) {
                uploadRespond = await uploadImage(registerProps.pharmaPicture);
                ParesedRes = JSON.parse(uploadRespond);
                console.log(
                    "🚀 ~ register ~ uploadRespond.image:",
                    ParesedRes.image
                );
                registerProps = {
                    ...registerProps,
                    profilepicture: ParesedRes.image,
                };
            }

            await axios.post(`${APIURL}/register`, registerProps, {
                timeout: 10000,
            });
            const respond = await login(
                registerProps.email,
                registerProps.password
            );
            return respond;
        } catch (error) {
            console.log(error);
            return { error: true, msg: "error" };
            // return {error:true,msg:error.response.data.msg}
        }
    };

    const login = async (email: String, password: String) => {
        try {
            console.log(`${APIURL}/login`);
            const respond = await axios.post(
                `${APIURL}/login`,
                {
                    email,
                    password,
                },
                { timeout: 10000 }
            );
            console.log("sss");
            console.log(respond.status);
            if (respond.status != 200) return { error: true, res: respond };

            authState.token = respond.data.token;
            authState.authenticated = true;
            authState.pharma_id = respond.data.pharma_id;

            setAuthState({ ...authState });
            // console.log("🚀 ~ file: AuthContext.jsx:80 ~ login ~ authState:", authState)

            await SecureStore.setItemAsync("token", respond.data.token);
            await SecureStore.setItemAsync("id", respond.data.pharma_id);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${respond.data.token}`;

            return respond.data;
        } catch (error: any) {
            console.log(error.message);
            if (error.message === "Request failed with status code 400")
                return { error: true, message: "wrong email or password" };
            else return { error: true, message: "TimeOut.." };
        }
    };

    const logout = async () => {
        // Delete token from storage
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("id");

        // Update HTTP headers
        axios.defaults.headers.common["Authorization"] = "";

        //Reset Auth state
        setAuthState({
            token: null,
            authenticated: null,
            pharma_id: null,
        });
        return true;
    };

    const value = {
        onRegister: register,
        onlogin: login,
        onlogout: logout,
        onupdate: update,
        authState,
        tokenLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
