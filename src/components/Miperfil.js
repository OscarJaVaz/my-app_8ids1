import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Miperfil = () => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        // Función para obtener los datos del usuario
        const fetchUserData = async () => {
            try {
                const storedUsername = secureLocalStorage.getItem('username');
                if (!storedUsername) {
                    throw new Error('Nombre de usuario no encontrado en secureLocalStorage');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/perfil', {
                    params: {
                        nombre_usuario: storedUsername
                    }
                });

                setUser(storedUsername);
                setUserData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    // Función para manejar la actualización de la contraseña
    const handleActualizarContraseña = async () => {
        try {
            const storedUsername = secureLocalStorage.getItem('username');
            const response = await axios.put('http://127.0.0.1:8000/api/actualizar-contraseña', {
                nombre_usuario: storedUsername,
                contrasena_actual: currentPassword,
                nueva_contrasena: newPassword
            });
            
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setOpenSnackbar(true);
            // Limpiar los campos después de mostrar la alerta
            setCurrentPassword('');
            setNewPassword('');
            // Ocultar el formulario
            setIsChangingPassword(false);
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error al actualizar la contraseña. Por favor, verifica tus credenciales y prueba de nuevo.');
            setOpenSnackbar(true); // Mostrar la alerta de error
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
        <div>
            <h2>Datos del Usuario</h2>
            {user && (
                <div>
                    <h3>Nombre de usuario: {user}</h3>
                    {userData ? (
                        <div>
                            <p style={{color:'black'}}>Nombre: {userData.nombre}</p>
                            <p style={{color:'black'}}>Apellido: {userData.apellido}</p>
                            <p style={{color:'black'}}>Email: {userData.email}</p>
                            <p style={{color:'black'}}>Teléfono: {userData.telefono}</p>
                        </div>
                    ) : (
                        <p>No se encontraron datos del usuario.</p>
                    )}
                    {isChangingPassword ? (
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Nueva Contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button onClick={handleActualizarContraseña}>Actualizar Contraseña</button>
                        </div>
                    ) : (
                        <button onClick={() => setIsChangingPassword(true)}>Cambiar Contraseña</button>
                    )}
                    <Snackbar 
                        open={openSnackbar} 
                        autoHideDuration={6000} 
                        onClose={handleCloseSnackbar} 
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                    >
                        <MuiAlert 
                            onClose={handleCloseSnackbar} 
                            severity={successMessage ? 'success' : 'error'} 
                            sx={{ 
                                width: '100%',
                                backgroundColor: 'white',
                                color: 'black' 
                            }}
                        >
                            {successMessage || errorMessage}
                        </MuiAlert>
                    </Snackbar>
                    <Link to="/cliente">
                        <button>Regresar</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Miperfil;
