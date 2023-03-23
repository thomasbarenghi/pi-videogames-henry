import styles from "./createGame.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../../redux/actions/api/apiGames";
import { MultiSelect } from "react-multi-select-component";
import { validateForm } from "../../../../src/utils/validateCreateGame";

export const manageCreateGame = (status) => { CreateGame.toggle(status); };

export default function CreateGame() {

    const [visible, setVisible] = useState(false);
    const toggle = (status) => { setVisible(status); };
    CreateGame.toggle = toggle;

    const { errorOnAdd, isLoadingOnAdd } = useSelector(state => state.apiGames);

    return (
        <>
            {visible &&
                <section id={styles["crear_juego"]} className="padding-lr-t1 padding-tb-t1">
                    <div id={styles["crear_juego_inner"]} className="item-t1">
                        <div id={styles["inner"]} className="d-xl-grid d-xxl-grid flex-row align-items-start">
                            <div id={styles["grid_col1"]}>
                                <h1 className="titulo3-bold margin-b-24">Creemos un juego 🚀</h1>
                                {
                                    errorOnAdd ? <p className="smallText-regular margin-b-24">{errorOnAdd}</p>
                                        : isLoadingOnAdd ? <p className="smallText-regular margin-b-24">Cargando...</p>
                                            : <Form setVisible={setVisible} errorOnAdd={errorOnAdd} isLoadingOnAdd={isLoadingOnAdd} />
                                }

                            </div>
                        </div>
                        <img id={styles["closeMenu"]} src="img/fi-rr-cross.svg" width={15} height={15} onClick={() => setVisible(false)} alt="close" />
                    </div>
                </section>
            }
        </>
    )
}

function Form({ setVisible, errorOnAdd, isLoadingOnAdd }) {

    const dispatch = useDispatch();
    const generos = useSelector(state => state.apiGenres.genres)
    const plataformas = useSelector(state => state.apiPlatforms.platforms)
    const [fieldsToValidate, setFieldsToValidate] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: "",
        genres: "",
        background_image: "",
        token: "",
        source: "own"
    });

    useEffect(() => {
     //   console.log("selected:", selected)
        setForm({ ...form, genres: selected })
        if (!fieldsToValidate.includes("genres") && selected.length > 0) { setFieldsToValidate([...fieldsToValidate, "genres"]); }
    }, [selected])

    useEffect(() => {
        setForm({ ...form, platforms: selectedPlatforms })
        if (!fieldsToValidate.includes("platforms") && selectedPlatforms.length > 0) { setFieldsToValidate([...fieldsToValidate, "platforms"]); }
    }, [selectedPlatforms])

    useEffect(() => { setErrors(validateForm(form, fieldsToValidate)); }, [form, fieldsToValidate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Asi sale =>", form);
        const formErrors = validateForm(form, "*")
        if (Object.keys(formErrors).length === 0) {
            dispatch(addGame(form));
            console.log("no hay errores")
        } else {
            setErrors(formErrors);
            console.log("hay errores")
        }
    }

    const handleChange = (e) => {
        setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }));
        const { name } = e.target;
        if (!fieldsToValidate.includes(name)) { setFieldsToValidate([...fieldsToValidate, name]); }
    }

    const options = generos.filter(genero => genero.name !== "Default").map((genero) => { return { label: genero.name, value: genero.id } })
    const optionsPlatforms = plataformas.filter(genero => genero.name !== "Default").map((genero) => { return { label: genero.name, value: genero.id } })


    return (
        <form id="form" onSubmit={handleSubmit}>
            <div className={styles["inputs-row"]} style={{ gap: 8 }}>
                <label id="label" className="form-label smallText-regular">
                    Nombre del juego
                    <input id="input" name="name" className="smallText-regular" type="text" required maxLength="80" onChange={handleChange} />
                    {errors.name && <p className="smallText-regular" style={{ color: "red" }}>{errors.name}</p>}
                </label>

                <label id="label" className="form-label smallText-regular">
                    Descripción del juego
                    <textarea id="input" className="smallText-regular" type="textarea" required onChange={handleChange} rows="2" maxLength={1000} name="description" />
                    {errors.description && <p className="smallText-regular" style={{ color: "red" }}>{errors.description}</p>}
                </label>
            </div>

            <div className={styles["inputs-row"]} style={{ gap: 8 }}>
                <label id="label" className="form-label smallText-regular">
                    Fecha de lanzamiento
                    <input id="input" className="smallText-regular" type="date" required onChange={handleChange} name="released" />
                    {errors.released && <p className="smallText-regular" style={{ color: "red" }}>{errors.released}</p>}
                </label>

                <label id="label" className="form-label smallText-regular">
                    Rating
                    <input id="input" className="smallText-regular" type="number" required onChange={handleChange} min="1" max="5" step={0.1} name="rating" />
                    {errors.rating && <p className="smallText-regular" style={{ color: "red" }}>{errors.rating}</p>}
                </label>
            </div>

            <div className={styles["inputs-row"]} style={{ gap: 8 }}>
                <label id="label" className="form-label smallText-regular">
                    Plataformas
                    <MultiSelect
                        options={optionsPlatforms}
                        value={selectedPlatforms}
                        onChange={setSelectedPlatforms}
                    />

                    {errors.platforms && <p className="smallText-regular" style={{ color: "red" }}>{errors.platforms}</p>}
                </label>

                <label id="label" className="form-label smallText-regular">
                    Generos
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                    />
                    {errors.genres && <p className="smallText-regular" style={{ color: "red" }}>{errors.genres}</p>}
                </label>
            </div>

            <div className={styles["inputs-row"]} style={{ gap: 8 }}>
                <label id="label" className="form-label smallText-regular">
                    Link imagen
                    <input id="input" className="smallText-regular" type="text" required onChange={handleChange} name="background_image" />
                    {errors.background_image && <p className="smallText-regular" style={{ color: "red" }}>{errors.background_image}</p>}
                </label>

                <label id="label" className="form-label smallText-regular">
                    Token
                    <input id="input" className="smallText-regular" type="password" required onChange={handleChange} name="token" />
                    {errors.token && <p className="smallText-regular" style={{ color: "red" }}>{errors.token}</p>}
                </label>
            </div>

            <button
                id={styles["submit"]}
                className="btn btn-primary btn1-t1 btn1"
                type="submit"
            >
                Crear personaje
            </button>
        </form>
    )
}