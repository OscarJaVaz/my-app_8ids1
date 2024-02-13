import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//HOLA

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
    display: 'flex',
    justifyContent: 'space-between', // Espacio entre los elementos
    alignItems: 'center', // Centra verticalmente los elementos
  };

  const estiloCarritoIcono = {
    marginRight: '20px',
    color: 'white'
  };

  const estiloProductosContainer = {
    backgroundColor: '#CBCBCB',
    padding: '60px',
    display: 'flex', // Mostrar los productos en línea
    flexWrap: 'wrap', // Permitir que los productos se envuelvan cuando no haya suficiente espacio
    justifyContent: 'space-between', // Distribuir el espacio horizontalmente entre los productos
  };

  const estiloProducto = {
    width: '300px', // Establecer un ancho fijo para cada producto
    marginBottom: '30px', // Espacio entre cada producto
  };

  const estiloImagen = {
    width: '100%', // Ajustar todas las imágenes a un mismo tamaño
    height: '200px', // Establecer una altura fija para las imágenes
    objectFit: 'cover', // Escalar la imagen para que se ajuste dentro del contenedor sin distorsionarla
  };

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false); // Estado para controlar si se muestra el carrito o no
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para almacenar el producto seleccionado
  const [quantity, setQuantity] = useState(1); // Estado para almacenar la cantidad de productos a agregar al carrito

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

  const addToCart = () => {
    const updatedCart = [...carrito];
    const existingItemIndex = updatedCart.findIndex(item => item.id === selectedProduct.id);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...selectedProduct, quantity });
    }
    setCarrito(updatedCart);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeFromCart = (productId) => {
    const updatedCart = carrito.filter(item => item.id !== productId);
    setCarrito(updatedCart);
  };

  const handleBuy = () => {
    // Aquí puedes implementar la lógica para proceder con el pago
    console.log('Comprando productos:', carrito);
  };

  return (
    <>
      <header style={estiloEncabezado}>
        <Link to="/menu" style={{ textDecoration: 'none', color: 'white' }}>
          <ArrowBackIcon />
        </Link>
        <nav style={{ flex: 1 }}>BIENVENIDO</nav>
        <Button
          style={estiloCarritoIcono}
          onClick={() => setMostrarCarrito(!mostrarCarrito)} // Toggle para mostrar u ocultar el carrito
        >
          <ShoppingCartIcon />
          <span style={{ marginLeft: '5px' }}>{carrito.length}</span> {/* Muestra la cantidad de productos en el carrito */}
        </Button>
      </header>
      {/* Mostrar el carrito si mostrarCarrito es true */}
      {mostrarCarrito && (
        <div style={{ position: 'fixed', top: '60px', right: '20px', backgroundColor: 'white', padding: '10px', zIndex: 1001 }}>
          {carrito.length === 0 ? ( // Verificar si el carrito está vacío
            <p>El carrito está vacío</p>
          ) : (
            carrito.map((producto, index) => (
              <div key={index}>
                <h3>{producto.nom_producto}</h3>
                <p>{producto.descripcion}</p>
                <p>Cantidad: {producto.quantity}</p>
                <p>Precio Total: ${producto.quantity * producto.price}</p>
                <Button onClick={() => removeFromCart(producto.id)}>Eliminar</Button>
              </div>
            ))
          )}
          {carrito.length > 0 && ( // Condición para mostrar el botón "Comprar" solo si hay productos en el carrito
            <Button onClick={handleBuy}>Comprar</Button>
          )}
        </div>
      )}
      <div style={estiloProductosContainer}>
        {productos.map((producto) => (
          <div key={producto.id} style={estiloProducto}>
            <h2 style={{ color: 'red' }}>{producto.nom_producto}</h2>
            <img
              src={producto.imagen}
              alt={producto.nom_producto}
              className="producto-imagen"
              style={estiloImagen}
            />
            <p>{producto.descripcion}</p>
            <p style={{ color: 'blue' }}>${producto.price}</p>
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: 'blue' }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => setSelectedProduct(producto)}
            >
              Ver Detalles
            </Button>
          </div>
        ))}
      </div>
      {/* Modal para mostrar detalles del producto */}
      <Modal
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ backgroundColor: 'white', padding: '20px', width: '300px', margin: '100px auto', textAlign: 'center' }}>
          <h2>{selectedProduct?.nom_producto}</h2>
          <img
            src={selectedProduct?.imagen}
            alt={selectedProduct?.nom_producto}
            className="producto-imagen"
            style={estiloImagen}
          />
          <p>{selectedProduct?.descripcion}</p>
          <p style={{ color: 'blue', marginBottom: '10px' }}>${selectedProduct?.price}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
            <Button variant="outlined" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ margin: '0 10px', width: '60px', textAlign: 'center', border: 'none', outline: 'none', fontSize: '16px' }} />
            <Button variant="outlined" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>
          <Button
            variant="contained"
            style={{ color: 'white', backgroundColor: 'blue' }}
            onClick={addToCart}
          >
            Añadir al carrito
          </Button>
        </div>


      </Modal>
    </>
  );
};

export default Farmacia;
