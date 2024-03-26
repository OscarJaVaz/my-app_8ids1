import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const VerClientesComponent = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleRowClick = (params) => {
    const { id, nombre, apellido } = params.row;
    console.log('Id:' + id);
    console.log('Cliente: ' + nombre + ' ' + apellido);
    navigate('/generarReceta', {
      state: {
        nombre: nombre + ' ' + apellido // Enviar el nombre y los apellidos del cliente
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'apellido', headerName: 'Apellidos', width: 130 },
    { field: 'telefono', headerName: 'Telefono', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'domicilio', headerName: 'Domicilio', width: 130 },
  ];

  const getData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/clientes');
    console.log(response.data);
    setRows(response.data);
    setFilteredRows(response.data);
  };

  useEffect(() => {
    console.log('Render');
    getData();
  }, []);

  useEffect(() => {
    setFilteredRows(
      rows.filter(
        (row) =>
          row.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          row.apellido.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, rows]);

  const menu = () => {
    navigate('/menu');
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: 'white' }}>
  Pacientes
</Typography>
      <TextField
        label="Buscar cliente"
        variant="outlined"
        margin="dense"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Paper elevation={3} style={{ width: '100%', minHeight: '400px', borderRadius: '10px', overflow: 'hidden' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          autoHeight
          onRowClick={handleRowClick}
          rowStyle={(rowData) => ({
            backgroundColor: rowData.id % 2 === 0 ? '#E3F2FD' : '#FFFFFF',
          })}
          headerStyle={{ backgroundColor: '#1976D2', color: '#FFFFFF' }}
        />
      </Paper>
      <Button variant="contained" style={styles.button} onClick={menu} startIcon={<ArrowBackIosIcon />}>
        Salir
      </Button>
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
    padding: '20px',
    background: '#1172D8', // Cambiando el fondo a un tono más suave
    borderRadius: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Agregando sombra para mejorar el aspecto visual
  },
  button: {
    backgroundColor: '#FF5252', // Color de botón más llamativo
    marginTop: '20px',
    color: '#FFFFFF', // Texto blanco para mayor contraste
    fontWeight: 'bold', // Añadiendo negrita al texto del botón
  },
};

export default VerClientesComponent;
