import { useEffect, useRef, useState } from "react";
import { useAppcontext } from "../hooks/useAppContext";
import { authMe, logOut } from "../services/auth.service";
import type { Usuario } from "../types/Usuario";
import { useNavigate } from "react-router";

export function Usuario() {
  const { inicioSesion, setInicioSesion } = useAppcontext();
  const [usuario, setUsuario] = useState<Usuario | null>();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  async function obtenerUsuario() {
    const user = await authMe();
    if (user) {
      setUsuario(user);
    } else {
      setUsuario(null);
    }
  }

  async function cerrarSesion() {
    await logOut();
    navigate("/Log-In");
    setDropdown(false);
    setInicioSesion(!inicioSesion);
  }

  useEffect(() => {
    obtenerUsuario();
  }, [inicioSesion]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    usuario && (
      <>
        <button onClick={() => setDropdown(!dropdown)}>{usuario.name}</button>
        <div
          ref={dropdownRef}
          className={`dropdown ${dropdown ? "open" : "close"}`}
        >
          <button onClick={cerrarSesion} className="dropdown-edit-btn">
            Cerrar Sesion
          </button>
        </div>
      </>
    )
  );
}
