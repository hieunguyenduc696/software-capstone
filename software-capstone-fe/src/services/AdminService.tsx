import { HTTP_METHOD } from "config/common";
import { makeRequest } from "./api";

const READING_URI = "/reading-skill"
const ADMIN_URI = "/admin"


export const createTest = async (data: any) => {
    console.log('DATA: ',data);
    const res = await makeRequest(HTTP_METHOD.POST,READING_URI + ADMIN_URI + "/test/create", data);
    return res;
}

export const getTestWithID = async (data: any) => {
    console.log('ID: ',data?.ID);
    const res = await makeRequest(HTTP_METHOD.GET,READING_URI + ADMIN_URI + `/test/${data?.ID}`, null);
    return res;
}

export const getTestList = async (data: any) => {
    const res = await makeRequest(HTTP_METHOD.GET,READING_URI + ADMIN_URI + `/test/?limit=${data?.limit}&page=${data?.page}`, null);
    return res;
}

export const test = async () => {
    const res = makeRequest(HTTP_METHOD.GET, "/reading-skill/admin/test/test-db");
    return res;
}

export const postWallpaper = (image: File) => {
    const res = makeRequest(HTTP_METHOD.GET, READING_URI + "/resource/paragraph/wallpaper", image);
    return res;
}

export const deleteTest = () => {}
export const updateTest = () => {}