import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
    //States
    const [busqueda, guardarBusqueda] = useState("");
    const [imagenes, guardarImagenes] = useState([]);

    const [paginaactual, guardarPaginaActual] = useState(1);
    const [totalpaginas, guardarTotalPaginas] = useState(1);

    useEffect(() => {
        const consultarAPI = async () => {
            if (busqueda.trim() === "") return;

            const imagenesPorPagina = 30;

            const key = `15440020-93873134ff30af52a0559033c`;
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            guardarImagenes(resultado.hits);
            //console.log(resultado.totalHits);
            //Math.ceil(16.6)  = 17
            //Math.floor(16.6) = 16
            const calcularTotalPaginas = Math.ceil(
                resultado.totalHits / imagenesPorPagina
            );
            guardarTotalPaginas(calcularTotalPaginas);

            //Mover la pagina a top para no tener que scrolear hasta arriba
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView( {behavior: 'smooth' });
        };
        consultarAPI();
    }, [busqueda, paginaactual]);

    //Definir la pagina anterior
    const paginaAnterior = () => {
        const nuevaPaginaActual = paginaactual - 1;

        if (nuevaPaginaActual === 0) return;

        guardarPaginaActual(nuevaPaginaActual);
    };
    //Definir la pagina anterior
    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaactual + 1;

        if (nuevaPaginaActual > totalpaginas ) return;

        guardarPaginaActual(nuevaPaginaActual);
    };
    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador de Imagenes</p>
                <Formulario guardarBusqueda={guardarBusqueda} />
            </div>
            <div className="row justify-content-center">
                <ListadoImagenes imagenes={imagenes} />

                {(paginaactual ===1) ? null :(
                  <button
                    type="button"
                    className="bbtn btn-info mr-1"
                    onClick={paginaAnterior}
                >
                    &laquo; Anterior
                </button>
                )}

                {(paginaactual === totalpaginas) ? null :(
                  <button
                    type="button"
                    className="bbtn btn-info"
                    onClick={paginaSiguiente}
                >
                    Siguiente &raquo;
                </button>
                )}                

            </div>
        </div>
    );
}

export default App;
