import Link from "next/link";
import { Routes } from "@/constants";

type Props = {
  style?: any;
  classname?: string;
  mode?: "horizontal" | "vertical";
};

export default function Nav({ style, classname, mode = "horizontal" }: Props) {
  return (
    <>
      <div
        className={`flex justify-between  ${
          mode === "horizontal" ? "gap-8" : "flex-col gap-3"
        }`}
      >
        <Link href={Routes.HOME} style={style} className={classname}>
          Inicio
        </Link>
        <Link href={Routes.GAMES} style={style} className={classname}>
          Videojuegos
        </Link>
        <Link href={Routes.ABOUT} style={style} className={classname}>
          Nosotros
        </Link>
      </div>
    </>
  );
}
