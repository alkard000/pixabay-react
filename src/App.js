import React, {useState, useEffect} from 'react';

import Formulario from './components/Formulario';
import ListadoImagen from './components/ListadoImagen';
import Pagination from './components/Pagination';

function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(1);

  useEffect(() => {
    if(busqueda === '') return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = '16740819-3b3c7dadfb8ac0cf4aa29a3ed';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      //CALCULAR TOTAL PAGINAS
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalpaginas(calcularTotalPaginas);

      //MOVER LA PAGINA HASTA ARRIBA
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior : 'smooth'})
    }
    consultarAPI();
  }, [busqueda, paginaactual])

  console.log(imagenes[0]);

  //DEFINIR LA PAGINA ANTERIOR
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if(nuevaPaginaActual === 0) return;

    setPaginaactual(nuevaPaginaActual);
  }

  const paginate = (pageNumber) => {

    setPaginaactual(pageNumber);
  };

  //DEFINIR LA PAGINA SIGUINTE
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if(nuevaPaginaActual > totalpaginas) return;

    setPaginaactual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>     
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagen
          imagenes={imagenes}
        />

        <Pagination
          paginaactual={paginaactual}
          paginate={paginate}
          totalpaginas={totalpaginas}
          paginaAnterior={paginaAnterior}
          paginaSiguiente={paginaSiguiente}
        />

      </div>
    </div>
  );
}

export default App;