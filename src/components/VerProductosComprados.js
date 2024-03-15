import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage'; // Importa secureLocalStorage

const VerProductosComprados = () => {
    const [user, setUser] = useState(null);
    const [purchasedProducts, setPurchasedProducts] = useState([]);

    useEffect(() => {
        const storedUsername = secureLocalStorage.getItem('username'); // Obtén el nombre de usuario desde secureLocalStorage
        if (storedUsername) {
            setUser(storedUsername);
        }

        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Token de autenticación no encontrado en el almacenamiento local');
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://127.0.0.1:8000/api/productoComprado', config);
                console.log('Response:', response.data); // Log response data

                setUser(response.data[0]?.nombre_cliente);
                setPurchasedProducts(response.data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
            }
        };

        fetchData();
    }, []);

    console.log('User:', user); // Log user state
    console.log('Purchased Products:', purchasedProducts); // Log purchasedProducts state

    return (
        <div>
            <h2>Mis productos comprados</h2>
            {user && (
                <div>
                    <h3>Nombre del cliente: {user}</h3>
                    <h3>Productos comprados:</h3>
                    <ul>
                        {purchasedProducts.map((compra, index) => (
                            <li key={index}>
                                <p>Nombre: {compra.nombre_producto}</p>
                                <p>Cantidad: {compra.cantidad}</p>
                                <p>Total: {compra.total}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VerProductosComprados;
