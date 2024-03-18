import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { Link } from 'react-router-dom';

const Miperfil = () => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
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
                console.log('Response:', response.data);

                setUser(storedUsername);
                setUserData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

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
                       <Link to="/cliente">
                        <button>Regresar</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Miperfil;
