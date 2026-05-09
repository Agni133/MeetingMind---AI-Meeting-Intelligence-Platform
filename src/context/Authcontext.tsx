
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
 
// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;
 
// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'team' | 'enterprise';
  createdAt: string;
  emailVerified: boolean;
}
 
// Auth Context Type
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
  error: string | null;
}
 
// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);
 
  // Set up axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
 
        // If token expired, try to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
 
          try {
            await refreshToken();
            return axios(originalRequest);
          } catch (refreshError) {
            // Refresh failed, logout user
            await logout();
            return Promise.reject(refreshError);
          }
        }
 
        return Promise.reject(error);
      }
    );
 
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);
 
  // Check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      const response:any = await axios.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      // Not authenticated or token expired
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
 
  // Login Function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
 
    try {
      const response:any= await axios.post('/auth/login', {
        email: email.toLowerCase().trim(),
        password
      });
 
      setUser(response.data.user);
      
    // for debugging purposes 
      localStorage.setItem('userEmail', response.data.user.email);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
 
  // Signup Function
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
 
    try {
      // Validate input
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
 
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
 
      const response:any = await axios.post('/auth/signup', {
        email: email.toLowerCase().trim(),
        password,
        name: name.trim()
      });
 
      setUser(response.data.user);
      
      // Store email for convenience
      localStorage.setItem('userEmail', response.data.user.email);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
 
  // Logout Function
  const logout = async () => {
    setLoading(true);
    
    try {
      await axios.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('userEmail');
      setLoading(false);
    }
  };
 
  // Refresh Access Token
  const refreshToken = async () => {
    try {
      const response:any  = await axios.post('/auth/refresh-token');
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
      throw err;
    }
  };
 
  // Update User Data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };
 
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshToken,
        updateUser,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
 
// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
 
export default AuthContext;