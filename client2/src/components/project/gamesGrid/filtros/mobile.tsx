import { Input, Search, Button, BottomSheet, CreateGame } from "@/components";
import styles from "./filtros.module.scss";
type FiltersInnerProps = {
    children?: React.ReactNode;
  };
  
  export function FiltersInner({ children }: FiltersInnerProps) {
    return (
      <>
        <div
          className="padding-lr-t1"
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            width: "100%",
          }}
          id="test"
        >
          <h1 className="titulo3-bold margin-b-4" style={{ color: "#ffffff" }}>
            Filtrar juegos
          </h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "10px",
              flexDirection: "column",
            }}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
  
  export function SearchInner({ handleOnSearch }: any) {
    return (
      <>
        <div style={{ width: "100%" }}>
          <div className="padding-lr-t1" style={{ width: "100%" }}>
            <h1 className="titulo3-bold" style={{ color: "#ffffff" }}>
              Busca a tu juego favorito
            </h1>
            <Search handleOnSearch={handleOnSearch} mode="dark" activeSearch="" />
          </div>
        </div>
        <img
          id={styles["closeModalSearch"]}
          src="/img/fi-br-cross.png"
          style={{ display: "none" }}
          alt="close"
        />
      </>
    );
  }
  