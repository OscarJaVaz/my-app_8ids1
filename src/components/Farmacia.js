import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Farmacia = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

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

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.quantity * producto.price, 0);
  };

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
    console.log('Comprando productos:', carrito);
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

  return (
    <>
      <header style={{ backgroundColor: '#3f51b5', padding: '10px', color: 'white', textAlign: 'center', fontSize: '24px', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 0, zIndex: 1000, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/menu" style={{ textDecoration: 'none', color: 'white' }}>
          <ArrowBackIcon />
        </Link>
        <nav style={{ flex: 1 }}>Encuentre sus productos aqui</nav>
        <Button style={{ marginRight: '20px', color: 'white', cursor: 'pointer' }} onClick={() => setShowSearchModal(true)}>
          <SearchIcon />
        </Button>
        <Button style={{ marginRight: '20px', color: 'white' }} onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          <ShoppingCartIcon />
          <span style={{ marginLeft: '5px' }}>{carrito.length}</span>
        </Button>
      </header>

      {showSearchModal && (
        <Modal open={showSearchModal} onClose={() => setShowSearchModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <div style={{ backgroundColor: 'white', padding: '10px', width: '300px', margin: '100px auto', textAlign: 'center' }}>
            <h2>Buscar Productos</h2>
            <input type="text" placeholder="Buscar productos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '10px', width: '90%', marginBottom: '20px' }} />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px', fontSize: '16px', width: '100%', marginBottom: '20px' }}>
              <option value="">Ordenar por...</option>
              <option value="nameAZ">Nombre (A-Z)</option>
              <option value="recent">Más recientes</option>
            </select>
            <Button variant="contained" style={{ color: 'white', backgroundColor: '#3f51b5' }} onClick={() => setShowSearchModal(false)}>
              Aplicar Filtros
            </Button>
          </div>
        </Modal>
      )}

      {mostrarCarrito && (
        <div style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: 'white', padding: '10px', zIndex: 1001, maxHeight: '80vh', overflowY: 'auto', width: '300px' }}>
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              {carrito.map((producto, index) => (
                <div key={index}>
                  <h3>{producto.nom_producto}</h3>
                  <p>{producto.descripcion}</p>
                  <p>Cantidad: {producto.quantity}</p>
                  <p>Precio Total: ${producto.quantity * producto.price}</p>
                  <Button onClick={() => removeFromCart(producto.id)}>Eliminar</Button>
                </div>
              ))}
              <p>Total a pagar: ${calcularTotal()}</p>
              <Button onClick={handleBuy}>Comprar</Button>
            </>
          )}
        </div>
      )}

      <div style={{ backgroundColor: '#f5f5f5', padding: '60px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {sortedProducts.map((producto) => (
          <div key={producto.id} style={{ width: '300px', marginBottom: '30px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
            <h2 style={{ color: '#3f51b5', margin: '0', padding: '20px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>{producto.nom_producto}</h2>
            <img src={producto.imagen} alt={producto.nom_producto} className="producto-imagen" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <p style={{ padding: '20px' }}>{producto.descripcion}</p>
            <p style={{ color: '#3f51b5', margin: '0', padding: '20px', backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>${producto.price}</p>
            <Button variant="contained" style={{ color: 'white', backgroundColor: '#3f51b5', margin: '0', width: '100%' }} startIcon={<ShoppingCartIcon />} onClick={() => setSelectedProduct(producto)}>
              Ver Detalles
            </Button>
          </div>
        ))}
      </div>

      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div style={{ backgroundColor: 'white', padding: '20px', width: '300px', margin: '100px auto', textAlign: 'center' }}>
          <h2>{selectedProduct?.nom_producto}</h2>
          <img src={selectedProduct?.imagen} alt={selectedProduct?.nom_producto} className="producto-imagen" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <p>{selectedProduct?.descripcion}</p>
          <p style={{ color: '#3f51b5', marginBottom: '10px' }}>${selectedProduct?.price}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
            <Button variant="outlined" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ margin: '0 10px', width: '60px', textAlign: 'center', border: 'none', outline: 'none', fontSize: '16px' }} />
            <Button variant="outlined" onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>
          <Button variant="contained" style={{ color: 'white', backgroundColor: '#3f51b5', width: '100%' }} onClick={addToCart}>
            Añadir al carrito
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Farmacia;
