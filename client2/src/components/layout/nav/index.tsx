import Link from "next/link";
import { Routes } from "@/constants";

export default function Nav({ style }: any) {
  return (
    <>
      <li>
        <Link href={Routes.HOME} style={style}>
          Inicio
        </Link>
      </li>
      <li>
        <Link href={Routes.GAMES} style={style}>
          Videojuegos
        </Link>
      </li>
      <li>
        <Link href={Routes.ABOUT} style={style}>
          Nosotros
        </Link>
      </li>
    </>
  );
}
