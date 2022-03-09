import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { obtenerPokemonAction,  
         siguientePokemonAction, 
         anteriorPokemonAction, 
         unPokeDetalleAccion} from '../redux/pokeDucks'
import Detalle from './Detalle'

const Pokemones = () => {
    const dispatch = useDispatch()

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerPokemonAction())
        }
        fetchData()
    }, [dispatch])

    return (
        <div className="row mt-5">

            <div className="col-md-6">

                <h3>Lista de pokemones</h3>

                <ul className="list-group mt-4">
                    {
                        pokemones.map(item => (
                            <li key={item.name} className="list-group-item text-uppercase">
                                {item.name}
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button 
                                        className="btn btn-dark btn-sm"
                                        onClick={() => dispatch(unPokeDetalleAccion(item.url))}
                                    >
                                        Info
                                    </button>                                  
                                </div>                               
                            </li>
                        ))
                    }
                </ul>

                <div className="d-flex justify-content-between mt-4">
                    {
                        pokemones.length === 0 && 
                        <button onClick={() => dispatch(obtenerPokemonAction())} className="btn btn-dark">Get Pokemones</button>
                    }

{
                        previous &&
                        <button onClick={() => dispatch(anteriorPokemonAction())} className="btn btn-dark">Anterior</button>
                    }

                    {
                        next &&
                        <button onClick={() => dispatch(siguientePokemonAction())} className="btn btn-dark">Siguiente</button>
                    }

                 
                </div>
            </div>
            <div className="col-md-6">
                <h3>Detalle Pokemon</h3>
                <Detalle />
            </div>
        </div>
    )
}

export default Pokemones
