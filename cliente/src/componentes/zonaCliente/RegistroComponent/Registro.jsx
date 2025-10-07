import { tieneArroba, tieneMinimo, tieneMayuscula, seleccionar } from '../../../utils/validaciones';
import { useState } from 'react';
import InputBox from '../../compGlobales/InputBoxComponent/inputBox';
import InputBoxPassword from '../../compGlobales/InputBoxComponent/InputBoxPassword';
import { useNavigate } from 'react-router-dom';


function Registro() {
    const [modo, setModo] = useState('particular');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    //funcion para redirigir a login
    const irLogin = () => {
        navigate('/Cliente/Login');
    }

    // VALIDACION PARTICULAR 
    const [formParticular, setFormParticular] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        genero: "",
        password: "",
    });

    const emailValidoPar = tieneArroba(formParticular.email);
    const nombreValidoPar = tieneMinimo(formParticular.nombre);
    const apellidoValidoPar = tieneMinimo(formParticular.apellidos);
    const generoValidoPar = seleccionar(formParticular.genero);
    const pswValidoMayusPar = tieneMayuscula(formParticular.password);
    const pswValidoMinPar = tieneMinimo(formParticular.password);
    const pswValido = tieneMinimo(formParticular.password) && tieneMayuscula(formParticular.password);

    // VALIDACION EMPRESA
    const [formEmpresa, setFormEmpresa] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "ASDASDAS",
    });

    const emailValidoEmp = tieneArroba(formEmpresa.email);
    const nombreValidoEmp = tieneMinimo(formEmpresa.nombre);
    const apellidoValidoEmp = tieneMinimo(formEmpresa.apellidos);
    const pswValidoMayusEmp = tieneMayuscula(formEmpresa.password);
    const pswValidoMinEmp = tieneMinimo(formEmpresa.password);
    const pswValidoEmp = tieneMinimo(formEmpresa.password) && tieneMayuscula(formEmpresa.password);

    const OnChangeHandler = (ev, tipo) => {

        if (tipo === "particular") {
            setFormParticular({ ...formParticular, [ev.target.name]: ev.target.value });
        } else {
            setFormEmpresa({ ...formEmpresa, [ev.target.name]: ev.target.value });
        }
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const datos = modo === "particular" ? formParticular : formEmpresa;

        console.log(`Datos del formulario: `, JSON.stringify(datos));

        //mando datos al servidor de nodejs al servicio API-REST
        try {

            const respuesta = await fetch("http://localhost:3000/api/Cliente/Registro", { //<--- el await recupera la respuesta del servidor CORRECTA! como el .then

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos), //<--------Serializamos el objeto literal a texto para incluirlo en la peticion

            });

            // el objeto respuesta
            console.log(`Estado HTTP: ${respuesta.status}`);

            // si el servidor devuelve JSON, lo parseamos
            const data = await respuesta.json();

        } catch (error) {
            console.log(`Error en la peticion: ${error}`)
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
                        <a href="#" className="text-primary text-decoration-underline" onClick={irLogin}>
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
                                    <InputBox
                                        id="nombre"
                                        label="Nombre"
                                        placeholder="Introduce tu nombre"
                                        name="nombre"
                                        type="text"
                                        required={true}
                                        tipo="particular"
                                        value={formParticular.nombre}
                                        valido={nombreValidoPar}
                                        errorMsg="Debe tener al menos 4 letras"
                                        okMsg="Nombre válido"
                                        OnChangeHandler={OnChangeHandler}
                                    />
                                    <InputBox
                                        id="apellido"
                                        label="Apellido"
                                        placeholder="Introduce tu apellido"
                                        name="apellidos"
                                        type="text"
                                        required={true}
                                        tipo="particular"
                                        value={formParticular.apellidos}
                                        valido={apellidoValidoPar}
                                        errorMsg="Debe tener al menos 4 letras"
                                        okMsg="Apellido válido"
                                        OnChangeHandler={OnChangeHandler}
                                    />
                                    <InputBox
                                        id="email"
                                        label="Email"
                                        placeholder="Introduce tu email"
                                        name="email"
                                        type="text"
                                        required={true}
                                        tipo="particular"
                                        value={formParticular.email}
                                        valido={emailValidoPar}
                                        errorMsg="Debe contener @"
                                        okMsg="Email válido"
                                        OnChangeHandler={OnChangeHandler}
                                    />
                                    <div className="mb-3">
                                        <label htmlFor="genero" className="form-label">
                                            Género <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            id="genero"
                                            name="genero"
                                            value={formParticular.genero}
                                            onChange={(ev) => OnChangeHandler(ev, "particular")}
                                            required
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="hombre">Hombre</option>
                                            <option value="mujer">Mujer</option>
                                            <option value="otro">Otro</option>
                                            
                                        </select>

                                        {!generoValidoPar && (
                                            <p style={{ color: "red" }}>Debes seleccionar un género</p>
                                        )}
                                        {generoValidoPar && (
                                            <p style={{ color: "green" }}>Género válido</p>
                                        )}
                                    </div>
                                    {/* Contraseña con icono de mostrar/ocultar */} 
                                    <InputBoxPassword
                                        id="password"
                                        label="Introduce tu contraseña"
                                        placeholder="Introduce tu contraseña"
                                        name="password"
                                        tipo="particular"
                                        value={formParticular.password}
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                        validoMin={pswValidoMinPar}
                                        validoMayus={pswValidoMayusPar}
                                        valido={pswValido}
                                        minMsg={"Debe contener almenos 4 caracteres"}
                                        mayusMsg={"Debe contener almenos 1 mayuscula"}
                                        okMsg="Password valida"
                                        OnChangeHandler={OnChangeHandler}
                                    />
                                    {/* Código Plan Amigo */}
                                    <InputBox
                                        id="planAmigo"
                                        label="Código plan amigo"
                                        type="text"
                                        placeholder="Código Plan Amigo"
                                        extraStyle={{ borderStyle: "dashed" }}
                                        name="planAmigo"
                                        OnChangeHandler={OnChangeHandler}
                                    />

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
                                            name='nombre'
                                            required
                                            onBlur={(ev) => OnChangeHandler(ev, "empresa")}
                                        />
                                        {formEmpresa.nombre && !nombreValidoEmp && (
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
                                            name='apellidos'
                                            required
                                            onBlur={(ev) => OnChangeHandler(ev, "empresa")}
                                        />
                                        {formEmpresa.apellidos && !apellidoValidoEmp && (
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
                                            name='email'
                                            required
                                            onBlur={(ev) => OnChangeHandler(ev, "empresa")}
                                        />
                                        {formEmpresa.email && !emailValidoEmp && (
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
                                                name='password'
                                                required
                                                minLength={8}
                                                onBlur={(ev) => OnChangeHandler(ev, "empresa")}
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
                                        {formEmpresa.password && !pswValidoMinEmp && (
                                            <p style={{ color: "red" }}>Debe contener minimo 4 caracteres</p>
                                        )}
                                        {formEmpresa.password && !pswValidoMayusEmp && (
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