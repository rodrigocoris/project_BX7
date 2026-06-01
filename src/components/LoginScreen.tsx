import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { FormEvent } from 'react'
import { Bx7Brand } from './Bx7Brand'

type LoginScreenProps = {
  onLogin: (email: string, password: string) => void
  error?: string
}

export function LoginScreen({ onLogin, error }: LoginScreenProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onLogin(String(formData.get('email') ?? ''), String(formData.get('password') ?? ''))
  }

  return (
    <div className="login-shell">
      <div className="login-visual">
        <div className="glow glow-one" />
        <div className="glow glow-two" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="brand-card"
        >
          <Bx7Brand compact subtitle="Acceso privado para administración" />
          <p className="login-copy login-copy--emphasis">
            Gestiona inventario, pedidos y productos off-road desde un solo panel.
          </p>
        </motion.div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="login-card"
        onSubmit={handleSubmit}
      >
        <div>
          <p className="eyebrow">BX7 privado</p>
          <h2>Iniciar sesión en BX7</h2>
          <p className="login-copy">Usa las credenciales de demo para entrar al sistema BX7.</p>
        </div>

        <label>
          Correo
          <input name="email" type="email" placeholder="admin@bx7.com" required />
        </label>

        <label>
          Contraseña
          <input name="password" type="password" placeholder="bx7-2026!" required />
        </label>

        {error ? <div className="login-error">{error}</div> : null}

        <button type="submit" className="primary-button">
          Entrar al ERP
          <ArrowRight size={16} />
        </button>

        <div className="login-hint">
          Demo: admin@bx7.com / bx7-2026!
        </div>
      </motion.form>
    </div>
  )
}