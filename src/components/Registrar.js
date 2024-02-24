import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import miImagen from '../components/assets/simbolo_doc.png';

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
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (![nombre, apellido, email, telefono, domicilio, contrasena, confirmarContrasena].every(Boolean)) {
      setMensajeValidacion('Todos los campos son obligatorios');
      return;
    }

    setMensajeValidacion('');
    setShowLoader(true);

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
        setOpenAlert(true);
        navigate('/');
      } else {
        console.error('Error al guardar el cliente');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setShowLoader(false);
    }

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
    if (!/[A-Z]/.test(valor)) mensaje += 'Debe contener al menos una mayúscula. ';
    if (!/[a-z]/.test(valor)) mensaje += 'Debe contener al menos una minúscula. ';
    if (!/[0-9]/.test(valor)) mensaje += 'Debe contener al menos un número. ';
    setContrasenaValida(valor.length >= 8);
    setMensajeValidacion(mensaje);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isBotonRegistrarDisabled = () => {
    return !(
      nombre &&
      apellido &&
      email &&
      telefono &&
      domicilio &&
      contrasena &&
      confirmarContrasena &&
      contrasenaValida &&
      contrasena === confirmarContrasena
    );
  };

  return (
    <div style={{ ...styles.container, backgroundColor: '#48A3FF' }}>
      <div style={styles.mensajeContainer}>
        {mostrarMensaje && (
          <div style={styles.mensaje}>
            <p style={styles.mensajeTexto}>¡Bienvenido al Registro del Consultorio Medico!</p>
          </div>
        )}
      </div>
      <div style={styles.formularioContainer}>
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={miImagen} alt="Avatar Doctor" style={{ height: '10vh' }} />
          </div>

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
            onChange={(e) => setTelefono(e.target.value.replace(/\D/, ''))}
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

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={contrasena}
              onChange={handleContrasenaChange}
              style={{ ...styles.input, color: contrasenaValida ? 'green' : 'inherit', marginBottom: '0' }}
              placeholder="Contraseña"
            />
            <IconButton
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>

          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            style={styles.input}
            placeholder="Confirmar Contraseña"
          />
          {mensajeValidacion && (
            <p style={{ ...styles.mensajeValidacion, color: mensajeValidacion.includes('coinciden') ? 'green' : 'red' }}>
              {mensajeValidacion}
            </p>
          )}
          {showLoader ? (
            <CircularProgress style={{ margin: 'auto', color: 'green' }} />
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4870FF',
                color: 'white',
                borderRadius: '5px',
                marginTop: '10px',
                '&:hover': {
                  backgroundColor: '#4CAF50',
                },
              }}
              type="submit"
              disabled={isBotonRegistrarDisabled()}
            >
              <CheckCircleOutlineIcon style={{ marginRight: '5px', display: 'inline-block', verticalAlign: 'middle' }} />
              Registrar
            </Button>
          )}
          <br></br>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFBF48',
              color: 'white',
              borderRadius: '5px',
              marginTop: '10px',
              '&:hover': {
                backgroundColor: '#FF0000',
              },
            }}
            onClick={regresar}
          >
            <ArrowBackIcon style={{ marginRight: '5px', display: 'inline-block', verticalAlign: 'middle' }} />
            Regresar
          </Button>
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
    borderRadius: '10px',
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
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '95%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginBottom: '10px',
    marginTop: '5px',
  },
  mensajeValidacion: {
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Registrar;
