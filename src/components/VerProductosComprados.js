import React, { useState, useEffect } from 'react';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import jsPDF from 'jspdf';
import { Button, Card, Container, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

                setUser(storedUsername);
                setPurchasedProducts(response.data);
            } catch (error) {
                console.error('Error al obtener las compras:', error);
            }
        };

        fetchData();
    }, []);

    const generarReportePDF = () => {
        const doc = new jsPDF();
        doc.text('Reporte de Compras', 10, 10);

        purchasedProducts.forEach((compra, index) => {
            const yPos = 20 + index * 10;
            doc.text(`Nombre: ${compra.nombre_producto}, Cantidad: ${compra.cantidad}, Total: ${compra.total}`, 10, yPos);
        });

        window.open(doc.output('dataurlnewwindow'));
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '40px' }}>
            <Card sx={{ p: 3, borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography variant="h4" align="center" gutterBottom style={{ color: '#333' }}>Mis productos comprados</Typography>
                {user && (
                    <div>
                        
                        <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>Aquí tienes un resumen de tus compras:</Typography>
                        {purchasedProducts.length > 0 ? (
                            <Grid container spacing={2}>
                                {purchasedProducts.map((compra, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ p: 2, borderRadius: '15px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                                            <Typography variant="body1" style={{ fontWeight: 'bold' }}>{compra.nombre_producto}</Typography>
                                            <Typography variant="body2">Cantidad: {compra.cantidad}</Typography>
                                            <Typography variant="body2">Total: {compra.total}</Typography>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1" align="center">Aún no has realizado ninguna compra.</Typography>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ShoppingCartIcon />}
                                onClick={generarReportePDF}
                            >
                                Generar Reporte de Compras
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default VerProductosComprados;
