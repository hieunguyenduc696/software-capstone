import { API_STATUS, HTTP_METHOD } from "../config/common";
import queryString from "query-string";

const API_HOST = 'http://localhost:8090';


export const makeRequest = async (
    method: string,
    url: string,
    data?: any | null,
    redirectToLogin = true
) => {

    console.log(`URL: ${API_HOST}${url}`);
    try {
        let res: any = null;
        if (method === HTTP_METHOD.GET || method === HTTP_METHOD.DELETE) {
            res = await (
                await fetch(`${API_HOST}${url}?${queryString.stringify(data)}`, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": "Bearer " +
                    },
                })
            ).json();
        } else {
            res = await (
                await fetch(`${API_HOST}${url}`, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data || {}),
                })
            ).json();
    
            console.log(res);
        }
        if (redirectToLogin && res && res.status === API_STATUS.UNAUTHORIZED) {
            window.location.href = `/login?url=${window.location.pathname}${window.location.search}`;
        }
        return res;

    } catch (error) {
        console.log(error);
    }

};
