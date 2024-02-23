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
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import miImagen from '../components/assets/simbolo_doc.png';

// Nuevo componente PasswordField
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
      style={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000' }}
    />
  );
};

// Componente Login_Component con PasswordField integrado
const Login_Component = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [userNotFoundError, setUserNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('administrador'); // Por defecto, se selecciona Administrador

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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
      let response;
      if (selectedRole === 'administrador') {
        response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      } else {
        response = await axios.post('http://127.0.0.1:8000/api/logincliente', { email: email, contrasena: password });
      }

      console.log('Validando Acceso..');
      console.log(response.data);
      if (response.data.token !== '') {
        console.log('OK');
        secureLocalStorage.setItem('token', response.data.token);
        secureLocalStorage.setItem('username', response.data.nombre); // Almacenar el nombre de usuario
        setOpen(true);
        if (selectedRole === 'administrador') {
          // Si el usuario seleccionó Administrador
          navigate('/menu'); // Redirigir a la ventana de administrador
        } else {
          // Si el usuario seleccionó Cliente
          navigate('/cliente'); // Redirigir a la ventana de cliente
        }
      } else {
        setUserNotFoundError(true);
      }
    } catch (error) {
      console.error(error);
    }

    setEmail('');
    setPassword('');
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
      <div
        style={{
          borderRadius: '20px',
          backgroundColor: '#E1E3EA',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        {loading ? (
          <CircularProgress /> // Mostrar CircularProgress cuando loading es true
        ) : (
          <>
            <img src={miImagen} alt="Avatar Doctor" style={{ float: 'right', height: '50vh', marginTop: '50px' }} />


            <Stack spacing={2} direction="column" alignItems="center">
              <Stack spacing={2} sx={{ width: 300, marginTop: '50px', backgroundColor: '#E1E3EA', padding: '20px', borderRadius: '20px' }}>
                <h1 style={{ fontSize: '40px', textAlign: 'center', color: '#000000' }}>BIENVENIDO</h1>
                <TextField
                  label="Usuario"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000', marginBottom: '10px' }}
                />
                {/* Uso del componente PasswordField */}
                <PasswordField password={password} handlePasswordChange={handlePasswordChange} />
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  sx={{ fontFamily: 'sans-serif', fontWeight: 'bold', backgroundColor: '#8A8D95', color: '#ffffff' }}
                  onClick={fnLogin}
                >
                  ENTRAR
                </Button>
              </Stack>
              <br />
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
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', alignItems: 'center' }}>
                <label style={{ fontSize: '26px', marginBottom: '5px' }}>Selecciona el Rol:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="administrador"
                    checked={selectedRole === 'administrador'}
                    onChange={handleRoleChange}
                    style={{ marginRight: '5px' }}
                  />
                  <label htmlFor="admin" style={{ fontSize: '14px' }}>Administrador</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                  <input
                    type="radio"
                    id="client"
                    name="role"
                    value="cliente"
                    checked={selectedRole === 'cliente'}
                    onChange={handleRoleChange}
                    style={{ marginRight: '5px' }}
                  />
                  <label htmlFor="client" style={{ fontSize: '14px' }}>Cliente</label>
                </div>
              </div>
            </Stack>



          </>
        )}
        <div style={{ position: 'absolute', top: 540, right: 20 }}></div>
      </div>
    </div>
  );
};

export default Login_Component;
