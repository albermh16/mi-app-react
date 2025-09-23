function InputBox(props) {
    return (
        <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
                ... Nombre del campo <span className="text-danger">*</span>
            </label>
            <input
                type="text" //.... aqui tipo campo...
                className="form-control"
                id="... nombre campo"
                placeholder="" // ... aqui nombre campo... o valor por defecto
                name='... nombre campo'
                required //<-- atributos de validacion html5 para el input
                onBlur={(ev) => OnChangeHandler(ev, "particular")}// <-- aqui la funcion cambia variable state del componente padre
            />
            {formParticular.apellidos && !apellidoValidoPar && (
                <p style={{ color: "red" }}>Debe tener al menos 4 letras</p>
            )}
            {apellidoValidoPar && (
                <p style={{ color: "green" }}>Nombre valido</p>
            )}
            <div className="invalid-feedback">Introduce tus apellidos.</div>
        </div>
    )
}

export default InputBox;