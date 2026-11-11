import { useForm } from "react-hook-form";
import type { CreateIngredienteDTO } from "../types/Ingrediente";
import { useEffect, useState } from "react";
import { useAppcontext } from "./useAppContext";
import { ingredienteService } from "../services/ingrediente.service";
import { toast } from "sonner";
import { useIngredienteContext } from "./useIngredienteContext";

export default function useNewIngrediente() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIngredienteDTO>();
  const [closing, setClosing] = useState(false);
  const {
    setEnableModalIngrediente,
    dispararFetchIngrediente,
    setDispararFetchIngrediente,
    setDispararFetchReceta,
    dispararFetchReceta,
  } = useAppcontext();

  const [isLoading, setIsloading] = useState(false);

  const { ingredienteEditar, setIngredienteEditar } = useIngredienteContext();

  useEffect(() => {
    if (ingredienteEditar) {
      reset({
        nombre: ingredienteEditar.nombre,
        precioCompra: ingredienteEditar.precioCompra,
        cantidadCompra: ingredienteEditar.cantidadCompra,
        unidadCompra: ingredienteEditar.unidadCompra,
      });
    } else {
      reset({
        nombre: "",
        precioCompra: undefined,
        cantidadCompra: undefined,
        unidadCompra: "kg",
      });
    }
  }, [ingredienteEditar, reset]);

  const handleClose = () => {
    setClosing(true);
    reset();

    setTimeout(() => {
      setIngredienteEditar(null);
      setEnableModalIngrediente(false);

      setClosing(false);
    }, 100);
  };

  async function onSubmit(data: CreateIngredienteDTO) {
    try {
      setIsloading(true);
      if (ingredienteEditar) {
        await ingredienteService.updateIngrediente(ingredienteEditar.id, data);
      } else {
        await ingredienteService.addNewIngrediente(data);
      }
      setDispararFetchIngrediente(!dispararFetchIngrediente);
      setDispararFetchReceta(!dispararFetchReceta);

      reset();
      handleClose();
      if (ingredienteEditar) {
        toast.success("Ingrediente editado");
      } else {
        toast.success("Ingrediente creado");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  }

  return {
    onSubmit,
    handleClose,
    handleSubmit,
    closing,
    register,
    errors,
    isLoading,
  };
}
