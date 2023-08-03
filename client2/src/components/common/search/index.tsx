import Image from "next/image";
import styles from "./search.module.scss";

export default function Search({ handleOnSearch, mode, activeSearch }: any) {
  return (
    <div
      id={
        mode === "light" ? styles["filtros_search"] : styles["filtros_search2"]
      }
    >
      <Image
        id={mode === "light" ? styles["search_icon"] : styles["search_icon-1"]}
        alt="search icon"
        src={
          mode === "light"
            ? "/img/fi-br-search.svg"
            : "/img/fi-br-searchClear.svg"
        }
        width={20}
        height={28}
      />
      <input
        onChange={(e) => handleOnSearch(e)}
        id={mode === "light" ? styles["search_input"] : styles["search_input2"]}
        className="body-regular margin-b-0"
        type="search"
        value={activeSearch}
        placeholder="Buscar un juego"
      />
    </div>
  );
}
