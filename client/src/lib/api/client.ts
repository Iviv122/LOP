import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { Middleware } from "openapi-fetch";
import { GetAuthToken} from "../../atoms/token";
import { baseUrl } from "../utils/baseUrl";
import type { paths } from "../../types/schema";
import BadAuth from "../auth/utils/logout";


const myMiddleware: Middleware = {
    async onRequest({ request, options }) {
        const token = GetAuthToken();
        if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
        }

        return request;
    },
    async onResponse({ request, response, options }) {
        
        if(response.status === 401){
            BadAuth();
        }

        return response;
    },
};
const fetchClient = createFetchClient<paths>({
    baseUrl: baseUrl
})

fetchClient.use(myMiddleware);
export const apiClient = createClient(fetchClient)
