import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

  const [ obtenerFormCampos, setObtenerFormCampos ] = useState({
    ingrediente: '',
    categoria: '',
  });

  const { categoria} = obtenerFormCampos;
  // hook useContext para consumir. Toma un Context, que sea lo que devuelva el createContext y se tendrá disponible todo lo que contenga el value   
  // const context = useContext( CategoriasContext );
  // const { hola } = useContext(CategoriasContext)

  const { categorias } = useContext( CategoriasContext );
  const { guardarBusqueda, guardarConsultar } = useContext(RecetasContext);
  console.log(categorias);//Listado de bebidas

  // console.log(context);//{hola: 'hola de state del context'}
  //  console.log(context.hola); //hola de state del context

  // Función para leer los contenidos
  const obtenerDatosReceta = e => {

    setObtenerFormCampos({
      ...obtenerFormCampos,
      [e.target.name] : e.target.value
    });

  }

  const fnSubmitForm = e => {
    e.preventDefault();

    if ( categoria === '' ) {
      return;
    }
    guardarBusqueda( obtenerFormCampos );
    guardarConsultar( true );
  }

  return (
    <form  
      className="col-12"
      onSubmit= { fnSubmitForm }
    >
      <fieldset className="text-center">
        <legend>
          Busca bebidas por Categoría o Ingrediente
        </legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">

          <input 
            name="ingrediente"
            className="form-control mt-1"
            onChange={obtenerDatosReceta}
            type="text"
            placeholder="Buscar por Ingrediente ej: Tequila"
          />

        </div>

        <div className="col-md-4">

          <select 
            name="categoria"
            className="form-control mt-1"     
            onChange={obtenerDatosReceta}       
            placeholder="Buscar por Ingrediente"
          >
            <option value="" >--Selecciona Categoría--</option>
            {
              categorias.map( categoria => (
                <option 
                  key={ categoria.strCategory }
                  value={ categoria.strCategory }                   
                > { categoria.strCategory } 
                </option>
              ))
            }
          </select>
          
        </div>

        <div className="col-md-4 mt-1">

          <input 
            name="nombre"
            className="btn btn-primary"
            type="submit"
            value="Buscar Bebidas"
          />

        </div>

      </div>
    </form>
  )
}

export default Formulario
