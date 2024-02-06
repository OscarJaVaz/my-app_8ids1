import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Enfermedad from './assets/virus.jpg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CustomDataGrid = ({ className, ...other }) => (
  <div className={className}>
    <DataGrid {...other} />
  </div>
);

const actions = [{ icon: <FileCopyIcon />, name: 'Nuevo', key: 'new' }];

const HomeComponentProducto = () => {
  const navigate = useNavigate();

  const handleFunction = (e, key) => {
    e.preventDefault();
    console.log('Presiono Boton' + key);
    navigate('/producto/nuevo', {
      state: {
        id: 0,
      },
    });
  };

  const handleRowClick = (params) => {
    console.log('Id: ' + params.row.id);
    console.log('Nombre: ' + params.row.nom_producto);
    navigate('/producto/nuevo', {
      state: {
        id: params.row.id,
        nom_producto: params.row.nom_producto,
      },
    });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom_producto', headerName: 'Nombre del Producto', width: 160 },
    { field: 'descripcion', headerName: 'Descripcion', width: 130 },
    { field: 'price', headerName: 'Precio', width: 130 },
    {
      field: 'imagen',
      headerName: 'Imagen',
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.imagen}
          alt={`Imagen ${params.row.nom_producto}`}
          style={{ width: '100%', height: '100%' }} // Ajusta el tamaño aquí
        />
      ),
    },
  ];
  

  const [rows, setRows] = useState([]);

  const getData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/productos');
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
    document.body.style.backgroundImage = `url(${Enfermedad})`;
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
      <h1 style={styles.title}>Productos Registrados</h1>

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
        
        {rows.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No hay registros disponibles.</p>
        </div>
        )}
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Table: CustomDataGrid,
          }}
          pageSize={5}
          onRowClick={handleRowClick}
          rowHeight={100} // Ajusta la altura de la fila
          
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

export default HomeComponentProducto;