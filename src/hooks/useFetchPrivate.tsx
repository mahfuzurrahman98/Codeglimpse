import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useLogout from './useLogout';
import useRefreshToken from './useRefreshToken';

const useFetchPrivate = () => {
  const [accessToken, setAccessToken] = useState<null | string>(null);
  const refreshToken = useRefreshToken();
  const logout = useLogout();
  const { auth } = useAuth();

  useEffect(() => {
    setAccessToken(auth.token);
  }, [auth.token]);

  const fetchPrivate = async (
    url: string,
    options: {
      method?: string;
      headers?: { [key: string]: string };
      body?: string;
    } = {}
  ) => {
    if (!accessToken) {
      return Promise.reject(new Error('Access token not available.'));
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (response.status === 401) {
        // Token expired, attempt to refresh it
        try {
          const newAccessToken = await refreshToken();
          setAccessToken(newAccessToken);
          headers.Authorization = `Bearer ${newAccessToken}`;
          const refreshedResponse = await fetch(url, { ...options, headers });
          return refreshedResponse;
        } catch (err) {
          console.error(err);
          logout();
          throw new Error('Failed to refresh token.');
        }
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return fetchPrivate;
};

export default useFetchPrivate;
