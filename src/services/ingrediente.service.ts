import { toast } from "sonner";
import type { CreateIngredienteDTO } from "../types/Ingrediente";

const API_URL = import.meta.env.VITE_API_URL + "/ingredientes";

export const ingredienteService = {
  async getAllIngredientes() {
    const resp = await fetch(`${API_URL}`, {
      credentials: "include",
    });

    if (!resp.ok) {
      throw new Error("Error al obtener ingredientes");
    }

    return await resp.json();
  },

  async addNewIngrediente(data: CreateIngredienteDTO) {
    try {
      const formData = new FormData();

      formData.append("nombre", data.nombre);

      formData.append("precioCompra", data.precioCompra.toString());

      formData.append("cantidadCompra", data.cantidadCompra.toString());

      formData.append("unidadCompra", data.unidadCompra);

      if (data.imagen?.[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      const resp = await fetch(`${API_URL}/crear`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!resp.ok) {
        throw new Error("Error al crear ingrediente");
      }

      return await resp.json();
    } catch (error) {
      console.error(error);
      console.error("Error al crear ingrediente: ", error);
    }
  },

  async deleteIngrediente(id: number) {
    try {
      const resp = await fetch(`${API_URL}/borrar/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
        throw Error;
      }
    }
  },

  async updateIngrediente(id: number, data: CreateIngredienteDTO) {
    try {
      const formData = new FormData();

      formData.append("nombre", data.nombre);

      formData.append("precioCompra", data.precioCompra.toString());

      formData.append("cantidadCompra", data.cantidadCompra.toString());

      formData.append("unidadCompra", data.unidadCompra);

      if (data.imagen?.[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      const resp = await fetch(`${API_URL}/modificar/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!resp.ok) {
        throw new Error("Error al actualizar ingrediente");
      }

      return await resp.json();
    } catch (error) {
      console.error("Error al actualizar ingrediente:", error);
      toast.error("Error al actualizar ingrediente");
      throw error;
    }
  },
};
