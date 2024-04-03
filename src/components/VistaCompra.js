import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import secureLocalStorage from 'react-secure-storage';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const VistaCompra = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const nombresProductos = state ? state.nombreProductos : [];
  const cantidades = state ? state.cantidades : [];

  const [paymentDetails, setPaymentDetails] = useState({
    nombre_cliente: '',
    nombre_producto: nombresProductos.join(', '), // Concatenar los nombres de los productos
    cantidad: cantidades.join(', '), // Concatenar las cantidades
    total: 0,
    cp: '',
    direccion: '',
    municipio: '',
    referencia: '',
    num_tarjeta: '',
    nom_titular: '',
    expiracion: '',
    cvc: '',
  });

  const [carrito, setCarrito] = useState(state ? [...state.carrito] : []);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [isCPValid, setIsCPValid] = useState(true);
  const [isNumTarjetaValid, setIsNumTarjetaValid] = useState(true);

  useEffect(() => {
    const storedUsername = secureLocalStorage.getItem('username');
    if (storedUsername) {
      setPaymentDetails(prevState => ({
        ...prevState,
        nombre_cliente: storedUsername
      }));
    }

    const totalPrecio = carrito.reduce((total, producto) => total + (producto.quantity * producto.price), 0);
    setPaymentDetails(prevState => ({
      ...prevState,
      total: totalPrecio
    }));
  }, [carrito]);

  function handleInputChange(event) {
    const { name, value } = event.target;
  
    // Validar solo si el cambio viene del campo de código postal (cp)
    if (name === 'cp') {
      const isValidInput = /^\d{0,5}$/.test(value); // Validación: solo números y máximo 5 dígitos
      if (isValidInput || value === "") {
        // Actualizar el estado solo si la entrada es válida o está vacía
        setPaymentDetails(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
      else if (name === 'num_tarjeta') {
        // Validar si la entrada contiene solo números y tiene una longitud máxima de 16 caracteres
        const isValidInput = /^\d{0,16}$/.test(value);
        setIsNumTarjetaValid(isValidInput);
      }
    } else {
      // Para otros campos, actualizar el estado directamente
      setPaymentDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  const handleFocusChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      focus: e.target.name,
    });
  };

  const processPayment = () => {
    setProcessingPayment(true);
    // Simulando un retraso para mostrar el proceso de pago
    setTimeout(() => {
      if (
        paymentDetails.cp &&
        paymentDetails.direccion &&
        paymentDetails.municipio &&
        paymentDetails.referencia &&
        paymentDetails.num_tarjeta &&
        paymentDetails.nom_titular &&
        paymentDetails.expiracion &&
        paymentDetails.cvc
      ) {
        axios.post('http://127.0.0.1:8000/api/compra/crear', {
          ...paymentDetails,
          carrito: carrito.map(item => ({ id: item.id, quantity: item.quantity })),
        })
        .then(response => {
          console.log('Compra realizada con éxito:', response.data);
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error al realizar la compra:', error);
        })
        .finally(() => {
          setProcessingPayment(false);
        });
      } else {
        console.error('Por favor completa todos los campos obligatorios.');
        setProcessingPayment(false);
      }
    }, 2000); // Simulación de 2 segundos de proceso de pago
  };

  const handleContinueToPayment = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormSubmit = () => {
    setShowAddressForm(false);
    setShowPaymentForm(true);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
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

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  function handleKeyDown(event) {
    // Obtener el código de la tecla presionada
    const keyCode = event.keyCode || event.which;
  
    // Permitir solo números y las teclas de navegación (como las flechas, retroceso, etc.)
    if (!(keyCode >= 48 && keyCode <= 57) && // Números del 0 al 9
        !(keyCode >= 96 && keyCode <= 105) && // Teclado numérico
        ![8, 9, 37, 39, 46].includes(keyCode)) { // Teclas de navegación y retroceso
      event.preventDefault(); // Prevenir la acción predeterminada (por ejemplo, la entrada de caracteres no deseados)
    }
  }
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
                <button onClick={() => handleQuantityChange(producto.id, producto.quantity - 1)} className="btn-cantidad">-</button>
                {producto.quantity}
                <button onClick={() => handleQuantityChange(producto.id, producto.quantity + 1)} className="btn-cantidad">+</button>
              </p>
              <p>Precio Total: ${producto.quantity * producto.price}</p>
              <button onClick={() => removeFromCart(producto.id)} className="btn-eliminar">Eliminar</button>
            </div>
          ))}
        </Slider>
        <p className="total-price">Precio total: ${paymentDetails.total}</p>
      </div>
      <div className="col-md-6">
        {!showPaymentForm && !showAddressForm && (
          <button onClick={handleContinueToPayment} type="button" className="btn btn-primary btn-lg btn-block">Continuar con el Pago</button>
        )}
        {showAddressForm && (
          <div className="alert alert-info" role="alert">
            <h4 className="alert-heading" style={{ color: '#305edb', marginBottom: '20px', fontWeight: 'bold', fontSize: '24px' }}>Ingresa tus datos domiciliarios</h4>
            <form className='formulario-compra' onSubmit={handleAddressFormSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="cp">Código Postal</label>
                  <input
                    type="text"
                    name="cp"
                    id="cp"
                    className="form-control"
                    value={paymentDetails.cp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    id="direccion"
                    className="form-control"
                    value={paymentDetails.direccion}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="municipio">Municipio</label>
                  <input
                    type="text"
                    name="municipio"
                    id="municipio"
                    className="form-control"
                    value={paymentDetails.municipio}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success btn-block btn-lg">Continuar con el Pago</button>
            </form>
          </div>
        )}

        {showPaymentForm && (
          <div>
            <Cards
              number={paymentDetails.num_tarjeta}
              name={paymentDetails.nom_titular}
              expiry={paymentDetails.expiracion}
              cvc={paymentDetails.cvc}
              focused={paymentDetails.focus}
            />
            <div className="card-compra">
              <div className="card-compra-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="num_tarjeta">Número de la tarjeta</label>
                    <input
                      type="text"
                      name="num_tarjeta"
                      id="num_tarjeta"
                      maxLength="16"
                      className="form-control"
                      pattern="[0-9]*"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                      onKeyDown={handleKeyDown} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom_titular">Nombre del Titular</label>
                    <input
                      type="text"
                      name="nom_titular"
                      id="nom_titular"
                      maxLength="30"
                      className="form-control"
                      onChange={handleInputChange}
                      onFocus={handleFocusChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="expiracion">Fecha de expiración</label>
                      <input
                        type="text"
                        name="expiracion"
                        id="expiracion"
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
                  <button disabled={processingPayment} onClick={processPayment} type="button" className="btn btn-success btn-block btn-lg">
                    {processingPayment ? "Procesando Pago..." : "Pagar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div>
          <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <h2>Pago Exitoso</h2>
            <p>Su pago se procesó correctamente.</p>
            <button onClick={() => navigate('/farmaciacliente')} className="btn btn-primary">Continuar Comprando</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaCompra;
