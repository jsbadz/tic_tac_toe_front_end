// src/config/axiosClient.ts
import axios, { AxiosRequestConfig, Method } from "axios";
import { useApiUrl } from "@/app/config/useAPI";

const axiosClient = axios.create({
  baseURL: useApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic request wrapper
export const useRequest = async <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axiosClient.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("Axios request error:", error.response || error.message);
    throw error;
  }
};
/*
GET
const GET = await request("get", "/sessions");

GET by ID
const GET_BY_ID = await request("get", "/sessions/1");

POST
const POST = await request("post", "/sessions", { playerOne: "Alice", playerTwo: "Bob" });

PUT
const PUT = await request("put", "/sessions/1", { player

DELETE
const DELETE = await request("delete", "/sessions/1");

 */
