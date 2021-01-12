import { useContext } from "react";
import jwtDecode from "jwt-decode";
import AuthContext from "../api/authContext";
import { setToken, removeToken } from "../api/storage";

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const user = jwtDecode(authToken);
    setUser(user);
    console.log(user);
    setToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    removeToken();
  };

  return { user, logIn, logOut };
}
