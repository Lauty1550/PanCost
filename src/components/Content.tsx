import "../css/Content.css";
import BotonAdd from "./BotonAdd";
import NewIngrediente from "./NewIngrediente";
import NewReceta from "./NewReceta";
import useContent from "../hooks/useContent";
import { FiSearch } from "react-icons/fi";
import RecetasList from "./RecetasList";
import IngredientesList from "./IngredientesList";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router";

export default function Content() {
  const location = useLocation();
  const { input, handleChange, onSubmit, inputRef, focusInput, clearQuery } =
    useContent();

  return (
    <main className="content-container">
      <BotonAdd selection={location.pathname === "/Recetas" ? 0 : 1} />
      <form className="search" onSubmit={onSubmit}>
        <fieldset className="search-input">
          <FiSearch className="search-icon" onClick={focusInput} />
          <input
            ref={inputRef}
            id="filtro"
            type="text"
            value={input}
            onChange={handleChange}
            autoComplete="off"
          />
          {input.length > 0 && (
            <IoMdClose className="close-search-icon" onClick={clearQuery} />
          )}
        </fieldset>
      </form>
      <section className="content">
        <article
          className={
            location.pathname === "/Recetas" ? "visible-grid" : "hidden-grid"
          }
        >
          <RecetasList />
        </article>

        <article
          className={
            location.pathname === "/Ingredientes"
              ? "visible-grid"
              : "hidden-grid"
          }
        >
          <IngredientesList />
        </article>
      </section>
      <NewReceta />
      <NewIngrediente />
    </main>
  );
}
