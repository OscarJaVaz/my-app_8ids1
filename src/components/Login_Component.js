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

const PasswordField = ({ password, handlePasswordChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label="Contraseña"
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={password}
      onChange={handlePasswordChange}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000' }}
    />
  );
};

const Login_Component = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [userNotFoundError, setUserNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);

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
        // Si la primera API no devuelve un token válido, intentar con la segunda API
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(#48A3FF, #ffffff)' }}>
      <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ padding: '2px', textAlign: 'center' }}>
          <Stack spacing={2} sx={{ width: 400, marginTop: '10px', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '40px', color: '#000000' }}>Iniciar Sesión</h1>
            <TextField
              label="Usuario"
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              sx={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000', marginBottom: '10px' }}
            />
            <PasswordField password={password} handlePasswordChange={(e) => handleInputChange(e, setPassword)} />
            <Stack direction="row" sx={{ justifyContent: 'center', marginTop: '10px' }}>
              <Button
                variant="contained"
                sx={{
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  backgroundColor: '#3F51B5',
                  color: '#ffffff',
                  width: '300px',
                  '&:hover': {
                    backgroundColor: '#4CAF50',
                  },
                }}
                onClick={fnLogin}
                disabled={!email || !password || loading} // Deshabilita el botón mientras se carga
              >
                {loading && <CircularProgress size={24} color="inherit" />} {/* Muestra la rueda de carga cuando loading es verdadero */}
                {!loading && <span>Entrar</span>} {/* Muestra "Entrar" cuando loading es falso */}
                <LockOutlinedIcon style={{ marginLeft: '5px' }} />
              </Button>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'center', marginBottom: '10px', color: '#000000' }}>
              <span style={{ fontSize: '14px' }}>¿Es tu primera vez? </span>
              <span
                style={{ fontSize: '14px', textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => handleNavigation('/registrar')}
              >
                Regístrate aquí
              </span>
            </Stack>
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
          </Stack>
        </div>
        <div style={{ marginLeft: '20px', alignSelf: 'flex-end', marginBottom: '20px' }}>
          <img src={miImagen} alt="Avatar Doctor" style={{ height: '50vh', marginTop: '50px' }} />
        </div>
      </div>
    </div>
  );
};

export default Login_Component;
