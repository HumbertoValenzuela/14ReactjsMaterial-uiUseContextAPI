import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext( );
ModalContext.displayName = 'ModalContext';

const ModalProvider = ( props ) => {

  const [ idReceta, guardarIdReceta] = useState( null );

  // guardar resultado de las recetas. colocar en el Modal
  const [ infoReceta, setReceta] = useState( {} );

  // Una vez que tenemos una receta, llamar API
  useEffect(() => {
    
    const obtenerReceta = async () => {
      // Inicia como null
      if ( !idReceta ) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

      const resultado = await axios.get(url);

      // console.log(resultado.data.drinks[0]);
      setReceta( resultado.data.drinks[0] );
    };

    obtenerReceta();

  }, [idReceta])
  return (
    <ModalContext.Provider
      value={{ 
        // Disponer del valor receta
        infoReceta,
        guardarIdReceta,
        // Limpiar state
        setReceta
      }}
    >
      { props.children }
    </ModalContext.Provider>
  )
}

export default ModalProvider;