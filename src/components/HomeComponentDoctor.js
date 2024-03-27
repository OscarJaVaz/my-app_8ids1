import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Pagination from '@mui/material/Pagination';

const actions = [{ icon: <FileCopyIcon />, name: 'Nuevo', key: 'new' }];

const HomeComponentDoctor = () => {
  const navigate = useNavigate();

  const handleFunction = (e, key) => {
    e.preventDefault();
    console.log('Presiono Boton' + key);
    navigate('/doctor/nuevo', {
      state: {
        id: 0,
      },
    });
  };

  const handleRowClick = (params) => {
    console.log('Id: ' + params.row.id);
    console.log('Nombre: ' + params.row.nombre);
    navigate('/doctor/nuevo', {
      state: {
        id: params.row.id,
        nombre: params.row.nombre,
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'cedula', headerName: 'Cedula', width: 130 },
    { field: 'contacto', headerName: 'Contacto', width: 130 },
    {
      field: 'domicilio',
      headerName: 'Domicilio',
      description: 'No se podrá recordar',
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.domicilio}`,
    },
  ];

  const [rows, setRows] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/doctores');
      setRows(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de los doctores:', error);
      // Manejo de errores
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const menu = () => {
    navigate('/menu');
  };

  const CustomToolbar = () => {
    return (
      <Toolbar>
        {/* Aquí puedes agregar elementos personalizados para la barra de herramientas */}
      </Toolbar>
    );
  };

  const CustomPagination = ({ paginationProps }) => {
    return (
      <Pagination
        {...paginationProps}
        sx={{ marginTop: '20px' }} // Ajusta el margen superior de la paginación
      />
    );
  };

  return (
    <div>
     <div style={styles.line}></div>
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', color: 'black' }}>
        Doctores
      </Typography>
      <p style={{ color: '#878686', marginTop: '5px', fontSize: '20px' }}>Gestionar los doctores registrados.</p>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => {
                handleFunction(e, action.key);
              }}
            />
          ))}
        </SpeedDial>
        {rows.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>No hay registros disponibles.</p>
          </div>
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          onRowClick={handleRowClick}
          components={{
            Toolbar: CustomToolbar,
            Pagination: CustomPagination,
          }}
          style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
        />
        <div style={styles.buttonContainer}>
          <Button variant="contained" style={styles.button} onClick={menu} startIcon={<ArrowBackIosIcon />}>
            Salir
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    
    height: '100vh',
     // Cambiando el fondo a un tono más suave
    
    padding: '20px',
    boxSizing: 'border-box', // Asegurar que el padding no incremente el tamaño total
    overflow: 'hidden', // Para evitar que el contenido se desborde en pantallas pequeñas
  },
  title: {
    marginBottom: '20px', // Espacio adicional debajo del título
  },
  line: {
    width: '100%',
    height: '53px',
    backgroundColor: '#1172D8', 
    
  },
  buttonContainer: {
    marginTop: '20px', // Ajustar el margen superior del botón
    marginBottom: '20px', // Ajustar el margen inferior del botón
  },
  button: {
    backgroundColor: 'red',
  },
};

export default HomeComponentDoctor;
