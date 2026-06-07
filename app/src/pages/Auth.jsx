import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Auth({ onBack }) {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = tab === "login" ? "/api/auth/login" : "/api/auth/registro";
    const body =
      tab === "login"
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Error desconocido");
        return;
      }

      login(json.username, json.token);
      onBack();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth">
      <button className="auth-back" onClick={onBack}>
        ← Volver
      </button>

      <div className="auth-card">
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
            <div className="field">
              <label className="field-label" htmlFor="username">Usuario</label>
              <input
                id="username"
                className="field-input"
                type="text"
                placeholder="ej: dev_crack"
                value={form.username}
                onChange={(e) => updateField("username", e.target.value)}
                autoComplete="username"
                maxLength={20}
              />
            </div>
          )}

          <div className="field">
            <label className="field-label" htmlFor="email">Correo</label>
            <input
              id="email"
              className="field-input"
              type="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="field-input"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              autoComplete={tab === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn btn--primary" type="submit" disabled={loading}>
            {loading
              ? "Cargando..."
              : tab === "login"
              ? "Iniciar sesión"
              : "Crear cuenta"}
          </button>
        </form>
      </div>
    </div>
  );
}
