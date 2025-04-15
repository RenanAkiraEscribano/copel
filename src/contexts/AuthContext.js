// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    operador: null,
    loading: true
  });
  const navigate = useNavigate();

  const loadAuthData = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const operador = localStorage.getItem('operador');

      if (token && operador) {
        // Verifica se o token é válido
        await api.get('/auth/validate');
        setAuthState({
          token,
          operador: JSON.parse(operador),
          loading: false
        });
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('operador');
      setAuthState({ token: null, operador: null, loading: false });
    }
  }, []);

  useEffect(() => {
    loadAuthData();
  }, [loadAuthData]);

  const login = async (credentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { data } = await api.post('/auth/login', credentials);

      if (!data.token || !data.user) {
        throw new Error('Resposta do servidor incompleta');
      }

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('operador', JSON.stringify(data.user));

      setAuthState({
        token: data.token,
        operador: data.user,
        loading: false,
        error: null
      });

      return true; // Indica sucesso, mas não navega aqui

    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('operador');

      const errorMessage = error.response?.data?.message ||
        (error.response?.status === 401
          ? 'Credenciais inválidas'
          : 'Erro no servidor');

      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));

      return false;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('operador');
    setAuthState({ token: null, operador: null, loading: false });
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!authState.token,
        operador: authState.operador,
        loading: authState.loading,
        token: authState.token,
        login,
        logout,
        error: authState.error // adicionar aqui se quiser acessar globalmente
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook useAuth deve ser usado apenas em componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};