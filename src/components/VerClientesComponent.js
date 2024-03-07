import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Cita from './assets/citas.jpg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';

const CustomDataGrid = ({ className, ...other }) => (
  <div className={className}>
    <DataGrid {...other} />
  </div>
);

const actions = [{ icon: <FileCopyIcon />, name: 'Nuevo', key: 'new' }];

const VerClientesComponent = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFunction = (e, key) => {
    e.preventDefault();
    console.log('Presiono Boton' + key);
    navigate('/paciente/nuevo', {
      state: {
        id: 0,
      },
    });
  };

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

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Cita})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Clientes Registrados</h1>

      <div>
       
        {rows.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No hay registros disponibles.</p>
        </div>
        )}
        <DataGrid
          rows={filteredRows}
          columns={columns}
          components={{
            Table: CustomDataGrid,
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onRowClick={handleRowClick}
        />
        <div style={styles.buttonContainer}>
          <Button variant="contained" style={styles.button} onClick={menu} startIcon={<ArrowBackIosIcon />}>
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
    width: '900px',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50px',
  },
  title: {
    marginBottom: '0px',
  },
  buttonContainer: {
    position: 'absolute',
    top: 540,
    right: 1060,
  },
  button: {
    backgroundColor: 'red',
    
  },
};

export default VerClientesComponent;
