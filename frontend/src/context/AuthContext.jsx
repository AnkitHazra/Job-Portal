import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user);
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // Load user from localStorage immediately (faster)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoading(false);
      } catch (e) {
        // If parsing fails, fetch from API
        fetchUser();
      }
    } else {
      fetchUser();
    }
  }, []);

  const register = async (userData) => {
    const data = await registerUser(userData);
    return data;
  };

  const login = async (userData) => {
    const data = await loginUser(userData);
    
    // ✅ Set user immediately from login response
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // ✅ Optionally fetch fresh data in background
    // This updates the user with complete profile data
    fetchUser();
    
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
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