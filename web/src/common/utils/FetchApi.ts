interface FetchOptions extends Omit<RequestInit, 'method'> {
  token?: string;
}

export default class FetchApi {
  static async get<T>(url: string, options: Omit<FetchOptions, 'body'> = {}) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : '',
        ...options.headers,
      } as HeadersInit,
      ...options,
    });

    return await FetchApi.extractData<T>(response);
  }

  static async post<T>(url: string, options: FetchOptions = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: options.token ? `Bearer ${options.token}` : '',
        ...options.headers,
      } as HeadersInit,
      body: options.body,
    });

    return await FetchApi.extractData<T>(response);
  }

  static async patch<T>(url: string, options: FetchOptions = {}) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: options.token ? `Bearer ${options.token}` : '',
        ...options.headers,
      } as HeadersInit,
      body: options.body,
    });

    return await FetchApi.extractData<T>(response);
  }

  private static async extractData<T>(response: Response) {
    let content;

    try {
      content = await response.json();
    } catch {
      if (!response.ok) {
        throw new Error(
          `Ocorreu um erro inesperado com o servidor. Tente novamente mais tarde.`,
        );
      }
    }

    if (!response.ok) {
      throw new Error(content?.message);
    }

    return content as T;
  }
}
