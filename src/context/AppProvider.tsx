import { useState, type ReactNode } from "react";
import { AppContext } from "./AppContext";
import type { Receta } from "../types/Receta";

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [enableModalIngrediente, setEnableModalIngrediente] = useState(false);
  const [dispararFetchIngrediente, setDispararFetchIngrediente] =
    useState(false);
  const [enableModalReceta, setEnableModalReceta] = useState(false);
  const [dispararFetchReceta, setDispararFetchReceta] = useState(false);
  const [query, setQuery] = useState("");
  const [recetaEditar, setRecetaEditar] = useState<Receta | null>(null);

  return (
    <AppContext.Provider
      value={{
        enableModalIngrediente,
        setEnableModalIngrediente,
        dispararFetchIngrediente,
        setDispararFetchIngrediente,
        enableModalReceta,
        setEnableModalReceta,
        dispararFetchReceta,
        setDispararFetchReceta,
        query,
        setQuery,
        recetaEditar,
        setRecetaEditar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
