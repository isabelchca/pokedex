import axios from 'axios'

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: [],
}

// types
const GET_POKEMON_SUCCESS = 'GET_POKEMON_SUCCESS'
const NEXT_POKEMON_SUCCESS = 'NEXT_POKEMON_SUCCESS'
const PREVIOUS_POKEMON_SUCCESS = 'PREVIOUS_POKEMON_SUCCESS'
const POKEMON_INFO_SUCCESS = 'POKEMON_INFO_SUCCESS'

// reducers
export default function reducer (state = dataInicial, action){

    switch(action.type){
        case GET_POKEMON_SUCCESS:
            return {...state, ...action.payLoad}
        case NEXT_POKEMON_SUCCESS:
            return {...state, ...action.payLoad}
        case PREVIOUS_POKEMON_SUCCESS:
            return {...state, ...action.payLoad}
        case POKEMON_INFO_SUCCESS:
            return {...state, unPokemon: action.payLoad}
        default:
            return state
    }
}

// acciones
export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/' ) => async (dispatch) => {

    if(localStorage.getItem(url)){
        dispatch({
            type: POKEMON_INFO_SUCCESS,
            payLoad: JSON.parse(localStorage.getItem(url))
        })
    }

    try {
        const res = await axios.get(url)
        console.log('DATA',res.data)
        dispatch({
            type: POKEMON_INFO_SUCCESS,
            payLoad: {
                numero: res.data.order,
                nombre: res.data.name,
                ancho: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default
            }
    
        })
        localStorage.setItem(url, JSON.stringify({
            numero: res.data.order,
            nombre: res.data.name,
            ancho: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))
        
    } catch (error) {
        console.log(error)
    }

}

export const obtenerPokemonAction = () => async (dispatch, getState) => {

    // const {offset} = getState().pokemones
    if(localStorage.getItem('offset-0')){
        console.log('Datos guardados')
        dispatch({
            type: GET_POKEMON_SUCCESS,
            payLoad: JSON.parse(localStorage.getItem('offset-0'))
        })
        return
    }

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type: GET_POKEMON_SUCCESS,
            payLoad: res.data 
        })
        localStorage.setItem('offset-0', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAction = () => async (dispatch, getState) => {

    const {next} = getState().pokemones
    if(localStorage.getItem(next)){
        dispatch({
            type: NEXT_POKEMON_SUCCESS,
            payLoad: JSON.parse(localStorage.getItem(next))
        })
        return
    }
    
    try {
        const res = await axios.get(next)
        dispatch({
            type: NEXT_POKEMON_SUCCESS,
            payLoad: res.data
        })     
        localStorage.setItem(next, JSON.stringify(res.data)) 
                
    } catch (error) {
        console.log(error)
    }
}

export const anteriorPokemonAction = () => async (dispatch, getState) => {
    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)){
        dispatch({
            type: PREVIOUS_POKEMON_SUCCESS,
            payLoad: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous)
        dispatch({
            type: PREVIOUS_POKEMON_SUCCESS,
            payLoad: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }

}