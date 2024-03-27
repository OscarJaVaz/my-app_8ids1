import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
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

  return (
    <div>
    <div style={styles.line}></div>
    <div style={styles.container}>
      <h1 style={styles.title}>Productos</h1>
      <p style={{ color: '#878686', marginTop: '5px', fontSize: '20px' }}>Gestionar los productos registrados.</p>
      <hr style={{ width: '100%', borderTop: '1px solid #ccc' }} />
      <div style={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
  rows={rows}
  columns={columns}
  components={{
    Table: CustomDataGrid,
  }}
  pageSize={5}
  onRowClick={handleRowClick}
  rowHeight={120} // Ajusta la altura de la fila
  // Estilo de la tabla
  rowClassName={(params) => `${params.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}`}
/>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16}}
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
    
    height: '100vh',
    background: '#f2f3f3', // Cambiando el fondo a un tono más suave
    borderRadius: '20px',
    padding: '20px',
    boxSizing: 'border-box', // Asegurar que el padding no incremente el tamaño total
    overflow: 'hidden', // Para evitar que el contenido se desborde en pantallas pequeñas
  },
  title: {
    marginBottom: '10px', // Espacio adicional debajo del título
    color: 'black', // Color blanco para el título
    fontSize: '40px'
  },
  line: {
    width: '100%',
    height: '53px',
    backgroundColor: '#3b4094', 
    
  },
  buttonContainer: {
    marginTop: '20px', // Ajustar el margen superior del botón
    marginBottom: '20px', // Ajustar el margen inferior del botón
  },
  button: {
    backgroundColor: 'red',
  },
};

// Estilo para filas alternas
const rowStyle = {
  '&.even-row': {
    backgroundColor: '#f2f3f3', // Color de fondo para filas pares
  },
  '&.odd-row': {
    backgroundColor: '#ffffff', // Color de fondo para filas impares
  },
};

export default HomeComponentProducto;
