export const useApiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_LOCAL!
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION!;

// Optional runtime check
if (!useApiUrl) {
  throw new Error("API URL is not defined in environment variables");
}
