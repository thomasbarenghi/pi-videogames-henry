// export default function MultiSelect({ valores, setSeleccionados, seleccionados, label }) {
//     //Hacer un select con checkpoints
//     console.log(valores,seleccionados)
//     return (
//         <div>
//             <h3>valores seleccionados: {seleccionados.map((v) => v.label)}</h3>
//                 {
//                     valores.map((valor, index) => (
//                         <div key={index}>
//                             <label>{valor.label}</label>
//                             <input type="checkbox" value={valor.value} onChange={(e) => {
//                                 if (e.target.checked) {
//                                    setSeleccionados([...seleccionados, { label: valor.label, value: valor.value }])
//                                  console.log("seleccionadoo", { "label": valor.label, "value": valor.value })
//                                 } else {
//                                     setSeleccionados(seleccionados.filter((v) => v.value !== valor.value))
//                                     console.log("no seleccionadoo", { "label": valor.label, "value": valor.value })
//                                 }
//                             }} />
//                         </div>
//                     ))
//                 }
//             </div>
//     )
// }

import React, { useState, useEffect, useRef } from 'react';
import styles from "./multiSelect.module.scss";

function Dropdown({ valores, setSeleccionados, seleccionados, label }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                console.log('click outside', event.target);
                setIsDropdownOpen(false);
            }
            else {
                console.log('click inside', event.target);
            }
        }

        // Agregar evento de clic al elemento 'window'
        window.addEventListener('click', handleClickOutside);

        // Eliminar evento de clic cuando se desmonta el componente
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef]);

    function handleDropdownClick() {
        console.log('click', isDropdownOpen);
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <div className={`${styles["dropdown"]}`} ref={dropdownRef} type="button" id='dropdown'>
            <div id='dropdown-content'>
            <button className={`${styles["dropbtn"]} smallText-regular`} onClick={() => handleDropdownClick()} type="button">
                {
                    seleccionados.length > 0
                        ? seleccionados
                            .map((v) => v.label)
                            .join(", ")
                            .slice(0, 50) + (seleccionados.length > 1 ? "..." : "")
                        : "Seleccionar"

                }
            </button>
            <>
            {isDropdownOpen && (
                <div className={`${styles["dropdown-content"]}`} id='dropdown-content'>
                    {
                        valores.map((valor, index) => (
                            <div key={index} className={`${styles["dropdown"]}`}>
                                <input type="checkbox" value={valor.value} checked={seleccionados.some((v) => v.value === valor.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSeleccionados([...seleccionados, { label: valor.label, value: valor.value }])
                                            console.log("seleccionadoo", { "label": valor.label, "value": valor.value })
                                        } else {
                                            setSeleccionados(seleccionados.filter((v) => v.value !== valor.value))
                                            console.log("no seleccionadoo", { "label": valor.label, "value": valor.value })
                                        }
                                    }} />
                                <label>{valor.label}</label>
                            </div>
                        ))
                    }
                </div>
            )}
            </>
            </div>
        </div>
    );
}

export default Dropdown;
