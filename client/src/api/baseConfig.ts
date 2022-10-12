import { AxiosRequestHeaders } from "axios";

const config = {
  baseURL: "http://localhost:4000/api",
};

interface config {
  baseURL?: string;
  headers?: AxiosRequestHeaders;
}

export const getUnauthenticatedConfig = (url: string = ""): config => {
  const getBaseURL = () => {
    const baseURL = config.baseURL;
    const updatedBaseURL = `${baseURL}${url}`;
    return updatedBaseURL;
  };
  const configuration = { ...config };
  configuration.baseURL = getBaseURL();
  return configuration;
};

export const getAuthenticatedConfig = (
  token: string,
  url: string = ""
): config => {
  const configuration = getUnauthenticatedConfig(url);
  configuration["headers"] = {};
  configuration["headers"]["Authorization"] = token;
  return configuration;
};
