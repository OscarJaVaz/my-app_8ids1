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

  return (
    <div>
      {/* Sección de detalles del pedido */}
      <div>
        <h2>Detalles del Pedido</h2>
        <ul>
          {state && state.carrito.map((producto, index) => (
            <li key={index}>
              <h3>{producto.nom_producto}</h3>
              <img src={producto.imagen} alt={producto.nom_producto} style={{ width: '100px', height: '100px' }} />
              <p>Descripción: {producto.descripcion}</p>
              <p>Cantidad: {producto.quantity}</p>
              <p>Precio Total: ${producto.quantity * producto.price}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* Fin de la sección de detalles del pedido */}
      {/* Sección de dirección */}
      <div className="direccion-seccion">
        <h5>Dirección</h5>
        <div className="form-group">
          <label htmlFor="postalCode">Código Postal</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            maxLength="5"
            className="form-control"
            onChange={handlePostalCodeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            name="address"
            id="address"
            value={paymentDetails.address}
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            name="city"
            id="city"
            value={paymentDetails.city}
            className="form-control"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">País</label>
          <input
            type="text"
            name="country"
            id="country"
            value={paymentDetails.country}
            className="form-control"
            readOnly
          />
        </div>
      </div>
      {/* Fin de la sección de dirección */}
      {/* Formulario de pago */}
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
            {/* Botón de pago */}
            <button onClick={processPayment} type="button" className="btn btn-success btn-block btn-lg">Pagar</button>
            {/* Fin del botón de pago */}
          </form>
        </div>
      </div>
      {/* Fin del formulario de pago */}
      {/* Modal */}
      {showModal && (
        <div>
          <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <h2>Tu pedido ha sido enviado</h2>
            <p>Su pago se procesó correctamente.</p>
          </div>
        </div>
      )}
      {/* Fin de Modal */}
    </div>
  );
};

export default VistaCompra;
