//login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './stylesLogin.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ nome: '', senha: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(formData);
  
      if (success) {
        const from = location.state?.from || '/home';
        navigate(from, { replace: true });
      } else {
        toast.error('Login ou senha inválidos. Tente novamente.');
        setError('Login ou senha inválidos. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro inesperado no handleSubmit:', err);
      toast.error('Erro inesperado. Tente novamente mais tarde.'); 
      setError('Erro inesperado. Tente novamente mais tarde.');
    }
  };
  
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Copel Hidrogênio</h2>
        
        {error && (
          <div className="login-error">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nome" className="form-label">Nome do Operador</label>
            <input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              id="senha"
              type="password"
              value={formData.senha}
              onChange={(e) => setFormData({...formData, senha: e.target.value})}
              className="form-input"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;