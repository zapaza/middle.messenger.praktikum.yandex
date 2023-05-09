enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type HttpMethod = keyof typeof METHOD;

interface RequestHeaders {
  [key: string]: string;
}

export interface RequestBody {
  [key: string]: string | number | boolean;
}

export abstract class HTTPBaseRequest {
    protected xhr: XMLHttpRequest;

    constructor() {
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

    public async sendRequest<T>(
        method: HttpMethod,
        url: string,
        headers?: RequestHeaders,
        data?: RequestBody,
    ): Promise<T> {
        if (method === METHOD.GET && data) {
            const queryString = this.objectToQueryString(data);
            url = `${url}?${queryString}`;
            data = undefined;
        }

        this.xhr.open(method, url);

        if (headers) {
            for (const key in headers) {
                this.xhr.setRequestHeader(key, headers[key]);
            }
        }

        return new Promise<T>((resolve, reject) => {
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

            if (method === METHOD.GET) {
                this.xhr.send();
            } else {
                this.xhr.send(data as  Document | XMLHttpRequestBodyInit | null | undefined);
            }

        });
    }

    public async get<T>(
        url: string,
        headers?: RequestHeaders,
        data?: RequestBody,
    ): Promise<T> {
        return await this.sendRequest<T>('GET', url, headers, data);
    }

    public async post<T>(
        url: string,
        headers?: RequestHeaders,
        data?: RequestBody,
    ): Promise<T> {
        return await this.sendRequest<T>('POST', url, headers, data);
    }

    public async put<T>(
        url: string,
        headers?: RequestHeaders,
        data?: RequestBody,
    ): Promise<T> {
        return await this.sendRequest<T>('PUT', url, headers, data);
    }

    public async delete<T>(
        url: string,
        data?:RequestBody,
        headers?: RequestHeaders,
    ): Promise<T> {
        return await this.sendRequest<T>('DELETE', url, headers, data);
    }

    public async patch<T>(
        url: string,
        headers?: RequestHeaders,
        data?: RequestBody,
    ): Promise<T> {
        return await this.sendRequest<T>('PATCH', url, headers, data);
    }
}
