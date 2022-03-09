import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actualizacionUsuario, editarFotoAccion} from '../redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector (store => store.usuario.loading)
    console.log(usuario)

    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = () => {

        if(!nombreUsuario.trim()){
            console.log('Nombre Vacío')
            return
        }
        dispatch(actualizacionUsuario(nombreUsuario))
        setActivarFormulario(false)
    }

    const seleccionarArchivo = imagen => {
        console.log(imagen.target.files[0])
        const imagenCliente = imagen.target.files[0]

        if(imagenCliente === undefined){
            console.log('No se seleccionó imagen')
            return
        }

        if(imagenCliente.type === "image/jpeg"){
            dispatch(editarFotoAccion(imagenCliente))
            setError(false)
        }
        else{
            setError(true)
        }
    }

    return(
        <div className='mt-5 text-center'>
            <div className='card'>
               <div className="card-body">
                    <img className='img-fluid'src={usuario.photoURL} width='100px'/>
                    <h5 className='card-title'>Nombre de usuario: {usuario.displayName}</h5>
                    <p className='card-text'>Email: {usuario.email} </p>
                    <button className='btn btn-dark' onClick={()=> setActivarFormulario(true)}>
                        Editar nombre
                    </button>
                    {
                        error && <div className="alert alert-warning mt-3">
                            Solo archivos .jpeg
                        </div>
                    }

                    <div className="input-group mb-3">
                        <input 
                            type="file"
                            className="form-control"
                            id="inputGroupFile01" 
                            style= {{display:'none'}}
                            onChange={e => seleccionarArchivo(e)}
                            disabled={loading}
                        />
                        <label
                            className={loading? 'btn btn-dark mt-2 disabled' : 'btn btn-dark mt-2'}
                            htmlFor='inputGroupFile01'
                        >
                            Actualizar imagen
                        </label>
                    </div>

               </div>
               {
                   loading && 
                   <div className="card-body">
                       <div className="d-flex justify-content-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                       </div>
                   </div>
               }
               {
                   activarFormulario && 
                   <div className="card-body">
                   <div className="row justify-content-center">
                       <div className="col-md-5">                      
                       <div class="input-group mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={nombreUsuario}
                            onChange={e => setNombreUsuario(e.target.value)}
                        />
                        <button 
                            className="btn btn-dark"
                            type="button"
                            onClick={ () => actualizarUsuario()}
                            >
                                Actualizar
                            </button>
                        </div>
                       </div>
                   </div>
               </div>

               }
           
            </div>           
        </div>
    )
}

export default Perfil