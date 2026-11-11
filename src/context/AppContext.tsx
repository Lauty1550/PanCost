import React, { createContext } from "react";
import type { Receta } from "../types/Receta";
import type { Usuario } from "../types/Usuario";

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
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
};

export const AppContext = createContext<AppContextType | null>(null);
