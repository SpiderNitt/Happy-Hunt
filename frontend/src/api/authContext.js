import React, { createContext, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");
  const expiresAt = localStorage.getItem("expiresAt");

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");
    setAuthState({});
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const isAdmin = () => {
    const adminRoles = ["Admin", "SuperAdmin"];
    return adminRoles.includes(authState.userInfo.Role);
  };

  const isSuperAdmin = () => {
    return authState.userInfo.Role === "SuperAdmin";
  };

  const isSuperAdmin = () => {
    return authState.userInfo.Role === "SuperAdmin";
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
        isSuperAdmin,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
