import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCamera, FaEnvelope, FaLock, FaGoogle, FaApple, FaTimes } from 'react-icons/fa'

function LoginModal({ show, onHide }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (form.email === 'demo@instantes.com' && form.password === '123456') {
      onHide()
      navigate('/albuns')
    } else {
      setError('Email ou senha inválidos')
    }
  }

  if (!show) return null

  return (
    <div className="login-modal-overlay" onClick={onHide}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        {/* <button className="login-modal-close" onClick={onHide}>
          <FaTimes size={16} />
        </button> */}

        {/* Header */}
        <div className="login-modal-header">
          {/* <div className="login-modal-avatar">
            <FaCamera size={22} />
          </div> */}
          <h2 className="login-modal-title">instantes</h2>
          {/* <p className="login-modal-subtitle">Bem-vindo de volta</p> */}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-modal-form">
          <div className="login-input-group">
            <span className="login-input-icon">
              <FaEnvelope size={16} />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="login-input-group">
            <span className="login-input-icon">
              <FaLock size={16} />
            </span>
            <input
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button type="submit" className="login-submit-btn">
            Entrar
          </button>
        </form>

        {/* Divider */}
        {/* <div className="login-divider">
          <span></span>
          <p>ou continue com</p>
          <span></span>
        </div> */}

        {/* Social buttons */}
        {/* <div className="login-social-buttons">
          <button type="button" className="login-social-btn">
            <FaGoogle size={18} />
          </button>
          <button type="button" className="login-social-btn">
            <FaApple size={20} />
          </button>
        </div> */}

        {/* Demo info */}
        <div className="login-demo-info">
          <p>
            <strong>Demo:</strong> demo@instantes.com / 123456
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
