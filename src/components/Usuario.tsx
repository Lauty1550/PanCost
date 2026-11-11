import type { Usuario } from "../types/Usuario";
import "../css/Usuario.css";
import { useUsuario } from "../hooks/useUsuario";
import { useAppcontext } from "../hooks/useAppContext";

export function Usuario() {
  const { usuario } = useAppcontext();
  const {
    dropdownRef,
    dropdown,
    esPantallaChica,
    usuarioIniciales,
    cerrarSesion,
    setDropdown,
  } = useUsuario();

  return (
    usuario && (
      <div ref={dropdownRef}>
        <button onClick={() => setDropdown(!dropdown)} className="usuario">
          {esPantallaChica ? usuarioIniciales : usuario.name}
        </button>
        <div className={`dropdown-usuario ${dropdown ? "open" : "close"}`}>
          <button onClick={cerrarSesion} className="dropdown-edit-btn">
            Cerrar Sesion
          </button>
        </div>
      </div>
    )
  );
}
