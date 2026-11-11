import { useNavigate } from "react-router";
import "../css/Header.css";
import { Usuario } from "./Usuario";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <nav onClick={() => navigate("/Recetas")}>
        <img src="/pancost.png" alt="logo" draggable={false} />
        <h1>PanCost</h1>
      </nav>
      <section className="profile">
        <Usuario />
      </section>
    </div>
  );
}
