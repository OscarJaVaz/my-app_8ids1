import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import miImagen from '../components/assets/simbolo_doc.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// CSS
import './Login.css';

// Función para el campo de contraseña
const PasswordField = ({ password, handlePasswordChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handlePasswordChange}
      fullWidth
      margin="normal"
      variant="outlined"
      label="Password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

// Componente principal de login
const Login_Component = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [userNotFoundError, setUserNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(true);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [contrasenaValida, setContrasenaValida] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();

  const regresar = () => {
    navigate('/');
  };

  const fnLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setEmptyFieldsError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login',
        { email, password }
      );

      console.log('Validating Access..');
      console.log(response.data);

      if (response.data.token !== '') {
        console.log('OK');
        secureLocalStorage.setItem('token', response.data.token);
        secureLocalStorage.setItem('username', response.data.nombre);
        setOpen(true);
        navigate('/menu');
      } else {
        const secondResponse = await axios.post(
          'http://127.0.0.1:8000/api/logincliente',
          { email, contrasena: password }
        );

        console.log('Second API Response:');
        console.log(secondResponse.data);

        if (secondResponse.data.token !== '') {
          console.log('OK');
          secureLocalStorage.setItem('token', secondResponse.data.token);
          secureLocalStorage.setItem('username', secondResponse.data.nombre);
          setOpen(true);
          navigate('/cliente');
        } else {
          setUserNotFoundError(true);
          setOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
      setUserNotFoundError(true);
      setOpen(false);
    }

    setEmail('');
    setPassword('');
    setLoading(false);
  };

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

  const validarContrasena = (valor) => {
    let mensaje = '';
  
    if (!/[A-Z]/.test(valor)) mensaje += 'Debe contener al menos una mayúscula. ';
    if (!/[a-z]/.test(valor)) mensaje += 'Debe contener al menos una minúscula. ';
    if (!/[0-9]/.test(valor)) mensaje += 'Debe contener al menos un número. ';
  
    // Verificar longitud mínima
    if (valor.length < 8) mensaje += 'Debe tener al menos 8 caracteres. ';
  
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

  const handleContrasenaChange = (e) => {
    const valor = e.target.value;
    setContrasena(valor);
    validarContrasena(valor);
  };

  const handleNombreChange = (e) => {
    const valor = e.target.value;
    // Solo permitir letras y espacios
    if (/^[a-zA-Z\s]*$/.test(valor)) {
      setNombre(valor);
    }
  };
  
  const handleNombreBlur = () => {
    if (!nombre) {
      setMensajeValidacion('El nombre es obligatorio');
    }
  };

  // Función para validar campos vacíos al salir del campo
  const handleEmptyFieldBlur = (value, fieldName) => {
    if (!value) {
      setMensajeValidacion(`El campo ${fieldName} es obligatorio`);
    }
  };

  const handleSignUpClick = () => {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
  };

  const handleSignInClick = () => {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Montserrat, sans-serif',
      height: '100vh',
      margin: '-20px 0 50px',
      background: 'linear-gradient(#48A3FF, #ffffff)'
    }}>
      <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Consultorio Médico</h2>
      <div className="container" id="container">
        {/* REGISTRARSE (Elementos) */}
        <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
            <h1>Crear cuenta</h1>
            <input type="text" placeholder="Nombre" value={nombre} onChange={handleNombreChange} onBlur={handleNombreBlur} />
            <input type="text" placeholder="Apellidos" value={apellido} onChange={(e) => setApellido(e.target.value)} onBlur={() => handleEmptyFieldBlur(apellido, 'Apellidos')} />
            <input type="number" inputMode="numeric" pattern="[0-9]*" placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ''))} onBlur={() => handleEmptyFieldBlur(telefono, 'Teléfono')} />
            <input type="text" placeholder="Domicilio" value={domicilio} onChange={(e) => setDomicilio(e.target.value)} onBlur={() => handleEmptyFieldBlur(domicilio, 'Domicilio')} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleEmptyFieldBlur(email, 'Email')} />
            <input type="password" placeholder="Contraseña" value={contrasena} onChange={handleContrasenaChange} onBlur={() => handleEmptyFieldBlur(contrasena, 'Contraseña')} />
            <input type="password" placeholder="Confirmar contraseña" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} onBlur={() => handleEmptyFieldBlur(confirmarContrasena, 'Confirmar contraseña')} />
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
              INICIO
            </Button>
          </form>
        </div>
        {/* Iniciar Sesión (Elementos) */}
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Iniciar Sesión</h1>

            <input type="email" value={email} onChange={(e) => handleInputChange(e, setEmail)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} placeholder="Contraseña" />
            
            <button onClick={fnLogin} disabled={!email || !password || loading}>
              {loading && <CircularProgress size={20} color="inherit" />}
              {!loading && <span>Iniciar Sesión</span>}
              <LockOutlinedIcon style={{ marginLeft: '10px' }} />
            </button>
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
              INICIO
            </Button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenido de nuevo!</h1>
              <p>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
              <button className="ghost" onClick={handleSignInClick}>Inicia Sesión aquí</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hola!</h1>
              <p>¿No tienes cuenta?. Introduce tus datos personales y comienza tu cuenta con nosotros.</p>
              <button className="ghost" onClick={handleSignUpClick}>Registrate aquí</button>
            </div>
          </div>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          sx={{
            bottom: '0%',
            right: '50%',
            transform: 'translate(230%, -660%)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Alert severity="success">Ingreso exitoso</Alert>
        </Snackbar>
        {emptyFieldsError && (
          <Alert severity="error" onClose={() => setEmptyFieldsError(false)}>
            Verifica la información
          </Alert>
        )}
        {userNotFoundError && (
          <Alert severity="error" onClose={() => setUserNotFoundError(false)}>
            Usuario o contraseña incorrectos
          </Alert>
        )}
      </div>
    </div>
  );
};

const styles = {
  
  mensaje: {
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mensajeTexto: {
    color: '#1172D8',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  mensajeValidacion: {
    fontSize: '12px',
    marginBottom: '0px',
  },
};

export default Login_Component;
