import {IHTTPBaseRequest, METHOD, RequestOptions} from "../types";

export abstract class HTTPBaseRequest implements IHTTPBaseRequest {
    protected xhr: XMLHttpRequest;

    protected constructor() {
        this.xhr = new XMLHttpRequest();
    }

    protected objectToQueryString(obj: Record<string, string | number | boolean>): string {
        const keyValuePairs = [];

        for (const key in obj) {
            const value = obj[key];

            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    for (const item of value) {
                        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
                    }
                } else {
                    keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
                }
            }
        }

        return keyValuePairs.join('&');
    }

    public async sendRequest<Response, Data>(
        url: string,
        options: RequestOptions<Data>
    ): Promise<Response> {
        if (options.method === METHOD.GET && options.data) {
            const queryString = this.objectToQueryString(options.data);
            url = `${url}?${queryString}`;
        }

        this.xhr.open(options.method, url);

        if (options.headers) {
            for (const key in options.headers) {
                this.xhr.setRequestHeader(key, options.headers[key]);
            }
        }

        return new Promise<Response>((resolve, reject) => {
            this.xhr.onload = () => {
                if (this.xhr.status >= 200 && this.xhr.status < 300) {
                    resolve(JSON.parse(this.xhr.response));
                } else {
                    reject(this.xhr.statusText);
                }
            };

            this.xhr.onerror = () => {
                reject(this.xhr.statusText);
            };

            if (options.method === METHOD.GET) {
                this.xhr.send();
            } else {
                this.xhr.send(options.data as Document | XMLHttpRequestBodyInit | null | undefined);
            }
        });
    }

    public async get<Response, Params>(
        url: string,
        options: RequestOptions<Params>
    ): Promise<Response> {
        return await this.sendRequest<Response, Params>(url, options);
    }

    public async post<Response, Body>(
        url: string,
        options: RequestOptions<Body> = { method: METHOD.POST },
    ): Promise<Response> {
        return await this.sendRequest<Response, Body>(url, options);
    }

    public async put<Response, Body>(
        url: string,
        options: RequestOptions<Body> = { method: METHOD.PUT },
    ): Promise<Response> {
        return await this.sendRequest<Response, Body>(url, options);
    }

    public async patch<Response, Body>(
        url: string,
        options: RequestOptions<Body> = { method: METHOD.PATCH },
    ): Promise<Response> {
        return await this.sendRequest<Response, Body>(url, options);
    }

    public async delete<Response, Body>(
        url: string,
        options: RequestOptions<Body> = { method: METHOD.DELETE },
    ): Promise<Response> {
        return await this.sendRequest<Response, Body>(url, options);
    }

}
