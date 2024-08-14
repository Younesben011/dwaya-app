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
    onCreate?: (postProps: any) => Promise<any>;
    onlogin?: (login: String, password: String) => Promise<any>;
    onlogout?: () => void;
    onupdate?: (props: any, id: String) => void;
    authState?: authStateType;
}

const PostContex = createContext<authType>({});

const APIURL = `${URL}posts`;

export const usePost = () => {
    return useContext(PostContex);
};

export const PostProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<authStateType>({
        token: null,
        authenticated: null,
        pharma_id: null,
    });
    const [reload, setReload] = useState(false);
    console.log(
        "🚀 ~ file: PostContex.jsx:31 ~ AuthProvider ~ authState:",
        authState
    );
    useEffect(() => {
        const loadToken = async () => {
            // await SecureStore.setItemAsync("token", respond.data.token)
            const token = await SecureStore.getItemAsync("token");
            const id = await SecureStore.getItemAsync("id");
            if (token) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
                setAuthState((prev) => ({
                    ...prev,
                    token: token,
                    authenticated: true,
                    pharma_id: String(id),
                }));
                setReload((prev) => !prev);
            }
        };
        loadToken();
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
            const res = await axios.post(`${URL}users/update?id=${id}`, {
                user: props,
            });
            if (res.status == 200) {
                console.log("secceed");
                return true;
            }
        } catch (error) {
            console.log("🚀 ~ updateBio ~ error:", error);
        }
        return false;
    };
    const addPost = async (postProps: any) => {
        try {
            let uploadRespond;
            let ParesedRes;
            if (postProps.images) {
                uploadRespond = await uploadImage(postProps.images);
                ParesedRes = JSON.parse(uploadRespond);
                console.log(
                    "🚀 ~ register ~ uploadRespond.image:",
                    ParesedRes.image
                );
                postProps = {
                    ...postProps,
                    profilepicture: ParesedRes.image,
                };
            }

            const respond = await axios.post(`${APIURL}/create`, postProps);
            return respond;
        } catch (error) {
            console.log(error);
            return { error: true, msg: "error" };
            // return {error:true,msg:error.response.data.msg}
        }
    };

    const login = async (email: String, password: String) => {
        console.log(`${APIURL}/login`);
        try {
            const respond = await axios.post(`${APIURL}/login`, {
                email,
                password,
            });
            console.log(respond.status);
            if (respond.status != 200) return { error: true, msg: "error" };

            authState.token = respond.data.token;
            authState.authenticated = true;
            authState.pharma_id = respond.data.pharma_id;

            setAuthState({ ...authState });
            // console.log("🚀 ~ file: PostContex.jsx:80 ~ login ~ authState:", authState)

            await SecureStore.setItemAsync("token", respond.data.token);
            await SecureStore.setItemAsync("id", respond.data.pharma_id);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${respond.data.token}`;

            return respond.data;
        } catch (error) {
            console.log(error);
            return { error: true, msg: "error" };
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
        onCreate: addPost,
        onlogout: logout,
        onupdate: update,
        authState,
    };

    return <PostContex.Provider value={value}>{children}</PostContex.Provider>;
};
