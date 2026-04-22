import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { apiBaseURL } from '../../constants/apiBaseUrl';
import type { paths } from '../../types/api';

const fetchClient = createFetchClient<paths>({
    baseUrl: apiBaseURL,
});
/*
fetchClient.use({
    async onRequest({ request }) {
        const token = await getAuthToken();
        if (!token) {
            return;
        }

        const headers = new Headers(request.headers);
        headers.set('Authorization', token);
        return new Request(request, { headers });
    },
    async onResponse({ response }) {
        if (response.status !== 401) {
            return;
        }

        await setAuthToken(null);
    },
});
*/
export const apiClient = createClient<paths>(fetchClient);
