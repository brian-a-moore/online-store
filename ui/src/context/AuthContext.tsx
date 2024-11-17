import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

enum Role {
  ADMIN = 'admin', // CRUD on all stores, CRUD on owners, CRUD on managers, CRUD on products, CRUD on items
  OWNER = 'owner', // RUD their own store, CRUD on own managers, products, and items
  MANAGER = 'manager', // CRUD on own store products and items
}

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>{children}</AuthContext.Provider>;
};
