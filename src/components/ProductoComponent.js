import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Enfermedad from './assets/enf.png';
import Enfermedad2 from './assets/enff.jpg';

function ProductoComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productos, setProducto] = useState({
    id: 0,
    nom_producto: '',
    descripcion: '',
    price: '',
    imagen: '', // Esta propiedad guarda la URL de la imagen
  });

  const [loading, setLoading] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagen(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = (event) => {
    const { name, value } = event.target;
    setProducto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const GuardarDatos = async () => {
    setLoading(true);
    try {
      // Validar el campo 'price'
      const regex = /^[0-9.]+$/;
      if (!regex.test(productos.price)) {
        setError('El campo de precio contiene caracteres no válidos ingrese solo numeros');
        setLoading(false);
        return;
      }

      // Acortar la cadena de imagen si es necesario
      const imagenGuardada = imagen || productos.imagen;

      await axios.post('http://127.0.0.1:8000/api/producto/crear', { ...productos, imagen: imagenGuardada });
      console.log('Datos guardados correctamente');
      setLoading(false);
      navigate("/homeproducto");
    } catch (error) {
      console.error('Error al guardar datos:', error);
      setError('Error al guardar datos. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  const eliminarDatos = async () => {
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/producto/borrar', productos);
      console.log('Datos eliminados correctamente');
      setLoading(false);
      navigate("/homeproducto");
    } catch (error) {
      console.error('Error al eliminar datos:', error);
      alert('Error al eliminar datos. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Render');
    if (location.state.id !== 0) {
      fnObtenerDatos();
    }
  }, []);

  const fnObtenerDatos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/producto', {
        params: {
          id: location.state.id
        }
      });
  
      const { nom_producto, descripcion, price, imagen } = response.data;
  
      // Actualiza el estado con los datos del producto, incluida la imagen
      setProducto({
        id: location.state.id,
        nom_producto,
        descripcion,
        price,
        imagen,
      });

      // Si hay una URL de imagen, establecerla en el estado de la imagen
      if (imagen) {
        setImagen(imagen);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setLoading(false);
    }
  };

  
  const regresar = async () => {
    navigate('/homeproducto');
  };

  const camposCompletos = () => {
    return (
      productos.nom_producto.trim() !== '' &&
      productos.descripcion.trim() !== '' &&
      productos.price.trim() !== '' &&
      (imagen || productos.imagen)
    );
  };

  return (
    <div>
       <div style={styles.line}></div> 
    <div style={styles.container}>
      
      <h1 style={{ marginBottom: '20px', textSizeAdjust: '50px'}}>Agregar productos</h1>
  {error && (
    <div style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
      <p>{error}</p>
    </div>
  )}
  <div style={{ marginBottom: '20px', width: '100%' }}>
  <TextField
    required
    id="outlined-required"
    label="Nombre del Producto"
    name="nom_producto"
    value={productos.nom_producto}
    onChange={handleGuardar}
    fullWidth // Otra opción es usar la prop fullWidth de TextField para que ocupe todo el ancho disponible
  />
</div>

  <div style={{ marginBottom: '20px', width: '100%' }}>
    <TextField
      required
      id="outlined-required"
      label="Descripcion"
      name="descripcion"
      value={productos.descripcion}
      onChange={handleGuardar}
      fullWidth 
    />
  </div>
  <div style={{ marginBottom: '20px', width: '100%'}}>
    <TextField
      required
      id="outlined-required"
      label="Precio"
      name="price"
      value={productos.price}
      onChange={handleGuardar}
      fullWidth 
    />
  </div>
  <div style={{ marginBottom: '20px', textAlign: 'center'}}>
  <input type="file" accept="image/*" onChange={handleImageChange} />
  {imagen || productos.imagen ? (
    <div>
      <p>Imagen del producto:</p>
      <img
        src={imagen || productos.imagen}
        alt="Imagen del producto"
        style={{
          maxWidth: '100px', // Ancho máximo de la imagen
          maxHeight: '100px', // Altura máxima de la imagen
          borderRadius: '10px',
        }}
      />
    </div>
  ) : null}
</div>

  <div style={{ textAlign: 'center' }}>
    <Button
      variant="contained"
      style={{ backgroundColor: '#1172D8', marginRight: '10px' }}
      onClick={GuardarDatos}
      startIcon={<SaveIcon />}
      disabled={!camposCompletos()}
    >
      Guardar
    </Button>
    <Button
      variant="contained"
      style={{ backgroundColor: 'red' }}
      onClick={eliminarDatos}
      startIcon={<DeleteIcon />}
      disabled={!camposCompletos()}
    >
      Eliminar
    </Button>
  </div>
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <Button
      variant="contained"
      style={{ backgroundColor: '#F66E10' }}
      onClick={regresar}
      startIcon={<ArrowBackIosIcon />}
    >
      Regresar
    </Button>
  </div>
  <div style={{ marginTop: '20px', width: '100%', textAlign: 'center' }}>
    {loading && (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )}
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
  },
  line: {
    width: '100%',
    height: '53px',
    backgroundColor: '#1172D8', 
    marginBottom: '1px', // Margen inferior para separar la línea del título
  },
  buttonContainer: {
    marginTop: '20px', // Ajustar el margen superior del botón
    marginBottom: '20px', // Ajustar el margen inferior del botón
  },
  button: {
    backgroundColor: 'red',
  },
};

export default ProductoComponent;