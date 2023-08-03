export default function errorBlack({ error, theme }: any) {
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
      <h3
        className="titulo3-bold"
        style={{ color: theme === "dark" ? "#FFF" : "red" }}
      >
        Algo salio mal {error}
      </h3>
    </section>
  );
}
