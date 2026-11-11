import { useEffect, useRef, useState } from "react";
import { useAppcontext } from "../hooks/useAppContext";
import { logOut } from "../services/auth.service";
import type { Usuario } from "../types/Usuario";
import { useNavigate } from "react-router";

export function Usuario() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { usuario, setUsuario } = useAppcontext();

  async function cerrarSesion() {
    await logOut();
    navigate("/Log-In");
    setDropdown(false);
    setUsuario(null);
  }

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
