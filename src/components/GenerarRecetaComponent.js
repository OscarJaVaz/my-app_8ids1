import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import jsPDF from 'jspdf';
import secureLocalStorage from 'react-secure-storage';

const GenerarRecetaComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [receta, setReceta] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); // Modificación aquí
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const storedUsername = secureLocalStorage.getItem('username');
    const clienteSeleccionado = location.state ? location.state.nombre : '';
    const handleGenerarReceta = () => {
        // Generar el PDF con los datos de la cita
        const doc = new jsPDF();
        const dateText = selectedDate ? selectedDate.toLocaleDateString() : '';
    
        // Establecer el estilo de fuente y tamaño
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
    
        // Título "Receta"
        doc.text('Consultorio Médico', 105, 10, null, null, 'center');
    
        // Fecha en la esquina superior derecha
        const fechaX = 180; // Posición horizontal para la fecha
        const fechaY = 15; // Posición vertical para la fecha
        doc.text(`Fecha: ${dateText}`, fechaX, fechaY);
    
        // Receta en recuadro con bordes estilo hospital
        const recetaY = 30; // Posición vertical inicial para la receta
        const recetaLines = doc.splitTextToSize(receta, 180); // Definir recetaLines antes de su uso
    
        doc.setDrawColor(0); // Restaurar el color de dibujo en negro
        doc.rect(10, recetaY, 190, recetaLines.length * 10 + 10); // Dibujar un rectángulo sin relleno
        doc.text('Diagnóstico del Paciente', 105, recetaY + 7, null, null, 'center'); // Título "Diagnóstico del Paciente"
        doc.text(recetaLines, 15, recetaY + 15);
    
        // Línea para la firma del doctor
        const signatureLineWidth = 90; // Longitud de la línea de firma
        const signatureLineY = recetaY + recetaLines.length * 10 + 30; // Posición vertical para la línea de la firma
        const pageWidth = doc.internal.pageSize.width; // Ancho de la página
        const signatureLineX = (pageWidth - signatureLineWidth) / 2; // Posición horizontal para centrar la línea de firma
        doc.line(signatureLineX, signatureLineY, signatureLineX + signatureLineWidth, signatureLineY, null, 0.1);
    
        // Nombre del doctor debajo de la línea
        const doctorNameY = signatureLineY + 5; // Posición vertical para el nombre del doctor
        doc.text(`Nombre y firma del doctor: ${storedUsername}`, 105, doctorNameY, null, null, 'center');
    
        // Abrir el PDF en una nueva ventana
        window.open(doc.output('bloburl'), '_blank');
    
        // Navegar a /menu
        navigate('/menu');
    };

    const handleInputChange = (event) => {
        setReceta(event.target.value);
        setButtonDisabled(!(event.target.value && selectedDate));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setButtonDisabled(!(date && receta));
    };

    const handleBack = () => {
        navigate('/menu');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Generar Receta</h1>
            <div style={styles.clienteContainer}>
                <label>Nombre del Paciente:</label>
                <div>{clienteSeleccionado}</div>
            </div>
            <div style={styles.recetaContainer}>
                <label style={styles.recetaLabel}>Diagnostico del paciente:</label>
                <textarea
                    style={styles.recetaTextarea}
                    rows="4"
                    cols="50"
                    value={receta}
                    onChange={handleInputChange}
                    placeholder="Escribe el diagnostico aquí"
                ></textarea>
            </div>

            <div style={styles.datePickerContainer}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Seleccionar fecha"
                        value={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()} // Establece la fecha mínima como la fecha actual
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </LocalizationProvider>
            </div>

            <div style={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenerarReceta}
                    style={{ marginRight: '10px' }}
                    disabled={buttonDisabled}
                >
                    Generar Receta
                </Button>
                <Button variant="contained" onClick={handleBack} startIcon={<ArrowBackIosIcon />}>
                    Volver
                </Button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '78vh',
        width: '900px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '50px',
        padding: '20px',
    },
    title: {
        marginBottom: '20px',
    },
    clienteContainer: {
        marginBottom: '20px',
    },
    recetaContainer: {
        marginBottom: '20px',
        width: '100%',
    },
    recetaLabel: {
        marginBottom: '5px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    recetaTextarea: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        resize: 'vertical', // Permite redimensionar verticalmente solo
        fontSize: '16px',
        lineHeight: '1.5',
    },
    datePickerContainer: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
};

export default GenerarRecetaComponent;
