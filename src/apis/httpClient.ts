interface HttpHeaders {
  [headerName: string]: string;
}

interface RequestOptions {
  method: string;
  body: string;
  headers: HttpHeaders;
}

export class HttpClient {
  constructor(private baseURL: string) {}

  public get = async (endPoint: string, options?: RequestOptions) => {
    const response = await fetch(this.baseURL + endPoint, {
      method: "get",
      ...options,
    });

    if (response.ok) {
      return response;
    } else {
      throw response;
    }
  };
}
