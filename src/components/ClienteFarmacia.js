import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ClienteFarmacia = () => {
  const navigate = useNavigate();

  const estiloEncabezado = {
    backgroundColor: '#3f51b5',
    padding: '10px',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const estiloCarritoIcono = {
    marginRight: '20px',
    color: 'white',
  };

  const estiloSearchIcon = {
    marginRight: '20px',
    color: 'white',
    cursor: 'pointer',
  };

  const estiloProductosContainer = {
    backgroundColor: '#f5f5f5',
    padding: '75px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const estiloProducto = {
    width: '300px',
    marginBottom: '30px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const estiloImagen = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const estiloCarrito = {
    position: 'fixed',
    top: '60px',
    right: '20px',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1001,
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxHeight: '400px',
    overflowY: 'auto',
  };

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [nombreProductosSeleccionados, setNombreProductosSeleccionados] = useState([]);
  const [cantidadesSeleccionadas, setCantidadesSeleccionadas] = useState([]);

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

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
  }, []); // Solo se ejecuta una vez al cargar el componente

  const addToCart = () => {
    const updatedCarrito = [...carrito, { ...selectedProduct, quantity }];
    setCarrito(updatedCarrito);
    setNombreProductosSeleccionados([...nombreProductosSeleccionados, selectedProduct.nom_producto]);
    setCantidadesSeleccionadas([...cantidadesSeleccionadas, quantity]);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeFromCart = (productId) => {
    const updatedCart = carrito.filter(item => item.id !== productId);
    setCarrito(updatedCart);
  };

  const handleBuy = () => {
    navigate("/vistaCompra", {
      state: {
        carrito,
        nombreProductos: nombreProductosSeleccionados,
        cantidades: cantidadesSeleccionadas
      }
    });
  };

  const filteredProducts = productos.filter(producto => {
    return producto.nom_producto.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'nameAZ') {
      return a.nom_producto.localeCompare(b.nom_producto);
    } else if (sortBy === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
  }, [carrito]); // Se ejecuta cada vez que el carrito cambia

  return (
    <>
      <header style={estiloEncabezado}>
        <Link to="/cliente" style={{ textDecoration: 'none', color: 'white' }}>
          <ArrowBackIcon />
        </Link>
        <nav style={{ flex: 2, textAlign: 'center' }}>Encuentra tus productos aqui</nav>
        <Button
          style={estiloSearchIcon}
          onClick={() => setShowSearchModal(true)}
        >
          <SearchIcon />
        </Button>
        <Button
          style={estiloCarritoIcono}
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
        >
          <ShoppingCartIcon />
          <span style={{ marginLeft: '5px' }}>{carrito.length}</span>
        </Button>
      </header>
      {showSearchModal && (
        <Modal
          open={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{ backgroundColor: 'white', padding: '10px', width: '300px', margin: '100px auto', textAlign: 'center' }}>
            <h2>Buscar Productos</h2>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '10px', width: '90%', marginBottom: '20px' }}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px', fontSize: '16px', width: '100%', marginBottom: '20px' }}>
              <option value="">Ordenar por...</option>
              <option value="nameAZ">Nombre (A-Z)</option>
              <option value="recent">Más recientes</option>
            </select>
            <Button
              variant="contained"
              style={{ color: 'white', backgroundColor: '#3f51b5' }}
              onClick={() => setShowSearchModal(false)}
            >
              Aplicar Filtros
            </Button>
          </div>
        </Modal>
      )}
      {mostrarCarrito && (
        <div style={estiloCarrito}>
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            carrito.map((producto, index) => (
              <div key={index}>
                <h3>{producto.nom_producto}</h3>
                <img
                  src={producto.imagen}
                  alt={producto.nom_producto}
                  className="producto-imagen"
                  style={estiloImagen}
                />
                <p>{producto.descripcion}</p>
                <p>Cantidad: {producto.quantity}</p>
                <p>Precio Total: ${producto.quantity * producto.price}</p>
                <Button onClick={() => removeFromCart(producto.id)}>Eliminar</Button>
              </div>
            ))
          )}
          {carrito.length > 0 && (
            <Button onClick={handleBuy}>Comprar</Button>
          )}
        </div>
      )}
      <div style={estiloProductosContainer}>
        {sortedProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          sortedProducts.map((producto) => (
            <div key={producto.id} style={estiloProducto}>
              <h2 style={{ color: '#3f51b5' }}>{producto.nom_producto}</h2>
              <img
                src={producto.imagen}
                alt={producto.nom_producto}
                className="producto-imagen"
                style={estiloImagen}
              />
              <p>{producto.descripcion}</p>
              <p style={{ color: '#3f51b5', margin: '0', padding: '20px', backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>${producto.price}</p>
              <Button
                variant="contained"
                style={{ color: 'white', backgroundColor: '#3f51b5', margin: '0', width: '100%' }}
                startIcon={<ShoppingCartIcon />}
                onClick={() => setSelectedProduct(producto)}
              >
                Ver Detalles
              </Button>
            </div>
          ))
        )}
      </div>
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
          <p style={{ color: '#3f51b5', marginBottom: '10px' }}>${selectedProduct?.price}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
            <Button variant="outlined" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ margin: '0 10px', width: '60px', textAlign: 'center', border: 'none', outline: 'none', fontSize: '16px' }} />
            <Button variant="outlined" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>
          <Button
            variant="contained"
            style={{ color: 'white', backgroundColor: '#3f51b5', width: '100%' }}
            onClick={addToCart}
          >
            Añadir al carrito
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ClienteFarmacia;
