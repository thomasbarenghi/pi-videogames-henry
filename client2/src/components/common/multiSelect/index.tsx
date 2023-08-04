import React, { useState, useEffect, useRef } from "react";

type DropdownProps = {
  valores: any;
  setSeleccionados: (status: any) => void;
  seleccionados: any[];
  label: string;
};

function Dropdown({ valores, setSeleccionados, seleccionados }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div  ref={dropdownRef} id="dropdown">
      <div id="dropdown-content">
        <button
          className={` smallText-regular`}
          onClick={() => handleDropdownClick()}
          type="button"
        >
          {seleccionados.length > 0
            ? seleccionados
                .map((v: any) => v.label)
                .join(", ")
                .slice(0, 50) + (seleccionados.length > 1 ? "..." : "")
            : "Seleccionar"}
        </button>
        <>
          {isDropdownOpen && (
            <div
              className={``}
              id="dropdown-content"
            >
              {valores.map((valor: any, index: number) => (
                <div key={index} className={``}>
                  <input
                    type="checkbox"
                    value={valor.value}
                    checked={seleccionados.some(
                      (v: any) => v.value === valor.value
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSeleccionados([
                          ...seleccionados,
                          { label: valor.label, value: valor.value },
                        ]);
                      } else {
                        setSeleccionados(
                          seleccionados.filter(
                            (v: any) => v.value !== valor.value
                          )
                        );
                      }
                    }}
                  />
                  <label>{valor.label}</label>
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Dropdown;
