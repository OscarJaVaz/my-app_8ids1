import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography, TextField, Button, Grid, Box, Divider, Paper, Slide, Avatar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Person, PersonOutline } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//CSS
import './Perfil_Estilo.css';

const Perfildoc = () => {
    const [userData, setUserData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isFemale, setIsFemale] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUsername = secureLocalStorage.getItem('username');
                if (!storedUsername) {
                    throw new Error('Nombre de usuario no encontrado en secureLocalStorage');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/perfildoc', {
                    params: { nombre_usuario: storedUsername }
                });

                setUserData(response.data);

                if (response.data && response.data.nombre) {
                    const nombre = response.data.nombre.toLowerCase();
                    setIsFemale(nombre.endsWith('a'));
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleActualizarContraseña = async () => {
        try {
            const storedUsername = secureLocalStorage.getItem('username');
            const response = await axios.put('http://127.0.0.1:8000/api/actualizarcontraseña', {
                nombre_usuario: storedUsername,
                password_actual: currentPassword,
                nueva_password: newPassword
            });

            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setOpenSnackbar(true);
            setCurrentPassword('');
            setNewPassword('');
            setIsChangingPassword(false);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error al actualizar la contraseña. Por favor, verifica tus credenciales y prueba de nuevo.');
            setOpenSnackbar(true);
            console.error('Error al actualizar la contraseña:', error.response.data);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <div className="container">
            <header className="perfil">
                {userData && (
                    <Avatar sx={{ width: 100, height: 100, backgroundColor: isFemale ? 'pink' : 'blue', margin: 'auto' }}>
                        {isFemale ? <PersonOutline sx={{ width: 100, height: 100 }} /> : <Person sx={{ width: 100, height: 100 }} />}
                    </Avatar>
                )}
                <div className="titulo">
                    <h1>Datos del Doctor</h1>
                </div>
            </header>

            <main className="projetos">
                <Box mt={2} mb={2}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={10}>
                            <Slide direction="right" in={true} timeout={1000}>
                                <Paper elevation={5} sx={{ bgcolor: 'white', p: 3, color: 'black' }}>
                                    {userData ? (
                                        <div>
                                            <Typography variant="h6" gutterBottom align="center">Información</Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            <Typography variant="subtitle1" gutterBottom>Nombre del doctor:</Typography>
                                            <Typography variant="subtitle2" gutterBottom>{userData.name}</Typography>
                                            <Typography variant="subtitle1" gutterBottom>Email:</Typography>
                                            <Typography variant="subtitle2" gutterBottom>{userData.email}</Typography>
                                        </div>
                                    ) : (
                                        <Typography variant="body1" gutterBottom>No se encontraron datos del usuario.</Typography>
                                    )}
                                </Paper>
                            </Slide>
                        </Grid>

                        <Grid item xs={12} md={10}>
                            <Slide direction="left" in={true} timeout={1000}>
                                <Paper elevation={5} sx={{ bgcolor: 'white', p: 3, color: 'black' }}>
                                    {isChangingPassword ? (
                                        <div>
                                            <Typography variant="h6" gutterBottom align="center">Cambiar Contraseña</Typography>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                type="password"
                                                label="Contraseña actual"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                sx={{ mb: 2 }}
                                            />
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                type="password"
                                                label="Nueva Contraseña"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                sx={{ mb: 2 }}
                                            />
                                            <Button variant="contained" onClick={handleActualizarContraseña} fullWidth>Actualizar Contraseña</Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Typography variant="body1" gutterBottom align="center">¿Deseas cambiar tu contraseña?</Typography>
                                            <Button variant="contained" onClick={() => setIsChangingPassword(true)} fullWidth>Cambiar Contraseña</Button>
                                        </div>
                                    )}
                                </Paper>
                            </Slide>
                        </Grid>
                    </Grid>
                </Box>

                <Grid item xs={12}>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <MuiAlert
                            onClose={handleCloseSnackbar}
                            severity={successMessage ? 'success' : 'error'}
                            sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                        >
                            {successMessage || errorMessage}
                        </MuiAlert>
                    </Snackbar>
                </Grid>
            </main>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/menu" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="outlined"
                        sx={{
                            width: '200px',
                            color: 'black',
                            backgroundColor: 'orange',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 165, 0, 0.8)',
                            }
                        }}
                        startIcon={<ArrowBackIcon />}
                    >
                        Regresar
                    </Button>
                </Link>
            </Grid>

        </div>
    );
};

export default Perfildoc;