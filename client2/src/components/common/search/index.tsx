import Image from "next/image";
import styles from "./search.module.scss";

type Props = {
  handleOnSearch: (e: any) => void;
  mode: "light" | "dark";
  activeSearch: string;
};

export default function Search({ handleOnSearch, mode, activeSearch }: Props) {
  return (
    <div
      className={
        mode === "light" ? "searchLight" : "searchDark"
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
