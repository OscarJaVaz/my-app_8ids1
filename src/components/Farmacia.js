import React, { useState } from 'react';

const Farmacia = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(true);

  const cerrarMensaje = () => {
    setMostrarMensaje(false);
  };

  return (
    <div>
      {mostrarMensaje && (
        <div>
          <p>Bienvenido a la farmacia</p>
        
        </div>
      )}
      {/* Resto de tu contenido de la ventana */}
    </div>
  );
};

export default Farmacia;
