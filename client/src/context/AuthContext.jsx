import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, signoutRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [errors, setErrors] = useState([]);
  const [signinErrors, setSigninErrors] = useState([]); 

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
      setSigninErrors([]); 
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setSigninErrors(error.response.data);
      } else {
        setSigninErrors([error.response.data.message]);
      }
    }
  };

  const signout = async () => {
    try {
      await signoutRequest(); 
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove('token'); 
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false); 
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false); 
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        signout,
        user,
        isAuthenticated,
        loading, // Incluye esto en el provider
        errors,
        signinErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
