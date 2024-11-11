'use client'


import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  // Check if there is a token in localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
        // Fetch user data from the server using the token
        const fetchUserData = async () => {
          const res = await fetch('http://localhost:3001/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user); 
          } else {
            setUser(null);
          }
        };
  
        fetchUserData();
      }
  }, []);

  // Register function
  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    return data
  };

  // Login function
  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data)
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
    }
    return data
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
