import { useLocation, useNavigate } from "react-router";
import "../css/Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="menu">
      <button
        className={
          location.pathname === "/Recetas" ? "active" : "menu-selection"
        }
        onClick={() => navigate("/Recetas")}
      >
        Recetas
      </button>

      <button
        className={
          location.pathname === "/Ingredientes" ? "active" : "menu-selection"
        }
        onClick={() => navigate("/Ingredientes")}
      >
        Ingredientes
      </button>
    </nav>
  );
}
