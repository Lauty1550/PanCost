import { useEffect, useState } from "react";
import { useAppcontext } from "../hooks/useAppContext";
import useIngredientes from "../hooks/useIngredientes";
import { RecetaService } from "../services/Receta.service";
import { useFieldArray, useForm } from "react-hook-form";
import type { CreateRecetaDTO } from "../types/Receta";
import { toast } from "sonner";

export default function useNewReceta() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields },
  } = useForm<CreateRecetaDTO>({
    defaultValues: {
      ingredientes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredientes",
  });

  const unidades = [
    { label: "Gramos", value: "g" },
    { label: "Kilo", value: "kg" },
    { label: "Mililitros", value: "ml" },
    { label: "Litros", value: "l" },
    { label: "Unidad", value: "Unidad" },
  ] as const;

  const [closing, setClosing] = useState(false);
  const {
    setEnableModalReceta,
    setDispararFetchReceta,
    dispararFetchReceta,
    recetaEditar,
    setRecetaEditar,
  } = useAppcontext();

  const [isLoading, setIsloading] = useState(false);

  useIngredientes();

  useEffect(() => {
    if (!recetaEditar) {
      reset({
        nombre: "",
        ingredientes: [],
      });
      return;
    }

    reset({
      nombre: recetaEditar.nombre,

      ingredientes: recetaEditar.ingredientes.map((i) => ({
        ingredienteId: i.ingredienteId,
        cantidadUsada: i.cantidadUsada,
        unidad: i.unidad,
      })),
    });
  }, [recetaEditar, reset]);

  const handleClose = () => {
    setClosing(true);
    setRecetaEditar(null);
    reset();

    setTimeout(() => {
      setEnableModalReceta(false);
      setClosing(false);
    }, 100);
  };

  async function onSubmit(data: CreateRecetaDTO) {
    try {
      setIsloading(true);

      if (recetaEditar) {
        await RecetaService.updateReceta(recetaEditar.id, data);
        toast.success("Receta editada");
      } else {
        await RecetaService.addNewReceta(data);
        toast.success("Receta creada");
      }

      reset();
      handleClose();
      setDispararFetchReceta(!dispararFetchReceta);
    } catch (error) {
      console.error("Ocurrio un error", error);
      toast.error(
        recetaEditar ? "Error al editar receta" : "Error al crear receta",
      );
    } finally {
      setIsloading(false);
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    touchedFields,
    closing,
    unidades,
    onSubmit,
    handleClose,
    fields,
    append,
    remove,
    isLoading,
    control,
  };
}
