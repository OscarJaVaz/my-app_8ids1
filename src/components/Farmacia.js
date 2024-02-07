import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';

const Farmacia = () => {
  const estiloEncabezado = {
    backgroundColor: 'blue',
    padding: '20px', 
    color: 'white',
    textAlign: 'center', 
    fontSize: '24px', 
    width: '100%',
    boxSizing: 'border-box', 
    margin: 0, 
    position: 'fixed', 
    top: 0, 
    zIndex: 1000, 
  };

  
  const estiloProductosContainer = {
    backgroundColor: '#CBCBCB', // Agregar fondo de color rojo
    padding: '50px', // Puedes ajustar el relleno según tus preferencias
  };

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/productos');
        setProductos(response.data); 
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const addToCart = (productId) => {
    console.log('Producto añadido al carrito con ID:', productId);
  };

  return (
    <>
      <header style={estiloEncabezado}>
        <nav>
          BIENVENIDO
        </nav>
      </header>
      <div style={estiloProductosContainer}> {/* Aplicar el estilo al contenedor de productos */}
        {productos.map(producto => (
          <div key={producto.id} className="producto">
            <p></p>
            <h2 style={{color:'red'}}>{producto.nom_producto}</h2>
            <img 
              src={producto.imagen} 
              alt={producto.nom_producto} 
              className="producto-imagen"
              style={{ maxWidth: '200px' }} // Establecer un ancho máximo para todas las imágenes
            />
            
            
            <p>{producto.descripcion}</p>
            <p style={{color:'blue'}}>${producto.price}</p>
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: 'blue' }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => addToCart(producto.id)}>
              Añadir al carrito
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Farmacia;
