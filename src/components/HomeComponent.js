import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Sala from './assets/sala.jpg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CustomDataGrid = ({ className, ...other }) => (
  <div className={className}>
    <DataGrid {...other} />
  </div>
);

const actions = [{ icon: <FileCopyIcon />, name: 'Nuevo', key: 'new' }];

const HomeComponent = () => {
  const navigate = useNavigate();

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
    console.log('Id: ' + params.row.id);
    console.log('Nombre: ' + params.row.nombre);
    navigate('/paciente/nuevo', {
      state: {
        id: params.row.id,
        nombre: params.row.nombre,
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'edad', headerName: 'Edad', width: 130 },
    { field: 'nss', headerName: 'NSS', width: 130 },
    {
      field: 'domicilio',
      headerName: 'Domicilio',
      description: 'No se podra recordenar',
      sortable: false,
      width: 160,
      valueGetter: (params) => `${params.row.domicilio}`,
    },
  ];

  const [rows, setRows] = useState([]);

  const getData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/pacientes');
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
    document.body.style.backgroundImage = `url(${Sala})`;
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
      <h1 style={styles.title}>Pacientes Registrados</h1>

      <div>
        <p></p>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <p></p>
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
        <br/><br/>
        <div style={styles.buttonContainer}>
          <Button variant="contained" style={styles.button} onClick={menu} startIcon={<ArrowBackIosIcon />} >
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
    margin: 'auto', 
    background: 'rgba(255, 255, 255, 0.9)', // Ajustar el valor alfa (último valor transparecia)
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

export default HomeComponent;
