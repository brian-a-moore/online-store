import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type User = {
  id: string;
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

export const AuthContext = createContext<AuthContextProps>(DEFAULT_CONTEXT);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // TODO: Get auth token for local storage and check with API, set user automatically if it exists, do this while loading

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // TODO: add !isLoading to the condition so these won't fire before checking the auth token
    if (location.pathname.includes('/admin') && !user) {
      navigate('/login');
    }
    // TODO: add !isLoading to the condition so these won't fire before checking the auth token
    if(location.pathname.includes('/login') && user) {
      navigate('/admin');
    }
  }, [location.pathname, user, navigate]);

  // TODO: Handle the loading state here 

  return <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>{children}</AuthContext.Provider>;
};
