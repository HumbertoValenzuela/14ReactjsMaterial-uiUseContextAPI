import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// CONTEXT API. Cuenta con un hook useContext
// Puedes pasar el state o funciones desde el componente principal hasta los hijos, sin necesidad de pasarlo por cada componente
// Recuerda que en React solo pasas los datos del componente principal al hijo.
// También se puede actualizar el state desde el hijo. (ejecutar una función que lo actualice)

// ¿Los props son obsoletos?
// Node, aún se puede utilizar los Props, así es como React fue diseñado y el 90% de las aplicaciones React así están hechas.
// Context hace un poco más complicado la reutilización de componente

