import { Navigate } from "react-router";
import { useAppcontext } from "../hooks/useAppContext";
import GoogleAuth from "./GoogleAuth";
import "../css/LogIn.css";

export default function LogIn() {
  const { usuario } = useAppcontext();

  if (usuario) {
    return <Navigate to="/Recetas" replace />;
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand" aria-hidden="true">
          <span>🥐</span>
        </div>

        <header className="login-header">
          <p className="login-eyebrow">Bienvenido a PanCost</p>
          <h1 id="login-title">Iniciá sesión</h1>
          <p className="login-description">
            Ingresá para organizar tus recetas e ingredientes.
          </p>
        </header>

        <div className="login-actions">
          <GoogleAuth />
        </div>
      </section>
    </main>
  );
}
