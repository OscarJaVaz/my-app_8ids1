import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Consultorio from './assets/consultorio.jpg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CustomDataGrid = ({ className, ...other }) => (
  <div className={className}>
    <DataGrid {...other} />
  </div>
);

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
    const response = await axios.get('http://127.0.0.1:8000/api/doctores');
    console.log(response.data);
    setRows(response.data);
  };

  useEffect(() => {
    console.log('Render');
    getData();
  }, []);

  const menu = () => {
    navigate('/menu');
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Consultorio})`;
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
      <h1 style={styles.title}>Doctores Registrados</h1>

      <div>
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
        <DataGrid
          rows={rows}
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '78vh',
    width: '750px',
    background: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '50px',
    margin: 'auto', 

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

export default HomeComponentDoctor;
