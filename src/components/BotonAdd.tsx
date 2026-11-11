import "../css/BotonAdd.css";
import { useAppcontext } from "../hooks/useAppContext";

type Props = {
  selection: number;
};

export default function BotonAdd({ selection }: Props) {
  const { setEnableModalIngrediente, setEnableModalReceta } = useAppcontext();
  // eslint-disable-next-line prefer-const
  let tipo = selection === 0 ? "Receta" : "Ingrediente";

  function openModal() {
    if (selection === 0) {
      setEnableModalReceta(true);
    } else {
      setEnableModalIngrediente(true);
    }
  }

  return (
    <button className="button-add" onClick={openModal}>
      Agregar {tipo}
    </button>
  );
}
