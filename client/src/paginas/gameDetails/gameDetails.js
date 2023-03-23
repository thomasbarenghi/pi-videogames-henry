import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGameById } from '../../redux/actions/api/apiGames';
import styles from './gameDetails.module.scss';
import parse from 'html-react-parser';
import LoaderBlack from '../../componentes/general/loader/loaderBlack';

export default function GameDetails() {

    const dispatch = useDispatch();
    const slug = useParams();
    const { isLoading, error, currentGame } = useSelector((state) => state?.apiGames ?? {});
    const [description, setDescription] = useState('');

    useEffect(() => { dispatch(getGameById(slug.id)); }, [dispatch, slug.id]);
    useEffect(() => { if (currentGame?.description) { setDescription(parse(currentGame.description)); } }, [currentGame.description]);

    if (isLoading) { return (<LoaderBlack />) }
    if (error) { return <div>Error: {error}</div>; }

    return (
        <>
            <section
                id={styles["hero"]}
                className="padding-lr-t1"
                style={{ background: `url(${currentGame.background_image}) top / contain repeat` }}
            >
                <div id={styles["hero_col1"]}>
                    <div id={styles["col1_card1"]} className={styles["blured-red-box"]}>
                        <h1 id={styles["card1_title"]} className="margin-b-8 titulo2-bold">
                            {currentGame.name}
                            <br />
                        </h1>
                        <p id={styles["card1_desc"]} className="body-regular">
                            {description}
                        </p>
                    </div>
                    <div id={styles["col1_card2"]} className={styles["blured-red-box"]}>
                        <p className="body-regular">
                            <strong>Platorms: </strong>
                            {Array.isArray(currentGame.platforms) && currentGame.platforms.map((genre) => (
                                <span key={genre.id}>{genre.name} </span>
                            ))}
                            <br />
                        </p>
                        <p className="body-regular">
                            <strong>Genres: </strong>
                            {Array.isArray(currentGame.genres) && currentGame.genres.map((genre) => (
                                <span key={genre.id}>{genre.name} </span>
                            ))}
                        </p>
                        <p className="body-regular">
                            <strong>Released: </strong>{currentGame.released}
                        </p>
                        <p className="body-regular">
                            <strong>Rating: </strong>{currentGame.rating}
                            <br />
                        </p>
                    </div>
                </div>
                <div id={styles["hero_col2"]}>
                    <div id={styles["col2_card_inner"]}>
                        <img id={styles["inner_img"]} src={currentGame.background_image} />
                    </div>
                </div>
            </section>
        </>
    )
}