import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { authGoogle, authMe } from "../services/auth.service";
import { useAppcontext } from "./useAppContext";

export function useGoogleAuth() {
  const { setUsuario } = useAppcontext();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function obtenerUsuario() {
    const user = await authMe();
    setUsuario(user ?? null);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      if (!window.google || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async ({ credential }) => {
          setIsLoggingIn(true);
          try {
            await authGoogle(credential);
            await obtenerUsuario();
            navigate("/Recetas");
          } catch (error) {
            console.error("Falló el login:", error);
          } finally {
            setIsLoggingIn(false);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        size: "large",
        theme: "filled_blue",
        text: "sign_in_with",
        shape: "rectangular",
      });
    };

    document.head.appendChild(script);
    return () => script.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { buttonRef, isLoggingIn };
}
