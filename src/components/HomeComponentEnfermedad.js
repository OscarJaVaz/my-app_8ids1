import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const HomeComponentEnfermedad = () => {
  const [rows, setRows] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/citas');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: 'sintomas', headerName: 'Síntomas', width: 300 },
  ];

  const navigate = () => {
    // Navegación al menú
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Síntomas con mas frecuencia en pacientes</h1>
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          autoHeight
          disableSelectionOnClick
        />
        <div style={styles.buttonContainer}>
          <Button variant="contained" style={styles.button} onClick={navigate} startIcon={<ArrowBackIosIcon />}>
            Salir
          </Button>
        </div>
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
    width: '750px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50px',
  },
  title: {
    marginBottom: '0px',
  },
  buttonContainer: {
    position: 'absolute',
    top: 540,
    right: 1006,
  },
  button: {
    backgroundColor: 'red',
  },
};

export default HomeComponentEnfermedad;
