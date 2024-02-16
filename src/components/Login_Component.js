import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import miImagen from '../components/assets/simbolo_doc.png';

const Login_Component = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [userNotFoundError, setUserNotFoundError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      console.log('Validando Acceso..');
      console.log(response.data);
      if (response.data.token !== '') {
        console.log('OK');
        secureLocalStorage.setItem('token', response.data.token); 
        secureLocalStorage.setItem('username', response.data.nombre); // Almacenar el nombre de usuario
        setOpen(true);
        navigate('/menu');
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
            <Stack spacing={2} direction="column">
              <Stack spacing={2} sx={{ width: 300, marginTop: '50px', backgroundColor: '#E1E3EA', padding: '20px', borderRadius: '20px' }}>
                <h1 style={{ fontSize: '40px', textAlign: 'center', color: '#000000' }}>BIENVENIDO</h1>
                <TextField
                  label="Usuario"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  variant="outlined"
                  style={{ borderRadius: '20px', backgroundColor: '#ffffff', color: '#000000' }}
                />
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
            </Stack>
          </>
        )}
        <div style={{ position: 'absolute', top: 540, right: 20 }}></div>
      </div>
    </div>
  );
};

export default Login_Component;
