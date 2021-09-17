// Los datos fluyen de este Context. Ya no del App.js al menos usando context. Con props es diferente, redux.

// Se recomienda context en un lugar y las funciones en otro
// Esta vez se quedará todo relacionado a las Categorías en este archivo
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// createContext crea el context y quedará en la función CategoriasContext
export const CategoriasContext = createContext();

// Sirve para devTools 
CategoriasContext.displayName = 'CategoriasContext';

// Provider: Es de donde saldrán los state y las funciones. Referencia al Context
// Como se usará context en un lugar, se tiene que hacer referencia a los componentes hijos, llamado props.children
const CategoriasProvider = ( props ) => {

  // Crear el state del context. Prueba
  // const [hola, setHola] = useState('hola de state del context');

  // Categorias
  const [categorias, guardarCategorias] = useState( [] );

  //API  https://www.thecocktaildb.com/api.php
  // List the categories, glasses, ingredients or alcoholic filters

  // useEffect comienza cuando se carga el componente
  // Ejecutar llamado a la API
  useEffect(() => {
  
    const obtenerCategorias = async () => {

      const url =`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

      const categorias = await axios.get(url);
      // console.log(categorias.data.drinks);
      console.log(categorias);
      guardarCategorias( categorias.data.drinks );
    }

    obtenerCategorias();
  }, [])

  // Los datos que estarán disponibles en los demás components
  return(
    <CategoriasContext.Provider
      // Siempre tiene que ser value
      value={{
        // hola
        categorias
      }}
    >
      { props.children }
    </CategoriasContext.Provider>
  )

}
export default CategoriasProvider;