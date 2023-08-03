import Link from "next/link";
import styles from "./gameCard.module.scss";
import { deleteGame } from "@/redux/slices/client/games";
import { useAppDispatch } from "@/redux/hooks";

export default function GameCard({ game }: any) {
  const dispatch = useAppDispatch();

  return (
    <div style={{ position: "relative" }}>
      {game.source === "own" && (
        <button
          id={styles["quitBtn"]}
          className="btn1 btn1-t1"
          onClick={() => dispatch(deleteGame(game.id))}
        >
          Delete
        </button>
      )}
      <Link href={`/games/${game.id}`}>
        <div id={styles["componente_cardGames"]}>
          <img
            id={styles["cardGames_img"]}
            src={game.background_image}
            alt="imagen"
          />
          <div id={styles["cardGames_contents"]}>
            <h1
              id={styles["contents_titulo"]}
              className="titulo3-bold margin-b-0"
            >
              {game.name}
            </h1>
            <div id={styles["contents_generos"]}>
              <img
                id={styles["generos_icon"]}
                src="img/fi-br-playing-cards.svg"
                alt="icono"
              />
              <p id={styles["generos_text"]} className="body-regular">
                {Array.isArray(game?.genres) &&
                  game.genres?.map((genre: any) => (
                    <span key={genre.id}>{genre.name} </span>
                  ))}
                <br />
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
