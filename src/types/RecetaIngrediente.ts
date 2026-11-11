import type { Ingrediente } from "./Ingrediente";
import type { Unidad } from "./Unidad";

export interface RecetaIngrediente {
  id: number;
  recetaId: number;
  ingrediente: Ingrediente;
  ingredienteId: number;
  cantidadUsada: number;
  unidad: Unidad;
}

export interface CreateRecetaIngredienteDTO {
  ingredienteId: number;
  cantidadUsada: number | undefined;
  unidad: Unidad;
}
