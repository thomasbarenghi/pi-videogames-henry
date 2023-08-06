import GameDetailsContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PI Videogames | Games",
  description: "PI Videogames | Games",
  themeColor: "#000000",
};

export default function GameDetails() {
  return (
    <>
      <GameDetailsContent />
    </>
  );
}
