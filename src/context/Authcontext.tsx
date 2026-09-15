import React, { createContext, useContext } from 'react';

import { useAuth as useClerkAuth, useUser } from '@clerk/react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'team' | 'enterprise';
  createdAt: string;
  emailVerified: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoaded, userId, signOut } = useClerkAuth();
  const { user: clerkUser } = useUser();

  const convertClerkUserToAppUser = (clerkUser: any): User => {
    return {
      id: clerkUser?.id || '',
      email: clerkUser?.emailAddresses[0]?.emailAddress || '',
      name: `${clerkUser?.firstName || ''} ${
        clerkUser?.lastName || ''
      }`.trim(),
      avatar: clerkUser?.imageUrl,
      plan: 'free',
      createdAt:
        clerkUser?.createdAt?.toISOString() || new Date().toISOString(),
      emailVerified:
        clerkUser?.emailAddresses[0]?.verification?.status === 'verified' ||
        false,
    };
  };

  const user = clerkUser ? convertClerkUserToAppUser(clerkUser) : null;

  // Mock login - handled by Clerk
  const login = async (_email: string, _password: string): Promise<void> => {
    throw new Error('Use Clerk SignIn component instead');
  };

  // Mock signup - handled by Clerk
  const signup = async (
    _email: string,
    _password: string,
    _name: string
  ): Promise<void> => {
    throw new Error('Use Clerk SignUp component instead');
  };

  // Logout Function
  const logout = async (): Promise<void> => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout error:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!userId && isLoaded,
        login,
        signup,
        logout,
        isLoading: !isLoaded,
        error: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext;