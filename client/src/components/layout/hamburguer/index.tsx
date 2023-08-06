import { Nav } from "@/components";
import Image from "next/image";

type HamburguerProps = {
  manageHamburguer: (data: boolean) => void;
};

export default function Hamburguer({ manageHamburguer }: HamburguerProps) {
  return (
    <div
      id="hamburguerMenu"
      className="padding-lr-t1"
      style={{ backdropFilter: "blur(26px)" }}
    >
      <Image
        className="modalCloseBtn"
        src="/img/fi-br-cross.svg"
        width={24}
        height={24}
        onClick={() => manageHamburguer(false)}
        alt="close"
      />
      <div className="flex flex-col gap-4">
        <p className="text-white font-light text-[18px] ">MENU</p>
        <Nav
          classname="text-[24px] "
          mode="vertical"
          actionClick={() => manageHamburguer(false)}
        />
        <div className="flex flex-col">
          <p className="text-white font-medium text-[16px] ">
            Ponte en contacto
          </p>
          <span className="text-white font-light text-[16px] ">
            thomasbarenghi@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
