import { HttpResponse, ZObject } from "zapier-platform-core";
import { request } from "http";

const handleHttpError = (response: HttpResponse, z: ZObject) => {
    if (response.status >= 400) {
        z.console.log(`Status: ${response.status}`);
        z.console.log(`Content: ${response.content}`);
        z.console.log(`Request: ${JSON.stringify(response.request)}`);

        throw new Error(`Got an unexpected response from Holiday API: ${response.content}`);
    }

    return response;
};

const Middleware = {
    HandleHttpError: handleHttpError
};

export default Middleware;