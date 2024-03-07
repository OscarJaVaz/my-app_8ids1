import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerProductosComprados = () => {
    const [user, setUser] = useState(null);
    const [purchasedProducts, setPurchasedProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener el token de autenticación del cliente almacenado en el almacenamiento local
                const token = localStorage.getItem('token');
                
                // Verificar si se ha obtenido el token correctamente
                if (!token) {
                    throw new Error('Token de autenticación no encontrado en el almacenamiento local');
                }
    
                // Configurar el encabezado de autorización con el token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
    
                // Realizar la solicitud para obtener los productos comprados del cliente
                const response = await axios.get('http://127.0.0.1:8000/api/verproductoComprado', config);
    
                // Establecer el nombre de usuario y los productos comprados en el estado
                setUser(response.data.nombre_cliente);
                setPurchasedProducts(response.data.compras);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
            }
        };
    
        fetchData();
    }, []);
    

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
