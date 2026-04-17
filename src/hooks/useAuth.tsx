import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  id: string;
  email: string;
  name?: string;
  // extend as needed
}

interface AuthContextType {
  token: string | null;
  userInfo: UserInfo | null;
  login: (token: string, user: UserInfo) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const login = (newToken: string, user: UserInfo) => {
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('userInfo', JSON.stringify(user));
    setToken(newToken);
    setUserInfo(user);
    navigate('/employee', { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setToken(null);
    setUserInfo(null);
    navigate('/login', { replace: true });
  };

  // Sync token across multiple tabs & Handle 401 interceptor events
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken && token) {
        logout();
      }
    };

    const handleUnauthorizedEvent = () => logout();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:unauthorized', handleUnauthorizedEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:unauthorized', handleUnauthorizedEvent);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
