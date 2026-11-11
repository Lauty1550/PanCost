import Select from "react-select";
import "../css/Modal.css";
import "../css/NewReceta.css";
import { useAppcontext } from "../hooks/useAppContext";
import { useIngredienteContext } from "../hooks/useIngredienteContext";
import useNewReceta from "../hooks/useNewReceta";
import { Controller } from "react-hook-form";

export default function NewReceta() {
  const { enableModalReceta, recetaEditar } = useAppcontext();
  const { listaIngredientes } = useIngredienteContext();
  const {
    errors,
    touchedFields,
    unidades,
    closing,
    handleSubmit,
    onSubmit,
    register,
    handleClose,
    fields,
    append,
    remove,
    isLoading,
    control,
  } = useNewReceta();

  return (
    <div
      className={`modal-overlay ${enableModalReceta ? "open" : "close"} ${
        closing ? "close" : ""
      }`}
    >
      <form
        className={`modal ${enableModalReceta ? "open" : "close"}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          type="button"
          className="modal-close"
          onClick={handleClose}
          disabled={isLoading}
        >
          ✕
        </button>
        <h2>{recetaEditar ? "Editar receta" : "Crear receta"}</h2>

        <section className="form-section">
          <label className="form-label" htmlFor="nombreReceta">
            Nombre Receta
          </label>
          <input
            type="text"
            id="nombreReceta"
            {...register("nombre", {
              required: true,
              maxLength: 25,
            })}
            autoComplete="off"
            disabled={isLoading}
          />

          {touchedFields.nombre && errors.nombre?.type === "required" && (
            <p className="text-error">El campo nombre es requerido</p>
          )}

          {errors.nombre?.type === "maxLength" && (
            <p className="text-error">Máximo 25 caracteres</p>
          )}
        </section>

        <section className="form-section">
          <label className="form-label" htmlFor="imagen">
            Imagen{" "}
          </label>

          <input
            id="imagen"
            type="file"
            accept="image/*"
            {...register("imagen")}
            disabled={isLoading}
          />
        </section>

        {/* Ingredientes */}
        <section className="ingredientes-section">
          <h3 className="section-title">Ingredientes</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="ingrediente-item">
              {/* Ingrediente */}

              <div className="field-group">
                <Controller
                  control={control}
                  name={`ingredientes.${index}.ingredienteId`}
                  rules={{
                    required: true,
                    validate: (value) => value !== 0,
                  }}
                  render={({ field }) => (
                    <Select
                      isDisabled={isLoading}
                      placeholder="Seleccione ingrediente"
                      options={listaIngredientes.map((ingrediente) => ({
                        value: ingrediente.id,
                        label: ingrediente.nombre,
                        image: ingrediente.urlImagen,
                      }))}
                      value={
                        listaIngredientes
                          .map((ingrediente) => ({
                            value: ingrediente.id,
                            label: ingrediente.nombre,
                            image: ingrediente.urlImagen,
                          }))
                          .find((opcion) => opcion.value === field.value) ||
                        null
                      }
                      onChange={(opcion) => field.onChange(opcion?.value ?? 0)}
                      formatOptionLabel={(option) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img
                            src={option.image}
                            alt={option.label}
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "4px",
                              objectFit: "cover",
                            }}
                          />

                          <span>{option.label}</span>
                        </div>
                      )}
                    />
                  )}
                />

                {errors.ingredientes?.[index]?.ingredienteId?.type ===
                  "validate" && (
                  <p className="text-error">Seleccione un ingrediente</p>
                )}
              </div>

              {/* Cantidad */}
              <div className="field-group">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="Cantidad"
                  {...register(`ingredientes.${index}.cantidadUsada`, {
                    required: true,
                    valueAsNumber: true,
                    validate: (value) => value !== undefined && value > 0,
                  })}
                  disabled={isLoading}
                />
                {errors.ingredientes?.[index]?.cantidadUsada?.type ===
                  "validate" && <p className="text-error">No puede ser 0</p>}
              </div>

              {/* Unidad */}
              <div className="field-group">
                <select
                  {...register(`ingredientes.${index}.unidad`, {
                    required: true,
                  })}
                  disabled={isLoading}
                >
                  <option value="">Medida</option>

                  {unidades.map((unidad) => (
                    <option key={unidad.value} value={unidad.value}>
                      {unidad.label}
                    </option>
                  ))}
                </select>
                {errors.ingredientes?.[index]?.unidad?.type === "required" && (
                  <p className="text-error">Seleccioná una unidad</p>
                )}
              </div>

              {/* Eliminar */}
              <button
                className="remove-btn"
                type="button"
                onClick={() => remove(index)}
                disabled={isLoading}
              >
                Eliminar
              </button>
            </div>
          ))}

          {/* Agregar ingrediente */}
          <button
            className="add-ingredient-btn"
            type="button"
            onClick={() =>
              append({
                ingredienteId: 0,
                cantidadUsada: undefined,
                unidad: "g",
              })
            }
            disabled={isLoading}
          >
            Agregar ingrediente
          </button>
        </section>

        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <img
                className="loading-gif"
                src="/loading.gif"
                alt="cargando"
                draggable={false}
              />
            ) : recetaEditar ? (
              "Editar receta"
            ) : (
              "Guardar receta"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
