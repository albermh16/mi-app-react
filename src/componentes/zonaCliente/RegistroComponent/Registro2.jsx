import '.Registro2.css'

function Registro2() {
    return (
        <div className="container">
            <div className='row'>
                {/*columna de la izquierda con botones login de google y facebook*/}
                <div className='col-6'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <h1 style={{ color: "orange" }}>Hola, ¿creamos tu cuenta?</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <p>Estás a punto de crear tu cuenta en HSNstore con lo que conseguirás acceder a promociones especiales, acumular puntos, y ahorrarte dinero...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*columna de la derecha con formulario de registro*/}
                <div className='col-6'>
                    <form>
                        <div className="mb-3">
                            <label for="txtNombre" className="form-label">*Nombre</label>
                            <input type="text" className="form-control" id="txtNombre" aria-describedby="nombreHelp" />
                            <div id="nombreHelp" className="form-text">No introduzcas mas de 100 caracteres.</div>
                        </div>
                        <div className="mb-3">
                            <label for="txtApellido" className="form-label">*Apellidos</label>
                            <input type="text" className="form-control" id="txtApellido" aria-describedby="apellidosHelp" />
                            <div id="apellidosHelp" className="form-text">No introduzcas mas de 100 caracteres.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">No compartas tu email con nadie mas</div>
                        </div>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Elige una opcion</option>
                            <option value="H">Hombre</option>
                            <option value="M">Mujer</option>
                            <option value="O">Otros</option>
                        </select>
                        <div className="mb-3">
                            <label for="txtPsw" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="txtPsw" />
                            Enviar promociones especiales para clientes
                        </div>
                        <div className="mb-3">
                            <label for="txtAmigo" className="form-label">Codigo plan amigo</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="amigoHelp" />
                            <div id="emailHelp" className="form-text">No compartas tu email con nadie mas</div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1">
                                <label className="form-check-label" for="exampleCheck1">Check me out</label></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registro2