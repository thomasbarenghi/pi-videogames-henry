import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addGame } from "@/redux/slices/client/games";
import { validateForm } from "@/utils/validateCreateGame";
import { MultiSelect, Input, Modal, Button } from "@/components";
import { useEffect, useState } from "react";
import { GenresClass, PlatformsClass } from "@/types";

export default function CreateGame() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        text="Crear juego"
        type="button"
        onClick={() => setVisible(true)}
        className="primaryButton"
      />
      <Modal visible={visible} setVisible={setVisible}>
        <Form />
      </Modal>
    </>
  );
}

function Form() {
  const dispatch = useAppDispatch();
  const { isErrorAdd, isLoadingAdd } = useAppSelector(
    (state) => state.client.games,
  );
  const { genres: sGenres } = useAppSelector((state) => state.client.genres);
  const { platforms: sPlatforms } = useAppSelector(
    (state) => state.client.platforms,
  );
  const genres = GenresClass.deserializeList(sGenres);
  const platforms = PlatformsClass.deserializeList(sPlatforms);
  console.log("genres deserializeList", genres, "platforms", platforms);
  const [selected, setSelected] = useState([] as any);
  const [selectedPlatforms, setSelectedPlatforms] = useState([] as any);
  const [errors, setErrors] = useState({} as any);
  const [form, setForm] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: "",
    genres: "",
    background_image: "",
    token: "",
    source: "own",
  } as any);

  const handleSubmit = (e: any) => {};

  const handleChange = (e: any) => {};

  // const options = generos
  //   .filter((genero) => genero.name !== "Default")
  //   .map((genero) => {
  //     return { label: genero.name, value: genero.id };
  //   });
  // const optionsPlatforms = plataformas
  //   .filter((genero) => genero.name !== "Default")
  //   .map((genero) => {
  //     return { label: genero.name, value: genero.id };
  //   });

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
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs-row" style={{ gap: 8 }}>
            <Input
              label="Nombre del juego"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del juego"
              required
              error={errors.name}
            />
            <Input
              label="Descripción del juego"
              type="textarea"
              name="description"
              value={form.description}
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
              value={form.released}
              onChange={handleChange}
              placeholder="Fecha de lanzamiento"
              required
              error={errors.released}
            />
            <Input
              label="Rating"
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="Rating"
              required
              error={errors.rating}
            />
          </div>
          <div className="inputs-row" style={{ gap: 8 }}>
            <label id="label" className="form-label smallText-regular">
              Plataformas
              <MultiSelect
                valores={platforms}
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
                valores={genres}
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
              value={form.background_image}
              onChange={handleChange}
              placeholder="Link imagen"
              required
              error={errors.background_image}
            />
            <Input
              label="Token"
              type="password"
              name="token"
              value={form.token}
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
