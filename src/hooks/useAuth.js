import { useLayoutEffect } from "react";
import { login as loginService } from "../services/auth";
import { useLocalStorage } from "./useLocalStorage";
import { handleTokenUpdate } from "../services/utils";

const initialAuth = {
  user: null,
};
export function useAuth() {
  const [{ user, token }, setUser] = useLocalStorage(
    "library-user",
    initialAuth
  );

  useLayoutEffect(() => {
    handleTokenUpdate(token);
  }, [token]);

  async function login(credetials) {
    try {
      const userInfo = await loginService(credetials);
      console.log(userInfo);
      setUser(userInfo);
    } catch (error) {
      throw error.data.message || "Error";
    }
  }

  function logout() {
    setUser(initialAuth);
  }

  return {
    login,
    logout,
    user,
  };
}
