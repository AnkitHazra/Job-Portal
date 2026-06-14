import {
  createContext,
  useContext,
  useEffect,
  useState,navigate
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logout
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchUser = async () => {
    try {
      const data =
        await getCurrentUser();

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (
    userData
  ) => {
    const data = await registerUser(
      userData
    );

    return data;
  };

  const login = async (
    userData
  ) => {
    const data = await loginUser(
      userData
    );

    setUser(data.user);

    return data;
  };


  const logout = async () => {
  try {
    await logoutUser();
    setUser(null);
  } catch (error) {
    console.log(error);
  }
};
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        fetchUser,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);