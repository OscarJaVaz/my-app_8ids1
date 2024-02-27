import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const VistaCompra = () => {
  const location = useLocation();
  const { state } = location;

  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });
  const [addressDetails, setAddressDetails] = useState({
    postalCode: '',
    address: '',
    city: '',
    referencia: '',
  });

  const [carrito, setCarrito] = useState(state ? [...state.carrito] : []);
  const [nombreCliente, setNombreCliente] = useState('');

  const handleInputChange = (e, setter) => {
    setter({
      ...setter,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e, setter) => {
    setter({
      ...setter,
      focus: e.target.name,
    });
  };

  const processPayment = (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario

    const datosCompra = {
      ...paymentDetails,
      ...addressDetails,
      nombre_cliente: nombreCliente,
      total: calcularTotal(),
      cantidad: calcularCantidadProductos(),
    };

    // Enviar los datos al backend
    fetch('http://127.0.0.1:8000/api/compra/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCompra),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
        setShowModal(true); // Mostrar la modal de confirmación
      })
      .catch(error => {
        console.error('Error al procesar el pago:', error);
        // Manejar el error
      });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.quantity * producto.price, 0);
  };

  const calcularCantidadProductos = () => {
    return carrito.reduce((total, producto) => total + producto.quantity, 0);
  };

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };

  const removeFromCart = (productId) => {
    const updatedCart = carrito.filter(item => item.id !== productId);
    setCarrito(updatedCart);
  };

  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className="layout">
      <div className="col-md-6">
        <h2 className='vistacompra'>Detalles del pedido</h2>
        <Slider {...sliderSettings}>
          {carrito.map((producto, index) => (
            <div key={index} className="carrito-item">
              <h3>{producto.nom_producto}</h3>
              <img src={producto.imagen} alt={producto.nom_producto} className="carrito-imagen" />
              <p>Descripción: {producto.descripcion}</p>
              <p>Cantidad:
                <button onClick={() => removeFromCart(producto.id)} className="btn-eliminar">Eliminar</button>
              </p>
              <p>Precio Total: ${producto.quantity * producto.price}</p>
            </div>
          ))}
        </Slider>
        {/* Mostrar el total del precio */}
        <p className="total-price">Precio total: ${calcularTotal()}</p>
      </div>
      <div className="col-md-6">
        <form onSubmit={processPayment}>
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading" style={{ color: '#305edb', marginBottom: '20px', fontWeight: 'bold', fontSize: '24px' }}>Ingresa tus datos domiciliarios</h4>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="postalCode">Código Postal</label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="form-control"
                  value={addressDetails.postalCode}
                  onChange={(e) => handleInputChange(e, setAddressDetails)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  value={addressDetails.address}
                  onChange={(e) => handleInputChange(e, setAddressDetails)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="city">Municipio</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  value={addressDetails.city}
                  onChange={(e) => handleInputChange(e, setAddressDetails)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="referencia">Referencia</label>
                <input
                  type="text"
                  name="referencia"
                  id="referencia"
                  className="form-control"
                  value={addressDetails.referencia}
                  onChange={(e) => handleInputChange(e, setAddressDetails)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success btn-block btn-lg">Continuar con el Pago</button>
          </div>
        </form>
      </div>
      {showModal && (
        <div>
          <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <h2>Tu pedido ha sido enviado</h2>
            <p>Su pago se procesó correctamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaCompra;
