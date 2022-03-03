import axios from "axios";
import { HttpResponse } from "./response-model";
import { API_BASE_URL } from "./url";

export default class Api {
    static async headers() {
        const token = localStorage.getItem("focus:token");
        return {
            "Authorization": "Bearer " + token || "",
            "Content-Type": "application/json",
        };
    }

    static get(route: string, params: any = null): Promise<HttpResponse<any>> {
        return this.xhr(route, params, "GET");
    }

    static post(route: string, params: any): Promise<HttpResponse<any>> {
        return this.xhr(route, params, "POST");
    }

    static put(route: string, params: any): Promise<HttpResponse<any>> {
        return this.xhr(route, params, "PUT");
    }

    static patch(route: string, params: any): Promise<HttpResponse<any>> {
        return this.xhr(route, params, "PATCH");
    }

    static delete(route: string, params: any): Promise<HttpResponse<any>> {
        return this.xhr(route, params, "DELETE");
    }

    static encodeUrlParams(obj: any) {
        return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    }

    static async xhr(route: string, params: any, method: any): Promise<HttpResponse<any>> {
        if (method === "GET" && params) {
            route = route + `?${this.encodeUrlParams(params)}`;
            params = null;
        }
        const headers = await Api.headers();
        console.log(headers);
        let options = Object.assign(
            {
                method: method,
                headers:headers,
                url: route,
                baseURL: API_BASE_URL,
            },
            params ? { data: params } : null
        );

        return axios(options)
            .then((res: any) => {
                // if (resp.status === 200 || resp.status === 201 || resp.status === 204) {
                return res.data;
                // } else if (resp.status === 401) {
                //     throw resp.data.message;
                // } else {
                //     throw resp;
                // }
            })
            .catch((error: any) => {
                if (error.response) {
                    throw error.response.data;
                } else if (error.request) {
                    throw error.request.data;
                } else {
                    throw error;
                }
            });
    }
}

/* import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from "./url";
let Api:AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Referer": "iaastha",
    }
  });
Api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error:AxiosError) => {
        console.log(error?.response?.status)
        // Do something with response error
        return Promise.reject(error);
    }
);
export default Api; */