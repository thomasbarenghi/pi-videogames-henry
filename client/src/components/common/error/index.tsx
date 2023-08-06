type Props = {
  error: string;
  theme: "dark" | "light";
};

export default function errorBlack({ error, theme }: Props) {
  return (
    <section
      style={{
        minHeight: "30vh",
        background: theme === "dark" ? "#000" : "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <h3
        className="titulo3-bold"
        style={{ color: theme === "dark" ? "#FFF" : "red" }}
      >
        Algo salio mal {error}
      </h3>
    </section>
  );
}
