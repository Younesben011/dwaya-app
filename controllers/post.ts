import { URL } from "@/env";
import { uploadImage } from "@/utils/uploadImage";
import axios from "axios";

const APIURL = `${URL}posts`;

export const createPost = async (postProps: any) => {
    try {
        let uploadRespond;
        let ParesedRes;
        if (postProps.images.length > 0) {
            uploadRespond = await uploadImage(postProps.images);
            ParesedRes = JSON.parse(uploadRespond);
            console.log(
                "🚀 ~ register ~ uploadRespond.image:",
                ParesedRes.image
            );
            postProps = {
                ...postProps,
                images: ParesedRes.image,
            };
        }

        console.log(`${APIURL}/create`);
        const respond = await axios.post(`${APIURL}/create`, postProps);
        return respond;
    } catch (error) {
        console.log(error);
        return { error: true, msg: "error" };
        // return {error:true,msg:error.response.data.msg}
    }
};
export const search = async (keyWord: String) => {
    try {
        console.log(`${APIURL}`);
        const respond = await axios.get(`${APIURL}?keyWord=${keyWord}`);
        return respond;
    } catch (error) {
        console.log(error);
        // return { error: true, msg: "error" };
        // return {error:true,msg:error.response.data.msg}
    }
};
