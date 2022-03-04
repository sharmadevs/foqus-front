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
                return res.data;
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
