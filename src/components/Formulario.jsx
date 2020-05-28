import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Error from './Error';

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('');
    const [error, setError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        
        //VALIDAR
        if(termino.trim() === ''){
            setError(true);
            return;
        }
        setError(false);

        //ENVIAR EL TERMINO DE BUSUEDA HACIA EL COMPONENTE PRINCIPAL
        setBusqueda(termino);

    }

    return (  
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        placeholder="Busca una Imagen" 
                        className="form-control form-control-lg"
                        onChange={e => setTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error mensaje="Escribe un termino"/> : null}
        </form>
    );
}

Formulario.propTypes = {
    setBusqueda : PropTypes.func.isRequired
}
 
export default Formulario;