import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; // Importar componente de rueda de carga

const Registrar = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(true);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [contrasenaValida, setContrasenaValida] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // Estado para controlar la visualización de la rueda de carga

  const cerrarMensaje = () => {
    setMostrarMensaje(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      setMensajeValidacion('Las contraseñas no coinciden');
      return;
    }

    // Validar que todos los campos estén completados
    if (!nombre || !apellido || !email || !telefono || !domicilio || !contrasena || !confirmarContrasena) {
      setMensajeValidacion('Todos los campos son obligatorios');
      return;
    }

    // Restablecer mensaje de validación
    setMensajeValidacion('');
    setShowLoader(true); // Mostrar la rueda de carga al enviar el formulario

    try {
      const response = await fetch('http://127.0.0.1:8000/api/cliente/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          telefono,
          domicilio,
          contrasena,
        }),
      });

      if (response.ok) {
        // Mostrar Snackbar de Material-UI con mensaje de registro exitoso
        setOpenAlert(true);
        // Redirigir al usuario a la vista del cliente
        navigate('/');
      } else {
        // Manejar el caso de error en la respuesta de la API
        console.error('Error al guardar el cliente');
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error:', error);
    } finally {
      setShowLoader(false); // Ocultar la rueda de carga después de recibir la respuesta del servido
    }

    // Restablecer los campos del formulario
    setNombre('');
    setApellido('');
    setEmail('');
    setTelefono('');
    setContrasena('');
    setDomicilio('');
    setConfirmarContrasena('');
  };

  const handleContrasenaChange = (e) => {
    const valor = e.target.value;
    setContrasena(valor);
    validarContrasena(valor);
  };

  const regresar = () => {
    navigate('/');
  };

  const validarContrasena = (valor) => {
    let mensaje = '';
    if (!/[A-Z]/.test(valor)) {
      mensaje += 'Debe contener al menos una mayúscula. ';
    }
    if (!/[a-z]/.test(valor)) {
      mensaje += 'Debe contener al menos una minúscula. ';
    }
    if (!/[0-9]/.test(valor)) {
      mensaje += 'Debe contener al menos un número. ';
    }
    if (valor.length >= 8) {
      setContrasenaValida(true);
    } else {
      setContrasenaValida(false);
    }
    setMensajeValidacion(mensaje);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.mensajeContainer}>
        {mostrarMensaje && (
          <div style={styles.mensaje}>
            <p style={styles.mensajeTexto}>¡Bienvenido al Registro del Consultorio Medico!</p>
          </div>
        )}
      </div>
      <div style={styles.formularioContainer}>
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={styles.input}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            style={styles.input}
            placeholder="Apellidos"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Correo electrónico"
          />
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={styles.input}
            placeholder="Teléfono"
          />
          <input
            type="text"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
            style={styles.input}
            placeholder="Domicilio"
          />
          <input
            type="password"
            value={contrasena}
            onChange={handleContrasenaChange}
            style={{ ...styles.input, color: contrasenaValida ? 'green' : 'inherit' }}
            placeholder="Contraseña"
          />
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            style={styles.input}
            placeholder="Confirmar Contraseña"
          />
          {mensajeValidacion && (
            <p style={styles.mensajeValidacion}>{mensajeValidacion}</p>
          )}
          {showLoader ? ( // Mostrar la rueda de carga si showLoader es true
            <CircularProgress style={{ margin: 'auto' }} />
          ) : (
            <button style={styles.botonSubmit} type="submit">Registrar</button>
          )}
          <br></br>
          <button style={styles.cerrarMensajeButton} onClick={regresar}>Regresar</button>
        </form>
      </div>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <MuiAlert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Registro exitoso
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  mensajeContainer: {
    marginBottom: '20px',
  },
  mensaje: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '2px solid #33cccc',
    borderRadius: '5px',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mensajeTexto: {
    color: '#33cccc',
    fontWeight: 'bold',
    margin: 0,
  },
  cerrarMensajeButton: {
    backgroundColor: '#33cccc',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formularioContainer: {
    width: '400px',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginBottom: '10px',
  },
  mensajeValidacion: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  botonSubmit: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '12px 20px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default Registrar;
