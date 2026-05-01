const safeParse = (value) => {
  try {
    return JSON.parse(value || "null");
  } catch {
    return null;
  }
};

export const readStoredUser = () => safeParse(localStorage.getItem("user"));

export const readStoredToken = () => localStorage.getItem("authToken");

export const decodeJwtPayload = (token) => {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    return null;
  }

  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

export const getTokenExpiryMs = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return null;
  }

  return payload.exp * 1000;
};

export const isTokenExpired = (token) => {
  const expiryMs = getTokenExpiryMs(token);
  return typeof expiryMs === "number" ? expiryMs <= Date.now() : false;
};

export const clearStoredAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
};

export const persistAuth = ({ token, user }) => {
  if (token) {
    localStorage.setItem("authToken", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    if (user.id) {
      localStorage.setItem("userId", user.id);
    }
  }
};