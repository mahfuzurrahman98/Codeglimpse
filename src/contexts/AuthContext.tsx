import { FC, ReactNode, createContext, useState } from 'react';

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
    name: 'Arif',
    email: 'arifmahfuz99@gmail.com',
    token: 'auht789522#',
  });

  const value = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider };
