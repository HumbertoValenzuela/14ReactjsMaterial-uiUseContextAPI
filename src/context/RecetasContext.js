import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const RecetasContext = createContext();
RecetasContext.displayName = 'RecetasContext';

const RecetasProvider = ( props ) => {

  // Resultado de la consulta
  const [ recetas, guardarRecetas ] = useState( [] );

  const [consultar, guardarConsultar] = useState( false);

  // Pasar guardarBusqueda hacia el context
  const [ busqueda, guardarBusqueda ] = useState( {
    ingrediente: '',
    categoria: '',    
  } )

  const { ingrediente, categoria } = busqueda;

  // Cuando se presiona el boton buscar, el state busqueda tendrá valores, useEffect para ejecutar la API
  useEffect(() => {

    if ( consultar ) {

      const obtenerRecetas = async () => {
  
        // filtro por ingrdiente y cateforia
        const url =`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;

        // console.log(url);
        const resultado = await axios.get(url);

        // console.log(resultado.data.drinks);
        guardarRecetas( resultado.data.drinks );
      }
      
      
      obtenerRecetas();
    }

   
  }, [ ingrediente, categoria, consultar])
  return (
    <RecetasContext.Provider
      value= {{
        recetas,
        guardarBusqueda,
        guardarConsultar,
      }}
    >
      { props.children }
    </RecetasContext.Provider>
  );
}

export default RecetasProvider;
