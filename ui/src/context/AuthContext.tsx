import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Loader } from '../components/core';
import { getAuthToken, saveAuthToken } from '../utils/localStorage';

type User = {
  id: string;
  domain: 'admin' | 'user';
};

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_CONTEXT: AuthContextProps = {
  user: null,
  isLoading: false,
  setUser: () => {},
  setIsLoading: () => {},
};

const PRIVATE_PATHS = ['/admin', '/dashboard'];

export const AuthContext = createContext<AuthContextProps>(DEFAULT_CONTEXT);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUserFromAuthToken = async () => {
      const token = getAuthToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { user, refreshToken } = await api.auth.authVerifyToken(token);
        saveAuthToken(refreshToken);
        setUser(user);
      } catch (e: any | unknown) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUserFromAuthToken();
  }, []);

  useEffect(() => {
    if (PRIVATE_PATHS.some((path) => location.pathname.includes(path)) && !user && !isLoading) {
      navigate('/login');
    }
    if (location.pathname.includes('/login') && user && !isLoading) {
      navigate(user.domain === 'admin' ? '/admin' : '/dashboard');
    }
  }, [location.pathname, user, navigate]);

  useEffect(() => {
    if (error) {
      navigate(`/500?error=${error}`);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>{children}</AuthContext.Provider>;
};
