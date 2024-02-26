import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    address: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const [carrito, setCarrito] = useState(state ? [...state.carrito] : []);

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocusChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      focus: e.target.name,
    });
  };

  const processPayment = () => {
    console.log('Payment Details:', JSON.stringify(paymentDetails));
    // Aquí puedes agregar la lógica para procesar el pago
    // Por ahora, solo mostraremos la modal
    setShowModal(true);
  };

  const handlePostalCodeChange = (e) => {
    const postalCode = e.target.value;
    // Aquí implementamos la lógica para rellenar la información de la dirección
    // Ejemplo de cómo podrías hacerlo
    if (postalCode === '55773' || postalCode === '55755') {
      setPaymentDetails({
        ...paymentDetails,
        postalCode,
        address: 'Bosque de avellano',
        city: 'Tecámac',
        country: 'México',
      });
    } else {
      setPaymentDetails({
        ...paymentDetails,
        postalCode,
        address: '',
        city: '',
        country: '',
      });
    }
  };

  // Estado para controlar la visibilidad de la modal
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Eliminar el producto del carrito si la cantidad es menor o igual a cero
      const updatedCart = carrito.filter(item => item.id !== productId);
      setCarrito(updatedCart);
    } else {
      const updatedCart = carrito.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCarrito(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = carrito.filter(item => item.id !== productId);
    setCarrito(updatedCart);
  };

  // Calcular el total del precio de los productos en el carrito
  const totalPrecio = carrito.reduce((total, producto) => total + (producto.quantity * producto.price), 0);

  return (
    <div className="layout">
      <div className="col-md-6">
        <h2 className='vistacompra'>Detalles del pedido</h2>
        <ul>
          {carrito.map((producto, index) => (
            <li key={index} className="carrito-item">
              <h3>{producto.nom_producto}</h3>
              <img src={producto.imagen} alt={producto.nom_producto} className="carrito-imagen" />
              <p>Descripción: {producto.descripcion}</p>
              <p>Cantidad:
                <button onClick={() => handleQuantityChange(producto.id, producto.quantity - 1)} className="btn-cantidad">-</button>
                {producto.quantity}
                <button onClick={() => handleQuantityChange(producto.id, producto.quantity + 1)} className="btn-cantidad">+</button>
              </p>
              <p>Precio Total: ${producto.quantity * producto.price}</p>
              <button onClick={() => removeFromCart(producto.id)} className="btn-eliminar">Eliminar</button>
            </li>
          ))}
        </ul>
        {/* Mostrar el total del precio */}
        <p className="total-price">Precio total: ${totalPrecio}</p>
      </div>
      <div className="col-md-6">
        {!showPaymentForm ? (
          <button onClick={() => setShowPaymentForm(true)} type="button" className="btn btn-primary btn-lg btn-block">Continuar con el Pago</button>
        ) : (
          <div className="card">
            <div className="card-body">
              <Cards
                number={paymentDetails.number}
                name={paymentDetails.name}
                expiry={paymentDetails.expiry}
                cvc={paymentDetails.cvc}
                focused={paymentDetails.focus}
              />
              <form>
                <div className="form-group">
                  <label htmlFor="number">Número de la tarjeta</label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    maxLength="16"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength="30"
                    className="form-control"
                    onChange={handleInputChange}
                    onFocus={handleFocusChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="expiry">Fecha de expiración</label>
                    <input
                      type="text"
                      name="expiry"
                      id="expiry"
                      maxLength="4"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      maxLength="4"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                </div>
                <button onClick={processPayment} type="button" className="btn btn-success btn-block btn-lg">Pagar</button>
              </form>
            </div>
          </div>
        )}
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
