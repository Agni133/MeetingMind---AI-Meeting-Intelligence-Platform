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

  const [localUser, setLocalUser] = React.useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('meetingmind_demo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const convertClerkUserToAppUser = (clerkUser: any): User => {
    return {
      id: clerkUser?.id || '',
      email: clerkUser?.emailAddresses[0]?.emailAddress || '',
      name: `${clerkUser?.firstName || ''} ${
        clerkUser?.lastName || ''
      }`.trim() || 'Alex Mercer',
      avatar: clerkUser?.imageUrl,
      plan: 'free',
      createdAt:
        clerkUser?.createdAt?.toISOString() || new Date().toISOString(),
      emailVerified:
        clerkUser?.emailAddresses[0]?.verification?.status === 'verified' ||
        false,
    };
  };

  const user = clerkUser ? convertClerkUserToAppUser(clerkUser) : localUser;

  // Direct / Demo login (allows bypassing phone verification immediately)
  const login = async (email: string, _password?: string): Promise<void> => {
    const demoUser: User = {
      id: 'usr_demo_' + Date.now(),
      email: email || 'alex@meetingmind.ai',
      name: email.split('@')[0] ? email.split('@')[0].replace('.', ' ') : 'Alex Mercer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
      plan: 'free',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };
    setLocalUser(demoUser);
    try {
      localStorage.setItem('meetingmind_demo_user', JSON.stringify(demoUser));
    } catch {
      // ignore
    }
  };

  // Direct / Demo signup
  const signup = async (
    email: string,
    _password: string,
    name: string
  ): Promise<void> => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      email: email || 'user@meetingmind.ai',
      name: name || 'Team Member',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
      plan: 'free',
      createdAt: new Date().toISOString(),
      emailVerified: true,
    };
    setLocalUser(newUser);
    try {
      localStorage.setItem('meetingmind_demo_user', JSON.stringify(newUser));
    } catch {
      // ignore
    }
  };

  // Logout Function
  const logout = async (): Promise<void> => {
    try {
      setLocalUser(null);
      localStorage.removeItem('meetingmind_demo_user');
      if (userId) {
        await signOut();
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isAuthenticated = (!!userId && isLoaded) || !!localUser;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        isLoading: !isLoaded && !localUser,
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