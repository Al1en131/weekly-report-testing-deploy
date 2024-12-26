export const setTokenWithExpiration = (
  data: any,
  expirationTimeInSecond: number
) => {
  const expirationTimestamp = Date.now() + expirationTimeInSecond * 1000;
  const tokenData = {
    token: data.authorization.token,
    id: data.user.uuid,
    expiresAt: expirationTimestamp,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(tokenData));
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const { token, expiresAt } = JSON.parse(tokenData);
      const currentTime = Date.now();
      if (currentTime < expiresAt) {
        return token;
      } else {
        localStorage.removeItem("token");
      }
    }
  }
  return null;
};
export const getId = () => {
  if (typeof window !== "undefined") {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const { token, expiresAt, id } = JSON.parse(tokenData);
      const currentTime = Date.now();
      if (currentTime < expiresAt) {
        return id;
      } else {
        localStorage.removeItem("token");
      }
    }
  }
  return null;
};
export const removeToken = () => {
  if (typeof window !== "undefined") {
    const tokenData = localStorage.removeItem("token");
  }
  return null;
};
