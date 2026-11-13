import { Navigate, Outlet, useLocation } from "react-router";
import { useAppcontext } from "../hooks/useAppContext";
import "../css/ProtectedRoute.css";

export function ProtectedRoute() {
  const location = useLocation();
  const { usuario, authLoading } = useAppcontext();

  if (authLoading) {
    return (
      <main className="session-check" role="status" aria-live="polite">
        <div className="session-check__card">
          <span className="session-check__spinner" aria-hidden="true" />
          <p>Comprobando la sesión...</p>
        </div>
      </main>
    );
  }

  if (!usuario) {
    return <Navigate to="/Log-In" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
