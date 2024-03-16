import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import jsPDF from 'jspdf';

const VerProductosComprados = () => {
    const [user, setUser] = useState(null);
    const [purchasedProducts, setPurchasedProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUsername = secureLocalStorage.getItem('username');
                if (!storedUsername) {
                    throw new Error('Nombre de usuario no encontrado en secureLocalStorage');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/productoComprado', {
                    params: {
                        nombre_cliente: storedUsername
                    }
                });
                console.log('Response:', response.data);

                setUser(storedUsername);
                setPurchasedProducts(response.data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
            }
        };

        fetchData();
    }, []);

    const generarReportePDF = () => {
        // Crea un nuevo documento PDF
        const doc = new jsPDF();

        // Define el título del documento
        doc.text('Reporte de Compras', 10, 10);

        // Agrega los datos de las compras al documento
        purchasedProducts.forEach((compra, index) => {
            const yPos = 20 + index * 10;
            doc.text(`Nombre: ${compra.nombre_producto}, Cantidad: ${compra.cantidad}, Total: ${compra.total}`, 10, yPos);
        });

        // Genera la URL de datos del PDF y abre una nueva ventana para mostrarlo
        window.open(doc.output('dataurlnewwindow'));
    };

    return (
        <div>
            <h2>Mis productos comprados</h2>
            {user && (
                <div>
                    <h3>Nombre del cliente: {user}</h3>
                    <h3>Productos comprados:</h3>
                    {purchasedProducts.length > 0 ? (
                        <ul>
                            {purchasedProducts.map((compra, index) => (
                                <li key={index}>
                                    <p>Nombre: {compra.nombre_producto}</p>
                                    <p>Cantidad: {compra.cantidad}</p>
                                    <p>Total: {compra.total}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aún no has realizado ninguna compra.</p>
                    )}
                    <button onClick={generarReportePDF}>Generar Reporte de Compras</button>
                </div>
            )}
        </div>
    );
};

export default VerProductosComprados;
