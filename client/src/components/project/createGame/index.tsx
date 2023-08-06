import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addGame } from "@/redux/slices/client/games";
import { MultiSelect, Input, Modal, Button } from "@/components";
import { useRef, useState } from "react";
import { GenresClass, PlatformsClass } from "@/types";
import { changeManager, submitManager } from "@/utils/forms/validateAndSend";
import useValidate from "@/hooks/useValidate";
import { toast } from "sonner";

export default function CreateGame() {
  const [visible, setVisible] = useState(false);
  const validate = useValidate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState<any>({});
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target);
    changeManager({
      e,
      setFormValues,
      setErrors,
      validate,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await submitManager({
        e,
        formRef,
        formValues,
        errors,
        dispatch,
        actionToDispatch: addGame,
        setFormValues,
      });
    } catch (error) {
      console.error(error);
      toast.error("Verifica los campos del formulario");
    }
  };

  return (
    <>
      <Button
        text="Crear juego"
        type="button"
        onClick={() => setVisible(true)}
        className="primaryButton"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          formValues={formValues}
          formRef={formRef}
        />
      </Modal>
    </>
  );
}

type FormProps = {
  handleSubmit: (e: any) => void;
  handleChange: (e: any) => void;
  errors: any;
  formValues: any;
  formRef: any;
};

function Form({
  handleSubmit,
  handleChange,
  errors,
  formValues,
  formRef,
}: FormProps) {
  const dispatch = useAppDispatch();
  const { isErrorAdd, isLoadingAdd } = useAppSelector(
    (state) => state?.client?.games
  );
  const { genres: sGenres } = useAppSelector((state) => state?.client?.genres);
  const { platforms: sPlatforms } = useAppSelector(
    (state) => state?.client?.platforms
  );
  const genres = GenresClass.deserializeList(sGenres);
  const platforms = PlatformsClass.deserializeList(sPlatforms);
  console.log("genres deserializeList", genres, "platforms", platforms);
  const [selected, setSelected] = useState([] as any);
  const [selectedPlatforms, setSelectedPlatforms] = useState([] as any);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="titulo3-bold">Creemos un juego 🚀</h1>
      {isErrorAdd ? (
        <p className="smallText-regular margin-b-24">
          Algo salió mal, intenta recargar la pagina. {isErrorAdd}
        </p>
      ) : isLoadingAdd ? (
        <p className="smallText-regular margin-b-24">Cargando...</p>
      ) : (
        <form className="form" onSubmit={handleSubmit} ref={formRef}>
          <div className="inputs-row" style={{ gap: 8 }}>
            <Input
              label="Nombre del juego"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Nombre del juego"
              required
              error={errors.name}
            />
            <Input
              label="Descripción del juego"
              type="textarea"
              name="description"
              onChange={handleChange}
              placeholder="Descripción del juego"
              required
              rows={1}
              error={errors.description}
            />
          </div>
          <div className="inputs-row" style={{ gap: 8 }}>
            <Input
              label="Fecha de lanzamiento"
              type="date"
              name="released"
              onChange={handleChange}
              placeholder="Fecha de lanzamiento"
              required
              error={errors.released}
            />
            <Input
              label="Rating"
              type="number"
              name="rating"
              onChange={handleChange}
              placeholder="Rating"
              required
              error={errors.rating}
              step="0.1"
            />
          </div>
          <div className="inputs-row" style={{ gap: 8 }}>
            <label id="label" className="form-label smallText-regular">
              Plataformas
              <MultiSelect
                valores={
                  platforms.map((platform) => ({
                    ...platform,
                    value: platform.id,
                    label: platform.name,
                  })) as any
                }
                setSeleccionados={setSelectedPlatforms}
                seleccionados={selectedPlatforms}
                label="Plataformas"
              />
              {errors.platforms && (
                <p className="smallText-regular" style={{ color: "red" }}>
                  {errors.platforms}
                </p>
              )}
            </label>
            <label id="label" className="form-label smallText-regular">
              Generos
              <MultiSelect
                valores={
                  genres.map((genre) => ({
                    ...genre,
                    value: genre.id,
                    label: genre.name,
                  })) as any
                }
                setSeleccionados={setSelected}
                seleccionados={selected}
                label="Generos"
              />
              {errors.genres && (
                <p className="smallText-regular" style={{ color: "red" }}>
                  {errors.genres}
                </p>
              )}
            </label>
          </div>
          <div className="inputs-row" style={{ gap: 8 }}>
            <Input
              label="Link imagen"
              type="text"
              name="background_image"
              onChange={handleChange}
              placeholder="Link imagen"
              required
              error={errors.background_image}
            />
            <Input
              label="Token"
              type="password"
              name="token"
              onChange={handleChange}
              placeholder="Token"
              required
              error={errors.token}
            />
          </div>

          <button className="submitButton" type="submit">
            Crear personaje
          </button>
        </form>
      )}
    </div>
  );
}
