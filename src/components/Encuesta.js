import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Encuesta = () => {
  const [respuesta, setRespuesta] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías enviar la respuesta a tu backend o hacer lo que necesites con ella
    console.log('Respuesta enviada:', respuesta);
    // Limpiar el estado después de enviar la respuesta
    setRespuesta('');
  };

  return (
    <div>
      <h3>Encuesta de Retroalimentación</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="¿Cómo calificarías tu experiencia?"
          variant="outlined"
          value={respuesta}
          onChange={(event) => setRespuesta(event.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Encuesta;
