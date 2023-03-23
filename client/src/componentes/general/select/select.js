import styles from './select.module.scss';

export default function SelectComponent({ active, values, onChange, name, labelClass, selectClass }) {

    return (
        <label id={styles["filtros_orden"]} className={`form-label margin-b-0 ${styles[labelClass]}`}>
        {name}
        <select className={`${styles[selectClass]} body-regular`} name={name} value={active} onChange={onChange}>
        {Array.isArray(values) && values.map((value, index) => (
            <option key={index} value={value}>
            {value}
            </option>
        ))}
        </select>
      </label>
    );
}