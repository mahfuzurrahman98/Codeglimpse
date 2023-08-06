import { FC, ReactNode, createContext, useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
import axios from '../api/axios';

type AuthContextType = {
  auth: {
    name: string;
    email: string;
    token: string;
  };
  setAuth: (auth: { name: string; email: string; token: string }) => void;
};

const initialAuthState = {
  name: '',
  email: '',
  token: '',
};

export const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: (newAuthState: { name: string; email: string; token: string }) => {
    console.log(newAuthState);
  },
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState({
    name: '',
    email: '',
    token: '',
  });

  const logout = async () => {
    try {
      const response = await axios.post('/users/auth/logout');
      console.log(response);
      setAuth(initialAuthState);
      // <Navigate to="/login" replace />;
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    try {
      const response = await axios.post('/users/auth/refreshtoken');
      console.log(response);
      const data = response.data.data;

      setAuth({
        name: data.user.name,
        email: data.user.email,
        token: data.access_token,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    // on every refresh the app get mounted
    // send a request using refresh token
    (async () => {
      const refreshSuccess = await refresh();
      if (!refreshSuccess) {
        logout();
      }
    })();

    // the accesstoken is valid for 15 minutes
    // 15 minutes after the app is mounted, the user needs to be automatically logged out
    const refreshTokenInterval = setInterval(async () => {
      // insted of logging out, we can refresh the token
      // if (auth.token === '') return;
      const refreshSuccess = await refresh();
      if (!refreshSuccess) {
        logout();
      }
    }, 60 * 1000);

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [auth.token]);

  const value = {
    auth,
    setAuth,
    // logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider };
