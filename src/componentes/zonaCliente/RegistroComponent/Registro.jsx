import { tieneArroba, tieneMinimo, tieneMayuscula, seleccionar } from '../../../utils/validaciones';
import { useState } from 'react';


function Registro() {
    const [modo, setModo] = useState('particular');
    const [showPassword, setShowPassword] = useState(false);

    {/* VALIDACION PARTICULAR */ }
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [genero, setGenero] = useState("");
    const [password, setPassword] = useState("");

    const emailValidoPar = tieneArroba(email);
    const nombreValidoPar = tieneMinimo(nombre);
    const apellidoValidoPar = tieneMinimo(apellidos);
    const generoValidoPar = seleccionar(genero);
    const pswValidoMayusPar = tieneMayuscula(password);
    const pswValidoMinPar = tieneMinimo(password);
    const pswValido = tieneMinimo(password) && tieneMayuscula(password);

    {/* VALIDACION EMPRESA*/ }
    const [nombreEmp, setNombreEmp] = useState("");
    const [apellidosEmp, setApellidosEmp] = useState("");
    const [emailEmp, setEmailEmp] = useState("");
    const [passwordEmp, setPasswordEmp] = useState("");

    const emailValidoEmp = tieneArroba(emailEmp);
    const nombreValidoEmp = tieneMinimo(nombreEmp);
    const apellidoValidoEmp = tieneMinimo(apellidosEmp);
    const pswValidoMayusEmp = tieneMayuscula(passwordEmp);
    const pswValidoMinEmp = tieneMinimo(passwordEmp);
    const pswValidoEmp = tieneMinimo(passwordEmp) && tieneMayuscula(passwordEmp);

    const handleSubmit = (ev) => {
        ev.preventDefault();

        if (modo === "particular") {

            console.log("Nombre:", nombre);
            console.log("Apellidos:", apellidos);
            console.log("Email:", email);
            console.log("Password:", password);
            console.log("Genero:", genero,);

        }

        if (modo === "empresa") {

            console.log("Nombre:", nombreEmp);
            console.log("Apellidos:", apellidosEmp);
            console.log("Email:", emailEmp);
            console.log("Password:", passwordEmp);

        }

    };


    return (
        <div className="container my-5">
            <div className="row">
                {/* Columna izquierda: introducción y redes sociales */}
                <div className="col-lg-5 mb-4 mb-lg-0">
                    <h1 style={{ color: "#e1522e" }} className="fw-bold mb-3">
                        Hola, ¿creamos tu cuenta?
                    </h1>
                    <p className="text-muted">
                        Estás a punto de crear tu cuenta en HSNstore con lo que conseguirás
                        acceder a promociones especiales, acumular puntos, y ahorrarte
                        dinero...
                    </p>
                    <p>
                        <a href="#" className="text-primary text-decoration-underline">
                            Uy, si yo ya tengo una cuenta creada.
                        </a>
                    </p>
                    {/* Lista de ventajas */}
                    <div className="mb-3">
                        {[
                            "Accederás a promociones y descuentos antes que nadie.",
                            "Acumularás puntos = dinero para futuras compras.",
                            "Recibirás cupones, regalos sorpresa sólo para registrados.",
                            "Podrás invitar a tus amigos y conseguir 5€ en futuras compras.",
                            "Puedes cargar tus pedidos anteriores con un solo click.",
                            "Y mucho más...",
                        ].map((item, idx) => (
                            <p key={idx} className="mb-2 d-flex align-items-start">
                                <span
                                    className="me-2"
                                    style={{
                                        color: "#e1522e",
                                        fontSize: "1.1rem",
                                        lineHeight: 1,
                                    }}
                                >
                                    ✔
                                </span>
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>
                    {/* Redes sociales */}
                    <div className="p-3" style={{ backgroundColor: "#f5f5f5" }}>
                        <h6 className="fw-bold text-uppercase mb-3">
                            Crea o accede con tus redes sociales
                        </h6>
                        <button
                            type="button"
                            className="btn w-100 mb-2 d-flex align-items-center border"
                            style={{ backgroundColor: "#fff", borderColor: "#dadce0" }}
                        >
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            <span className="flex-grow-1 text-center">
                                Continuar con Google
                            </span>
                        </button>
                        <button
                            type="button"
                            className="btn w-100 d-flex align-items-center border"
                            style={{ backgroundColor: "#fff", borderColor: "#dadce0" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#1877F2"
                                className="me-2"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.73 2h-2.6C8.84 2 8.5 2.77 8.5 4v1H11l-.5 3H8.5v7H5.5V8H3.5V5h2v-.75C5.5 2.83 6.79 1 9.73 1H12v3z" />
                            </svg>
                            <span className="flex-grow-1 text-center">
                                Continuar con Facebook
                            </span>
                        </button>
                    </div>
                </div>

                {/* Columna derecha: formulario de registro */}
                <div className="col-lg-7">
                    <div className="border p-4">
                        <h2 className="h5 fw-bold mb-3">Datos de identificación de cuenta</h2>
                        {/* Selector de tipo de cuenta */}
                        <div className="btn-group mb-2" role="group" aria-label="Tipo de cuenta">
                            <button onClick={() => setModo('particular')}
                                type="button"
                                className="btn"
                                style={{
                                    borderColor: "#e1522e",
                                    color: modo === 'particular' ? 'white' : '#e1522e',
                                    backgroundColor: modo === 'particular' ? '#e1522e' : 'transparent',
                                    fontWeight: 600,
                                }}
                            >
                                Particular
                            </button>
                            <button onClick={() => setModo('empresa')}
                                type="button"
                                className="btn"
                                style={{
                                    borderColor: "#e1522e",
                                    color: modo === 'empresa' ? 'white' : '#e1522e',
                                    backgroundColor: modo === 'empresa' ? '#e1522e' : 'transparent',
                                    fontWeight: 600,
                                }}
                            >
                                Empresa
                            </button>
                        </div>
                        <p className="small text-danger">
                            * Atención: si eres autónomo o empresa y necesitas una factura
                            selecciona la opción EMPRESA.
                        </p>
                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            {modo === 'particular' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">
                                            Nombre <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            placeholder="Nombre"
                                            required
                                            onBlur={(ev) => setNombre(ev.target.value)}
                                        />
                                        {nombre && !nombreValidoPar && (
                                            <p style={{ color: "red" }}>Debe tener al menos 4 letras</p>
                                        )}
                                        {nombreValidoPar && (
                                            <p style={{ color: "green" }}>Nombre valido</p>
                                        )}
                                        <div className="invalid-feedback">Introduce tu nombre.</div>
                                    </div><div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">
                                            Apellido <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="apellido"
                                            placeholder="Apellido"
                                            required
                                            onBlur={(ev) => setApellidos(ev.target.value)}
                                        />
                                        {apellidos && !apellidoValidoPar && (
                                            <p style={{ color: "red" }}>Debe tener al menos 4 letras</p>
                                        )}
                                        {apellidoValidoPar && (
                                            <p style={{ color: "green" }}>Nombre valido</p>
                                        )}
                                        <div className="invalid-feedback">Introduce tus apellidos.</div>
                                    </div><div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            required
                                            onBlur={(ev) => setEmail(ev.target.value)}
                                        />
                                        {email && !emailValidoPar && (
                                            <p style={{ color: "red" }}>Debe contener @</p>
                                        )}
                                        {emailValidoPar && (
                                            <p style={{ color: "green" }}>Email valido</p>
                                        )}
                                        <div className="invalid-feedback">
                                            Introduce un email válido.
                                        </div>
                                    </div><div className="mb-3">
                                        <label htmlFor="genero" className="form-label">
                                            Género <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            id="genero"
                                            className="form-select"
                                            defaultValue=""
                                            required
                                            onChange={(e) => setGenero(e.target.value)}
                                        >
                                            <option value="" disabled>Selecciona un género</option>
                                            <option>Hombre</option>
                                            <option>Mujer</option>
                                            <option>No binario</option>
                                            <option>Prefiero no decirlo</option>
                                        </select>
                                        {!generoValidoPar && (
                                            <p style={{ color: "red" }}>Debe seleccionar un género</p>
                                        )}
                                        {generoValidoPar && (
                                            <p style={{ color: "green" }}>Genero valido</p>
                                        )}
                                        <div className="invalid-feedback">
                                            Selecciona una opción.
                                        </div>
                                    </div>


                                    {/* Contraseña con icono de mostrar/ocultar */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Introduce tu contraseña <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                placeholder="Introduce tu contraseña"
                                                required
                                                minLength={8}
                                                onBlur={(e) => setPassword(e.target.value)}
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
                                        {password && !pswValidoMinPar && (
                                            <p style={{ color: "red" }}>Debe contener minimo 4 caracteres</p>
                                        )}
                                        {password && !pswValidoMayusPar && (
                                            <p style={{ color: "red" }}>Debe contener minimo 1 mayuscula</p>
                                        )}
                                        {pswValido && (
                                            <p style={{ color: "green" }}>Contraseña válida</p>
                                        )}
                                        <div className="invalid-feedback">
                                            La contraseña debe tener al menos 8 caracteres.
                                        </div>
                                    </div>
                                    {/* Código Plan Amigo */}
                                    <div className="mb-3">
                                        <label htmlFor="planAmigo" className="form-label">
                                            Código Plan Amigo
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="planAmigo"
                                            placeholder="Código Plan Amigo"
                                            style={{ borderStyle: "dashed" }}
                                        />
                                    </div>
                                    {/* Promociones y privacidad */}
                                    <h6 className="fw-bold">Enviar promociones especiales para clientes</h6>
                                    <div className="form-check mb-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="promo"
                                        />
                                        <label className="form-check-label" htmlFor="promo">
                                            Quiero recibir promociones exclusivas y contenidos personalizados
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="privacidad"
                                            required
                                        />
                                        <label className="form-check-label" htmlFor="privacidad">
                                            He leído y acepto la{" "}
                                            <a href="#" className="text-primary text-decoration-underline">
                                                Política de privacidad
                                            </a>
                                        </label>
                                        <div className="invalid-feedback">
                                            Debes aceptar la política de privacidad.
                                        </div>
                                    </div>
                                    {/* Botón de envío */}
                                    <button type="submit" className="btn btn-success w-100">
                                        REGISTRARME YA
                                    </button>
                                </>)}
                            {/*Empresa*/}
                            {modo === 'empresa' && (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre empresa *</label>
                                        <input type="text" className="form-control" placeholder="Nombre de la empresa" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">CIF / NIF *</label>
                                        <input type="text" className="form-control" placeholder="CIF / NIF" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Recargo de equivalencia *</label>
                                        <select className="form-select" required defaultValue="">
                                            <option value="">Escoge una opción</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Nombre de contacto *</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                            required
                                            onBlur={(ev) => setNombreEmp(ev.target.value)}
                                        />
                                        {nombreEmp && !nombreValidoEmp && (
                                            <p style={{ color: "red" }}>Debe tener al menos 4 letras</p>
                                        )}
                                        {nombreValidoEmp && (
                                            <p style={{ color: "green" }}>Nombre valido</p>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Apellido de contacto *</label>
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Apellido"
                                            required
                                            onBlur={(ev) => setApellidosEmp(ev.target.value)}
                                        />
                                        {apellidosEmp && !apellidoValidoEmp && (
                                            <p style={{ color: "red" }}>Debe tener al menos 4 letras</p>
                                        )}
                                        {apellidoValidoEmp && (
                                            <p style={{ color: "green" }}>Apellido valido</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email *</label>
                                        <input type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            required
                                            onBlur={(ev) => setEmailEmp(ev.target.value)}
                                        />
                                        {emailEmp && !emailValidoEmp && (
                                            <p style={{ color: "red" }}>Debe contener @</p>
                                        )}
                                        {emailValidoEmp && (
                                            <p style={{ color: "green" }}>Email valido</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Introduce tu contraseña *</label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                placeholder="Introduce tu contraseña"
                                                required
                                                minLength={8}
                                                onBlur={(e) => setPasswordEmp(e.target.value)}
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
                                        {passwordEmp && !pswValidoMinEmp && (
                                            <p style={{ color: "red" }}>Debe contener minimo 4 caracteres</p>
                                        )}
                                        {passwordEmp && !pswValidoMayusEmp && (
                                            <p style={{ color: "red" }}>Debe contener minimo 1 mayuscula</p>
                                        )}
                                        {pswValidoEmp && (
                                            <p style={{ color: "green" }}>Contraseña válida</p>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Código Plan Amigo</label>
                                        <input type="text" className="form-control form-control-dashed" placeholder="Código Plan Amigo" />
                                    </div>

                                    <div className="form-check mb-2">
                                        <input className="form-check-input" type="checkbox" id="promosE" />
                                        <label className="form-check-label" htmlFor="promosE">
                                            Quiero recibir promociones exclusivas y contenidos personalizados
                                        </label>
                                    </div>

                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="privacidadE" required />
                                        <label className="form-check-label" htmlFor="privacidadE">
                                            He leído y acepto la <a href="#">Política de privacidad</a>
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">
                                        REGISTRARME YA
                                    </button>
                                </>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;