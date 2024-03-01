import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const GenerarRecetaComponent = () => {
  const location = useLocation();
  const [receta, setReceta] = useState('');
  const clienteSeleccionado = location.state ? location.state.nombre : '';

  const handleGenerarReceta = () => {
    // Aquí puedes implementar la lógica para generar el PDF con el nombre del cliente y la receta
    console.log('Generando receta para:', clienteSeleccionado);
    console.log('Receta:', receta);
  };

  const handleInputChange = (event) => {
    setReceta(event.target.value);
  };

  const handleBack = () => {
    // Aquí debes redirigir al usuario de vuelta a la vista anterior
    // Ejemplo: history.push('/clientes')
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generar Receta</h1>
      <div style={styles.clienteContainer}>
        <label>Cliente Seleccionado:</label>
        <div>{clienteSeleccionado}</div>
      </div>
      <div style={styles.recetaContainer}>
        <label>Receta:</label>
        <textarea
          rows="4"
          cols="50"
          value={receta}
          onChange={handleInputChange}
          placeholder="Escribe la receta aquí..."
        ></textarea>
      </div>
      <div style={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerarReceta}
          style={{ marginRight: '10px' }}
        >
          Generar Receta
        </Button>
        <Button variant="contained" onClick={handleBack} startIcon={<ArrowBackIosIcon />}>
          Volver
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '78vh',
    width: '900px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50px',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  clienteContainer: {
    marginBottom: '20px',
  },
  recetaContainer: {
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default GenerarRecetaComponent;
