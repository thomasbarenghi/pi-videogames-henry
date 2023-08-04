import Image from "next/image";

type Props = {
  theme: "dark" | "light";
};

export default function Loader({ theme }: Props) {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: theme === "dark" ? "#000" : "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Image
        src={
          theme === "dark"
            ? "/img/Infinity-1s-200px(1).svg"
            : "/img/Infinity-1s-200px(2).svg"
        }
        style={{ width: 80, height: 80 }}
        width={80}
        height={80}
        alt="loader"
      />
    </section>
  );
}
