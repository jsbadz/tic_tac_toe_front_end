export const useApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!useApiUrl) {
  throw new Error("API URL is not defined in environment variables");
}
