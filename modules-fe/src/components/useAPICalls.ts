/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { isJwtExpired } from "jwt-check-expiration";
import { ApiServer, endpoints, Endpoints } from "./APIRoutes";
import AuthContext from "../context/AuthProvider";

const useAPICalls = () => {
  const { auth, setAuth } = useContext(AuthContext);

  function setUrl(
    path: Endpoints,
    params: Record<string, string | number | undefined>
  ) {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    const apiServer = ApiServer();
    return apiServer + endpoints[path] + (queryString ? `?${queryString}` : "");
  }

  const refreshToken = async () => {
    const headers = { "Content-type": "application/json" };
    const url = setUrl("refresh-token", {});
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ refresh: auth.refresh }),
      });

      const data = await response.json();
      if (data.access) {
        setAuth({ access: data.access, refresh: auth.refresh });
        return data.access;
      }
      setAuth({});
    } catch (error) {
      console.log(error);
    }
    return "";
  };

  const setHeaders = async (extraHeader = {}) => {
    const header: Record<string, string> = {
      "Content-type": "application/json",
      ...extraHeader,
    };

    if (auth.refresh) {
      let token = auth.access;
      if (isJwtExpired(token)) {
        token = await refreshToken();
      }
      if (token) {
        header.authorization = token;
      }
    }

    return header;
  };

  const getMethod = async <SuccessType = any>(
    path: Endpoints,
    query: Record<string, string | number | undefined>,
    extraHeader?: Record<string, string | undefined>
  ): Promise<{ data: SuccessType; response: any }> => {
    const url = setUrl(path, query);
    const headers = await setHeaders(extraHeader);

    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return { data, response };
  };

  const postMethod = async <SuccessType = any>(
    path: Endpoints,
    query: Record<string, string | number | undefined>,
    payload: any
  ): Promise<{ data: SuccessType | undefined; response: any }> => {
    const url = setUrl(path, query);
    const headers = await setHeaders({});

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return { data, response };
    } catch (error) {
      console.log(error);
      return { data: undefined, response: undefined };
    }
  };

  const patchMethod = async <SuccessType = any>(
    path: Endpoints,
    query: Record<string, string | number | undefined>,
    payload: any
  ): Promise<{ data: SuccessType | undefined; response: any }> => {
    const url = setUrl(path, query);
    const headers = await setHeaders({});

    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return { data, response };
  };

  const deleteMethod = async <SuccessType = any>(
    path: Endpoints,
    query: Record<string, string | number | undefined>,
    payload: any
  ): Promise<{ data: SuccessType | undefined; response: any }> => {
    const url = setUrl(path, query);
    const headers = await setHeaders({});

    const response = await fetch(url, {
      method: "DELETE",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return { data, response };
  };

  return { getMethod, postMethod, patchMethod, deleteMethod };
};

export default useAPICalls;
