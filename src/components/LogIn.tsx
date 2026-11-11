import { Navigate } from "react-router";
import { useAppcontext } from "../hooks/useAppContext";
import GoogleAuth from "./GoogleAuth";

export default function LogIn() {
  const { usuario } = useAppcontext();

  if (usuario) {
    return <Navigate to="/Recetas" replace />;
  }

  return (
    <>
      <h1>Iniciar Sesion</h1>
      <GoogleAuth />
    </>
  );
}
