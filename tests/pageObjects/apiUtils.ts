import { APIRequestContext } from "@playwright/test";


class ApiUtils {

    async getCall(request: APIRequestContext, urlPath: string): Promise<number> {
        const response = await request.get(urlPath);
        const body = await response.json();
        console.log(JSON.stringify(body));
        return response.status();
    }
}

export default new ApiUtils();