import {IHTTPBaseRequest, METHOD, RequestOptions} from "../types";
import {queryStringify} from "../../utils";

export class HTTPBaseRequest implements IHTTPBaseRequest {
  protected xhr: XMLHttpRequest;

  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  public async sendRequest<T>(
    url: string,
    options: RequestOptions
  ):Promise<T>  {
    // eslint-disable-next-line prefer-const
    let { headers = {}, method, data } = options;

    if (Object.keys(headers).length == 0 && !(data instanceof FormData)) {
      headers = {'Content-type': 'application/json; charset=UTF-8'};
    }

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new window.XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.withCredentials = true;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data as object)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        let resp: any = '';

        if (xhr.response === 'OK') {
          resp = { status: 'OK' };
        } else {
          resp = JSON.parse(xhr.response);
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(resp);
        } else {
          reject(resp);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        xhr.send(data);
      }
    });
  }

  public async get<T>(
    url: string,
    options?: RequestOptions
  ):Promise<T> {
    return await this.sendRequest<T>(url, {...options, method: METHOD.GET });
  }

  public async post<T>(
    url: string,
    options?: RequestOptions,
  ):Promise<T> {
    return await this.sendRequest(url, {...options, method: METHOD.POST});
  }

  public async put<T>(
    url: string,
    options: RequestOptions,
  ):Promise<T> {
    return await this.sendRequest(url, {...options, method: METHOD.PUT});
  }

  public async patch<T>(
    url: string,
    options: RequestOptions,
  ):Promise<T>{
    return await this.sendRequest(url, {...options, method: METHOD.PATCH});
  }

  public async delete<T>(
    url: string,
    options: RequestOptions,
  ):Promise<T> {
    return await this.sendRequest(url, {...options, method: METHOD.DELETE});
  }

}
