import React, { useState } from 'react';
import './MisDatos.css';

function MisDatos() {
        const [form, setForm] = useState({
            clientType: 'particular', // 'particular' | 'empresa'
            firstName: '',
            lastName: '',
            email: '',
            telephone: '',
            birthDate: '',
            gender: '',
            idNumber: '', // DNI or CIF depending on clientType
            companyName: '',
            avatarUsuario: ''
        });

    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null }));
        setSaved(false);
    };

    const validate = () => {
        const err = {};
            // Validaciones según tipo de cliente
            if (form.clientType === 'particular') {
                if (!form.firstName.trim()) err.firstName = 'Introduce tu nombre';
                if (!form.lastName.trim()) err.lastName = 'Introduce tus apellidos';
            } else {
                if (!form.companyName.trim()) err.companyName = 'Introduce el nombre de la empresa';
            }

            if (!form.email.trim()) err.email = 'Introduce tu email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email inválido';
            if (!form.idNumber.trim()) err.idNumber = form.clientType === 'empresa' ? 'Introduce el CIF' : 'Introduce el DNI';
        return err;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validate();
        if (Object.keys(err).length) {
            setErrors(err);
            setSaved(false);
            return;
        }

        // Aquí iría la llamada al API para guardar los datos del cliente.
        // De momento simulamos éxito y mostramos un mensaje.
        console.log('Guardando datos personales:', form);
        setSaved(true);
    };


    const InputImagenOnChange = (ev) => {
            //en ev.target.files <--- FileList o array de objetos de tipo FILE seleccionados, en pos. [0] estaria el fich.imagen a leer
            let _imagen=ev.target.files[0];
            let _lector=new FileReader();

            _lector.addEventListener('load',(evt)=>{
                let _contenidoFichSerializado=evt.target.result;
                //habilito boton subir foto...
                document.getElementById('botonUploadImagen').removeAttribute('disabled');
                setForm((prev) => ({ ...prev, avatarUsuario: _contenidoFichSerializado }));

            });
            _lector.readAsDataURL(_imagen);
        }

    const BotonUploadImagenClickHandler=(ev)=>{
            //crear formdata, añadir contenido fichero imagen y mediante ajax subirlo a servicio de nodejs

        }  

    return (
        <div className="container">
            <div className='row m-4'>
                <div className='col-12'>
                    <h5>Mis Datos Personales</h5>
                    <hr></hr>
                    <p>Aquí puedes ver y editar los datos de tu cuenta.</p>
                </div>
            </div>

            <div className='row m-4'>
                <div className='col-12'>
                    <form className="mis-datos-form" onSubmit={handleSubmit} noValidate>

                        {/* Tipo de cliente: Particular / Empresa */}
                        <div className="mb-3">
                            <label className="form-label me-3">Tipo de cliente</label>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" 
                                        htmlFor="clientParticular"
                                        style={{ color: form.clientType === 'particular' ? '#00b22d' : '#ccc' }}>
                                    Soy Particular
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="clientParticular"
                                        name="clientType"
                                        value="particular"
                                        checked={form.clientType === 'particular'}
                                        onChange={handleChange}
                                    />
                                    <span className='checkmark'></span>

                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" 
                                        htmlFor="clientEmpresa" 
                                        style={{ color: form.clientType === 'empresa' ? '#00b22d' : '#ccc' }}>
                                    Soy Empresa
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="clientEmpresa"
                                        name="clientType"
                                        value="empresa"
                                        checked={form.clientType === 'empresa'}
                                        onChange={handleChange}
                                    />
                                    <span className='checkmark'></span>                                    
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label" htmlFor="firstName">Nombre</label>
                                <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} type="text" className="form-control" placeholder="Nombre" />
                                {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label" htmlFor="lastName">Apellidos</label>
                                <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} type="text" className="form-control" placeholder="Apellidos" />
                                {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
                            </div>
                        </div>



                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label" htmlFor="telephone">Teléfono</label>
                                <input id="telephone" name="telephone" value={form.telephone} onChange={handleChange} type="tel" className="form-control" placeholder="+34 600 000 000" />
                            </div>

                            <div className="col-md-4 mb-3">
                                <label className="form-label" htmlFor="idNumber">{form.clientType === 'empresa' ? 'CIF' : 'DNI'}</label>
                                <input id="idNumber" name="idNumber" value={form.idNumber} onChange={handleChange} type="text" className="form-control" placeholder={form.clientType === 'empresa' ? 'CIF' : 'DNI'} />
                                {errors.idNumber && <div className="invalid-feedback d-block">{errors.idNumber}</div>}
                            </div>

                            {form.clientType === 'particular' && (
                                <>
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label" htmlFor="birthDate">Genero</label>
                                        <select className="form-select" aria-label="Default select example" onChange={handleChange} name='gender'>
                                            <option value="male">Masculino</option>
                                            <option value="female">Femenino</option>
                                            <option value="other">Otro</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label className="form-label" htmlFor="birthDate">Fecha de nacimiento</label>
                                        <input id="birthDate" name="birthDate" value={form.birthDate} onChange={handleChange} type="date" className="form-control" />
                                    </div>
                                </>
                            )}
                            <div className="col-md-4">
                                <div className="text-muted">{form.clientType=='particular' ? 'Foto' : 'Logo empresa'}</div>
                                <div id="avatarPerfil" className="card" style={{width:"200px",height:"250px", backgroundColor:"aliceblue"}}>
                                    <input type="file" accept="image/*" id="selectorImagen"  style={{visibility:"hidden"}}  onChange={ InputImagenOnChange } />
                                    <button style={{display: 'inline-block'}} className="btn btn-outline-light" onClick={ ()=> document.getElementById('selectorImagen').click() }>
                                        <img src={ form.avatarUsuario || "/images/imagen_usuario_sinavatar.jpg" } id="imagenUsuario"  style={{ objectFit:'cover'}} alt="..." />
                                    </button>
                                </div>
                                <button type="button" 
                                        className="btn btn-link btn-sm"
                                        id="botonUploadImagen" 
                                        disabled> + Sube una foto</button>
                                <div id="mensajeServicioREST"></div>
                            </div>                            
                        </div>

                        {form.clientType === 'empresa' && (
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="form-label" htmlFor="companyName">Nombre de la empresa</label>
                                    <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} type="text" className="form-control" placeholder="Razón social" />
                                    {errors.companyName && <div className="invalid-feedback d-block">{errors.companyName}</div>}
                                </div>
                            </div>
                        )}



                        <div className="d-flex flex-row justify-content-end ">
                            <button type="submit" className="btn btn-hsn-1 w-50"><i className="fa-solid fa-check"></i> Guardar Cambios</button>
                        </div>

                        {saved && <div className="save-msg">Datos guardados correctamente.</div>}
                    </form>
                </div>
            </div>

            <div className='row m-4'>
                <div className='col-12'>
                    <h5>Editar Email</h5>
                    <hr></hr>
                    <p>Recibiras un email en tu cuenta acutal para cambiar el cambio de direccion:</p>
                </div>                    
            </div>

            <div className="row m-4">
                <div className="col-8">
                    <input id="email" name="email" value={form.email} onChange={handleChange} type="email" className="form-control" placeholder="usuario@correo.com" />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>
                <div className="col-4 d-flex flex-row justify-content-end ">
                    <button type="submit" className="btn btn-hsn-1"><i className="fa-solid fa-check"></i> Modificar Email</button>
                </div>                
            </div>

        </div>
    );
}

export default MisDatos;