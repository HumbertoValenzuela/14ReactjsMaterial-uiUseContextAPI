import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

// Instalación Material-UI framework de IU para React
// npm install @mui/material @emotion/react @emotion/styled
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Componente Modal, importar solo Modal, y no toda la librería
import Modal from '@mui/material/Modal';


const style = {
  // Define posición
  position: 'absolute',
  top: '50%',
  left: '50%',
  // Estilos
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,  
  p: 2,  
};


const Receta = ({ receta }) => {

  // Configuración del Modal de Material-ui
  const [open, setOpen] = useState( false );
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );

  // Extraer los valores del context
  const { infoReceta, guardarIdReceta, setReceta } = useContext(ModalContext);

  console.log(infoReceta);
  // console.log(receta);

  // Muestra y formato a Ingredientes
  const MostrarIngredientes = informacion => {
    let ingredientes = [];
    // Recorrer el arreglo de la API strIngredient1 hasta el 15
    for (let i = 0; i < 16; i++) {
      if ( informacion[`strIngredient${i}`] ) {
        ingredientes.push(
          <li>
            { informacion[`strIngredient${[i]}`] } { informacion[`strMeasure${i}`] }
          </li>
        )
      }   
    }

    return ingredientes;
  }

  return (
    <div className="col-md-4 mb-3">
      <div>
        <h2 className="card-header"> { receta.strDrink} </h2>

        <img className="card-img-top" src={ receta.strDrinkThumb } alt={`Imagen de ${receta.strDrink}`} />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-primary"
            
            onClick={ () => { 
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>

            <Modal
              open={ open }
              onClose={ () => { 
                handleClose();
                //Ver en Modal Provider. El id queda activa, dejar en null. Importante limpiar el State
                guardarIdReceta(null);  
                setReceta( {} );              
              }}
            >
              <Box sx={ style } >
                <div className="d-flex justify-content-between">
                  <Typography 
                    id="modal-modal-title" 
                    variant="h6" 
                    component="h2" 
                  >
                  { infoReceta.strDrink }
                  </Typography>

                  <Button 
                      variant="contained" 
                      onClick={handleClose}>X
                  </Button>                  
                </div>                  

                    <h4 className="col mt-2">Instrucciones</h4>  

                <p>{infoReceta.strInstructions}</p>
                <img className="img-fluid my-4" src={infoReceta.strDrinkThumb} alt={infoReceta.strDrink} />

                <h5>Ingredientes y Cantidades</h5>
                <ul>
                  {/* Al agregar el parentesis se manda a llamar. y Además pasar la información */}
                  { MostrarIngredientes( infoReceta ) }
                </ul>
              </Box>
            </Modal>

        </div>
        
      </div>
    </div>
  )
}

export default Receta
