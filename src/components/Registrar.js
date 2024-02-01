import React, { useState } from 'react';

const Registrar = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(true);

  const cerrarMensaje = () => {
    setMostrarMensaje(false);
  };

  return (
    <div>
      {mostrarMensaje && (
        <div>
          <p>Bienvenido al apartado de registro</p>
          
        </div>
      )}
      {/* Resto de tu contenido de la ventana */}
    </div>
  );
};

export default Registrar;
