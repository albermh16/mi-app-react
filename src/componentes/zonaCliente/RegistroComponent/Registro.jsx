import './Registro.css';
import { useState } from 'react';


function Registro() {
    const [modo, setModo] = useState('particular');
    console.log('Registro: versión centrado v1');
    return (
        <div className="registro-page py-4 py-md-5">
            {/* wrapper centrado y con ancho controlado */}
            <div className="registro-wrap container">
                <div className="row g-4 justify-content-center align-items-stretch">

                    {/* -------- IZQUIERDA -------- */}
                    <div className="col-lg-5">
                        <div className="info-box p-4 p-md-5 h-100">
                            <h2 className="title mb-2">Hola, ¿creamos tu cuenta?</h2>
                            <p className="text-muted mb-2">
                                Estás a punto de crear tu cuenta en HSNstore con lo que conseguirás
                                acceder a promociones especiales, acumular puntos, y ahorrarte dinero...
                            </p>
                            <a href="#" className="link-existing">Uy, si yo ya tengo una cuenta creada.</a>

                            <ul className="benefits mt-4">
                                <li>Accederás a promociones y descuentos antes que nadie.</li>
                                <li>Acumularás puntos = dinero para futuras compras.</li>
                                <li>Recibirás cupones, regalos sorpresa sólo para registrados.</li>
                                <li>Podrás invitar a tus amigos y conseguir 5€ en futuras compras.</li>
                                <li>Puedes cargar tus pedidos anteriores con un solo click.</li>
                                <li>Y mucho más...</li>
                            </ul>

                            <div className="social-box mt-4">
                                <p className="social-label">CREA O ACCEDE CON TUS REDES SOCIALES</p>
                                <div className="d-flex gap-3 flex-wrap">
                                    <button type="button" className="btn btn-social d-flex align-items-center gap-2">
                                        <span className="icon" aria-hidden="true">
                                            {/* Google */}
                                            <svg width="20" height="20" viewBox="0 0 48 48">
                                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.191-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.274-7.955l-6.527,5.025C9.488,39.556,16.227,44,24,44z"></path>
                                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-3.934,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.191,5.238C36.996,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                            </svg>
                                        </span>
                                        <span>Continuar con Google</span>
                                    </button>

                                    <button type="button" className="btn btn-social d-flex align-items-center gap-2">
                                        <span className="icon" aria-hidden="true">
                                            {/* Facebook */}
                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.096 10.125 24v-8.437H7.078V12.07h3.047V9.413c0-3.007 1.792-4.668 4.533-4.668c1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.953.927-1.953 1.88v2.257h3.328l-.532 3.493h-2.796V24C19.612 23.096 24 18.1 24 12.073"></path>
                                            </svg>
                                        </span>
                                        <span>Continuar con Facebook</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -------- DERECHA -------- */}
                    <div className="col-lg-7">
                        <div className="card shadow h-100">
                            <div className="card-body">
                                <h5 className="mb-3">Datos de identificación de cuenta</h5>

                                <ul className="nav nav-tabs mb-3" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={modo === 'particular'}
                                            className={`nav-link ${modo === 'particular' ? 'active' : ''}`}
                                            onClick={() => setModo('particular')}
                                        >
                                            Particular
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={modo === 'empresa'}
                                            className={`nav-link ${modo === 'empresa' ? 'active' : ''}`}
                                            onClick={() => setModo('empresa')}
                                        >
                                            Empresa
                                        </button>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    {/* ---------- PARTICULAR ---------- */}
                                    <div
                                        role="tabpanel"
                                        id="particular"
                                        className={`tab-pane fade ${modo === 'particular' ? 'show active' : ''}`}
                                    >
                                        <form>
                                            <div className="mb-3">
                                                <label className="form-label">Nombre *</label>
                                                <input type="text" className="form-control" placeholder="Nombre" required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Apellido *</label>
                                                <input type="text" className="form-control" placeholder="Apellido" required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Email *</label>
                                                <input type="email" className="form-control" placeholder="Email" required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Género *</label>
                                                <select className="form-select" required>
                                                    <option value="">Selecciona...</option>
                                                    <option value="M">Masculino</option>
                                                    <option value="F">Femenino</option>
                                                    <option value="O">Otro</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Introduce tu contraseña *</label>
                                                <input type="password" className="form-control" placeholder="Introduce tu contraseña" required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Código Plan Amigo</label>
                                                <input type="text" className="form-control form-control-dashed" placeholder="Código Plan Amigo" />
                                            </div>
                                            <div className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="promosP" />
                                                <label className="form-check-label" htmlFor="promosP">
                                                    Quiero recibir promociones exclusivas y contenidos personalizados
                                                </label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox" id="privacidadP" required />
                                                <label className="form-check-label" htmlFor="privacidadP">
                                                    He leído y acepto la <a href="#">Política de privacidad</a>
                                                </label>
                                            </div>
                                            <button type="submit" className="btn btn-success w-100">REGISTRARME YA</button>
                                        </form>
                                    </div>

                                    {/* ---------- EMPRESA ---------- */}
                                    <div
                                        role="tabpanel"
                                        id="empresa"
                                        className={`tab-pane fade ${modo === 'empresa' ? 'show active' : ''}`}
                                    >
                                        <form>
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
                                                    <option value="">Escoge una opcion</option>
                                                    <option value="si">Sí</option>
                                                    <option value="no">No</option>
                                                </select>
                                            </div>

                                            {/* Persona de contacto */}
                                            <div className="mb-3">
                                                <label className="form-label">Nombre de contacto *</label>
                                                <input type="text" className="form-control" placeholder="Nombre" required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Apellido de contacto *</label>
                                                <input type="text" className="form-control" placeholder="Apellido" required />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Email *</label>
                                                <input type="email" className="form-control" placeholder="Email" required />
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label">Introduce tu contraseña *</label>
                                                <input type="password" className="form-control" placeholder="Introduce tu contraseña" required />
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

                                            <button type="submit" className="btn btn-success w-100">REGISTRARME YA</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* -------- FIN DERECHA -------- */}
                </div>
            </div>
        </div>


    );
}

export default Registro;