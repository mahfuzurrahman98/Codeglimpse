import { FC, ReactNode, createContext, useState } from 'react';

import { AuthContextType } from '../types';

const initialAuthState = {
  name: '',
  email: '',
  picture: '',
  token: '',
};

export const AuthContext = createContext<AuthContextType>({
  auth: initialAuthState,
  setAuth: (newAuthState: { name: string; email: string; token: string }) => {
    console.log(newAuthState);
  },
});

const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState(initialAuthState);

  const value = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider };
