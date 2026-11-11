import React, { createContext } from "react";
import type { Receta } from "../types/Receta";

type AppContextType = {
  enableModalIngrediente: boolean;
  setEnableModalIngrediente: React.Dispatch<React.SetStateAction<boolean>>;
  dispararFetchIngrediente: boolean;
  setDispararFetchIngrediente: React.Dispatch<React.SetStateAction<boolean>>;
  enableModalReceta: boolean;
  setEnableModalReceta: React.Dispatch<React.SetStateAction<boolean>>;
  dispararFetchReceta: boolean;
  setDispararFetchReceta: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  recetaEditar: Receta | null;
  setRecetaEditar: React.Dispatch<React.SetStateAction<Receta | null>>;
  inicioSesion: boolean;
  setInicioSesion: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | null>(null);
