"use client";
type InputProps = {
  type: string;
  name: string;
  label?: string;
  selectLabel?: string;
  placeholder: string;
  className?: string;
  labelClass?: string;
  defaultValue?: string;
  value?: string;
  prefix?: string;
  onChange?: any;
  error?: string | null;
  step?: string;
  required?: boolean;
  rows?: number;
  selectOptions?: { value: string; label: string }[];
  handleSelectChange?: (e: any) => void;
  selectSelected?: { value: string; label: string };
  autoComplete?: "on" | "off";
};

export default function Input(props: InputProps) {
  return (
    <label htmlFor={props.name} className={`label`}>
      {props.label}
      {props.type !== "textarea" && props.type !== "select" ? (
        <input
          defaultValue={props.defaultValue}
          type={props.type}
          step={props.step}
          name={props.name}
          value={props.value}
          prefix={props.prefix}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.className} input `}
          style={{ borderWidth: "1px", width: "100%" }}
          required={props.required}
          autoComplete={props.autoComplete || "off"}
        />
      ) : props.type === "select" ? (
        <select
          className={`select ${props.className} `}
          name={props.name}
          onChange={props.handleSelectChange}
          defaultValue={1}
        
          value={props.selectSelected?.value}
          placeholder="Selecciona una opción"
        >
          <option value={1} disabled>
            {props.selectLabel}
          </option>
          <option value={"Default"}>Default</option>
          {props?.selectOptions?.map((option) => (
            <option value={option?.value} key={option?.value}>
              {option?.label}{" "}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          defaultValue={props.defaultValue}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={`${props.className} textarea`}
          style={{ borderWidth: "1px", width: "100%" }}
          required={props.required}
          rows={props.rows}
        />
      )}
      {props.error && (
        <p className="" style={{ color: "red" }}>
          {props.error}
        </p>
      )}
    </label>
  );
}
