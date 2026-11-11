import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAppcontext } from "../hooks/useAppContext";
import { logOut } from "../services/auth.service";

export function useUsuario() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { usuario, setUsuario } = useAppcontext();
  const [usuarioIniciales, setUsuarioIniciales] = useState<string | null>(null);
  const [esPantallaChica, setEsPantallaChica] = useState(
    () => window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    if (usuario && usuario.name) {
      const iniciales = usuario.name
        .split(" ")
        .map((n) => n[0])
        .join("");

      setUsuarioIniciales(iniciales);
    } else {
      setUsuarioIniciales(null);
    }
  }, [usuario]);

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

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const actualizar = (event: MediaQueryListEvent) => {
      setEsPantallaChica(event.matches);
    };

    media.addEventListener("change", actualizar);

    return () => media.removeEventListener("change", actualizar);
  }, []);

  return {
    dropdown,
    dropdownRef,
    esPantallaChica,
    usuarioIniciales,
    cerrarSesion,
    setDropdown,
  };
}
