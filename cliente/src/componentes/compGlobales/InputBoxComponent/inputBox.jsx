function InputBox({
    id,
    label,
    type = "text",
    placeholder,
    name,
    required = false,
    tipo,
    value,
    valido,
    errorMsg,
    okMsg,
    OnChangeHandler,
    extraStyle
 }) {


    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label} <span className="text-danger">*</span>
            </label>
            <input
                type={type} //.... aqui tipo campo...
                className="form-control"
                id={id}
                placeholder={placeholder} // ... aqui nombre campo... o valor por defecto
                name={name}
                required={required}//<-- atributos de validacion html5 para el input
                onBlur={(ev) => OnChangeHandler(ev, tipo)}// <-- aqui la funcion cambia variable state del componente padre
                style={extraStyle}
            />
            {value && !valido && (
                <p style={{ color: "red" }}>{errorMsg}</p>
            )}
            {valido && (
                <p style={{ color: "green" }}>{okMsg}</p>
            )}
            <div className="invalid-feedback">{label.toLowerCase()}</div>
        </div>
    )
}

export default InputBox;