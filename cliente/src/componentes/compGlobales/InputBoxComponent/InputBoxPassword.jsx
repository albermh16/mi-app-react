function InputBoxPassword({
    id,
    label,
    placeholder,
    name,
    tipo,
    value,
    required = false,
    showPassword,
    setShowPassword,
    validoMin,
    validoMayus,
    valido,
    minMsg,
    mayusMsg,
    okMsg,
    OnChangeHandler


}){
    return (

        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label} <span className="text-danger">*</span>
            </label>
            <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id={id}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    onBlur={(ev) => OnChangeHandler(ev,  tipo )}
                />
                <button
                    type="button"
                    className="input-group-text bg-white border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye-slash"
                            viewBox="0 0 16 16"
                        >
                            <path d="M13.359 11.238l2.122 2.122-1.414 1.414-2.122-2.122a8.455 8.455 0 01-5.945 2.112C4.998 14.764 2.63 13.633 1 12.143l1.5-1.5c1.236 1.059 2.851 1.821 4.5 2.021v.002c.376.055.764.085 1.156.085.393 0 .78-.03 1.156-.085v-.003a8.456 8.456 0 005.148-2.471zM3.738 4.523l-2.122-2.122 1.414-1.414 2.122 2.122A8.455 8.455 0 018.5 1.236 8.455 8.455 0 0114.357 3.8l-1.5 1.5a8.456 8.456 0 00-5.148-2.471L8.5 2.828a2.5 2.5 0 00-3.535 0L3.738 4.523zm8.354.976l1.5 1.5a8.455 8.455 0 01.006 4.638l-1.494-1.494a5.471 5.471 0 00-.013-1.65l-1.008-1.008a5.5 5.5 0 00-7.748-.87l-1.502-1.502a8.456 8.456 0 015.148-2.471z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye"
                            viewBox="0 0 16 16"
                        >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM8 2a6 6 0 00-6 6c0 .582.085 1.145.242 1.682C2.32 9.29 2.59 9.32 2.885 9.32 4.7 9.32 6.36 10.98 6.36 12.8c0 .295-.03.566-.09.836A6 6 0 008 14a6 6 0 006-6 6 6 0 00-6-6z" />
                            <path d="M8 5.5c-1.738 0-3.144 1.406-3.144 3.144s1.406 3.144 3.144 3.144 3.144-1.406 3.144-3.144C11.144 6.906 9.738 5.5 8 5.5z" />
                        </svg>
                    )}
                </button>
            </div>
            {value && !validoMin && (
                <p style={{ color: "red" }}>{minMsg}</p>
            )}
            {value && !validoMayus && (
                <p style={{ color: "red" }}>{mayusMsg}</p>
            )}
            {valido && (
                <p style={{ color: "green" }}>{okMsg}</p>
            )}
        </div>
    )
}

export default InputBoxPassword;