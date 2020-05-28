import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({paginate, totalpaginas, paginaAnterior, paginaSiguiente, paginaactual}) => {

    // //DEFINIR PAGINA ACTUAL
    const pageNumbers = [];

    for (let i = 1; i <= totalpaginas; i++) {
        pageNumbers.push(i);
    }



    return ( 
        <ul className="pagination" actpage={paginaactual}>
            <li 
                className={`page-item ${(paginaactual === 1) ? "disabled" : ''}`}
            >
                <a
                    className="page-link"
                    onClick={paginaAnterior}
                    href="#!"
                >&laquo; Anterior</a>
            </li>

            {pageNumbers.map(number => (
                <li 
                    className={`page-item ${(paginaactual === number) ? "active" : ''}`} 
                    key={number}
                >
                    <a
                        className="page-link"
                        onClick={() => paginate(number)}
                        href="#!"
                    >
                        {number}
                    </a>
                </li>
            ))}

            <li 
                className={`page-item ${(paginaactual === totalpaginas) ? "disabled" : ''}`}
            >
                <a
                    className="page-link"
                    onClick={paginaSiguiente}
                    href="#!"
                >Siguiente &raquo;</a>
            </li>
        </ul>
    );
}

Pagination.propTypes = {
    paginate : PropTypes.func.isRequired,
    totalpaginas : PropTypes.number.isRequired,
    paginaAnterior : PropTypes.func.isRequired,
    paginaSiguiente : PropTypes.func.isRequired,
    paginaactual : PropTypes.number.isRequired
}

export default Pagination;