"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getGameById } from "@/redux/slices/client/games";
import styles from "./page.module.scss";

import { Error, Loader } from "@/components";

export default function GameDetails({
  params,
}: {
  params: { gameId: string };
}) {
  const dispatch = useAppDispatch();

  const { isLoading, isError, currentGame } = useAppSelector(
    (state) => state?.client.games,
  );

  useEffect(() => {
    dispatch(getGameById(params.gameId));
  }, [dispatch, params.gameId]);

  if (isLoading) {
    return <Loader theme={"dark"} />;
  }
  if (isError) {
    return <Error theme={"dark"} />;
  }

  return (
    <>
      <section
        id={styles["hero"]}
        className="padding-lr-t1"
        style={{
          background: `url(${currentGame?.background_image}) top / contain repeat`,
        }}
      >
        <div id={styles["hero_col1"]}>
          <div id={styles["col1_card1"]} className={styles["blured-red-box"]}>
            <h1 id={styles["card1_title"]} className="margin-b-8 titulo2-bold">
              {currentGame?.name}
              <br />
            </h1>
            <div
              id={styles["card1_desc"]}
              className="body-regular"
              dangerouslySetInnerHTML={{ __html: currentGame?.description }}
            ></div>
          </div>
          <div id={styles["col1_card2"]} className={styles["blured-red-box"]}>
            <p className="body-regular">
              <strong>Platorms: </strong>
              {Array.isArray(currentGame?.platforms) &&
                currentGame?.platforms.map((genre: any) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
              <br />
            </p>
            <p className="body-regular">
              <strong>Genres: </strong>
              {Array.isArray(currentGame?.genres) &&
                currentGame?.genres.map((genre: any) => (
                  <span key={genre.id}>{genre.name} </span>
                ))}
            </p>
            <p className="body-regular">
              <strong>Released: </strong>
              {currentGame?.released}
            </p>
            <p className="body-regular">
              <strong>Rating: </strong>
              {currentGame?.rating}
              <br />
            </p>
          </div>
        </div>
        <div id={styles["hero_col2"]}>
          <div id={styles["col2_card_inner"]}>
            <img
              id={styles["inner_img"]}
              src={currentGame?.background_image}
              alt={currentGame?.name}
            />
          </div>
        </div>
      </section>
    </>
  );
}
