import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext.jsx";

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

export default function Auth({ onBack }) {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/registro";
    const body = tab === "login"
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    try {
      const res  = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Error desconocido"); return; }
      login(json.username, json.token);
      onBack();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      className="auth"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button className="auth-back" onClick={onBack}>← Volver</button>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="auth-logo">&lt;/&gt;</div>
        <h1 className="auth-title">POO Challenge</h1>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === "login" ? "auth-tab--active" : ""}`}
            onClick={() => { setTab("login"); setError(null); }}
          >
            Iniciar sesión
          </button>
          <button
            className={`auth-tab ${tab === "registro" ? "auth-tab--active" : ""}`}
            onClick={() => { setTab("registro"); setError(null); }}
          >
            Registrarse
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {tab === "registro" && (
            <motion.div
              className="field"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <label className="field-label" htmlFor="username">Usuario</label>
              <input
                id="username" className="field-input" type="text"
                placeholder="ej: dev_crack"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                autoComplete="username" maxLength={20}
              />
            </motion.div>
          )}

          <div className="field">
            <label className="field-label" htmlFor="email">Correo</label>
            <input
              id="email" className="field-input" type="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="password">Contraseña</label>
            <div className="field-password">
              <input
                id="password" className="field-input" type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                autoComplete={tab === "login" ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className="field-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              className="error-msg"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            className="btn btn--primary" type="submit" disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97, y: 4 }}
          >
            {loading ? "Cargando..." : tab === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
