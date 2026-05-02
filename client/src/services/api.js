import api from "../config/axios";

export const apiCall = async (endpoint, options = {}) => {
  try {
    const {
      method = "GET",
      body,
      data,
      headers: customHeaders = {},
      params,
      timeoutMs = 10000,
      ...rest
    } = options;

    // const token = localStorage.getItem("authToken");
    const token = localStorage.getItem("token")
    const payload = data ?? (typeof body === "string" ? JSON.parse(body) : body);

    const response = await api.request({
      url: endpoint,
      method,
      data: payload,
      params,
      timeout: timeoutMs,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...customHeaders,
      },
      ...rest,
    });

    return response.data;
  // } catch (error) {
  //   if (error.code === "ECONNABORTED") {
  //     throw new Error("API timeout: Request took too long");
  //   }
  //   throw new Error(error?.response?.data?.message || error.message || "API request failed");
  // }
  } catch (error) {
  if (error.code === "ECONNABORTED") {
    throw new Error("API timeout: Request took too long");
  }

  if (error?.response?.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  throw new Error(
    error?.response?.data?.message || "Request failed, please try again"
  );
}
};
