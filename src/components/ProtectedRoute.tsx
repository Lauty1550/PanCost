import { Navigate, Outlet, useLocation } from "react-router";
import { useAppcontext } from "../hooks/useAppContext";

export function ProtectedRoute() {
  const location = useLocation();
  const { usuario, authLoading } = useAppcontext();

  if (authLoading) {
    return <p>Comprobando la sesión...</p>;
  }

  if (!usuario) {
    return <Navigate to="/Log-In" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
