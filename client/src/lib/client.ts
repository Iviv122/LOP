import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { Middleware } from "openapi-fetch";
import type { paths } from "../types/schema";
import { store } from "./store";
import { RemoveAuthToken, tokenAtom } from "../atoms/token";
import { baseUrl } from "./baseUrl";


const myMiddleware: Middleware = {
    async onRequest({ request, options }) {
        const token = store.get(tokenAtom);
        if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
        }

        return request;
    },
    async onResponse({ request, response, options }) {
        const { body, ...resOptions } = response;

        if (resOptions.status === 401) {
            RemoveAuthToken();
        }

        return response;
    },
};
const fetchClient = createFetchClient<paths>({
    baseUrl: baseUrl
})

fetchClient.use(myMiddleware);
export const apiClient = createClient(fetchClient)
