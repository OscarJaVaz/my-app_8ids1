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
import { CenterFocusStrong } from '@mui/icons-material';

const GenerarRecetaComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [receta, setReceta] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [signatureLineWidth, setSignatureLineWidth] = useState(100); // Ancho inicial de la línea de firma

    const clienteSeleccionado = location.state ? location.state.nombre : '';
    const handleGenerarReceta = () => {
        // Generar el PDF con los datos de la cita
        const doc = new jsPDF();
        const dateText = selectedDate ? selectedDate.toLocaleDateString() : '';

        // Establecer el estilo de fuente y tamaño
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);

        // Membrete con bordes estilo hospital
        doc.setDrawColor(0); // Establecer el color de dibujo en negro
        doc.setFillColor(255, 255, 255); // Establecer el color de relleno en blanco
        doc.roundedRect(5, 5, 200, 280, 3, 3, 'FD'); // Dibujar un rectángulo con esquinas redondeadas y relleno

        // Título "Receta"
        doc.text('Hospital', 10, 25);

        // Datos del cliente
        doc.text(`Paciente: ${clienteSeleccionado}`, 10, 40);

        // Receta en recuadro con bordes estilo hospital
        const recetaY = 60; // Posición vertical inicial para la receta
        const recetaLines = doc.splitTextToSize(receta, 180); // Definir recetaLines antes de su uso

        doc.setDrawColor(0); // Restaurar el color de dibujo en negro
        doc.rect(10, recetaY + 25, 190, recetaLines.length * 10 + 10); // Dibujar un rectángulo sin relleno
        doc.text(recetaLines, 15, recetaY + 35);

        // Fecha
        const adjustedDate = selectedDate ? new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000) : null;
        const selectedDateFormatted = adjustedDate ? `${adjustedDate.getUTCDate()}/${adjustedDate.getUTCMonth() + 1}/${adjustedDate.getUTCFullYear()}` : '';
        const fechaX = 100; // Posición horizontal para la fecha
        const fechaY = recetaY + 35 + recetaLines.length * 10 + 20; // Posición vertical inicial para la fecha
        doc.text(`Fecha: ${selectedDateFormatted}`, fechaX, fechaY);


        // Línea para la firma del doctor
        doc.line(10, fechaY + 10, 10 + signatureLineWidth, fechaY + 10, null, 0.1);

        // Nombre del doctor debajo de la línea
        const doctorNameY = fechaY + 20; // Posición vertical para el nombre del doctor
        doc.text(`Nombre y firma del doctor: ${doctorName}`, 10, doctorNameY);

        // Abrir el PDF en una nueva ventana
        window.open(doc.output('bloburl'), '_blank');

        // Navegar a /menu
        navigate('/menu');
    };



    const handleInputChange = (event) => {
        setReceta(event.target.value);
        setButtonDisabled(!(event.target.value && doctorName && selectedDate));
    };

    const handleDoctorNameChange = (event) => {
        setDoctorName(event.target.value);
        setButtonDisabled(!(event.target.value && receta && selectedDate));

        // Calcular la longitud del nombre del doctor y ajustar el tamaño de la línea de firma
        const nameWidth = event.target.value.length * 5; // Ajuste de tamaño arbitrario
        setSignatureLineWidth(nameWidth < 100 ? 100 : nameWidth); // Establecer un ancho mínimo de 100
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setButtonDisabled(!(date && receta && doctorName));
    };

    const handleBack = () => {
        navigate('/menu');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Generar Receta</h1>
            <div style={styles.clienteContainer}>
                <label>Cliente Seleccionado:</label>
                <div>{clienteSeleccionado}</div>
            </div>
            <div style={styles.doctorContainer}>
                <TextField
                    label="Nombre del doctor"
                    value={doctorName}
                    onChange={handleDoctorNameChange}
                    variant="outlined"
                    margin="dense"
                />
                <div style={{ ...styles.signatureLine, width: `${signatureLineWidth}px` }}></div>
            </div>
            <div style={styles.recetaContainer}>
                <label>Receta:</label>
                <textarea
                    rows="4"
                    cols="50"
                    value={receta}
                    onChange={handleInputChange}
                    placeholder="Escribe la receta aquí..."
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
            <div style={styles.dateInputContainer}>
                <TextField
                    label="Seleccionar fecha"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                    inputProps={{
                        min: new Date().toISOString().split('T')[0], // Evita seleccionar fechas anteriores
                    }}
                />
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
    },
    doctorContainer: {
        marginBottom: '20px',
        position: 'relative',
    },
    signatureLine: {
        position: 'absolute',
        top: '-5px', // Ajuste de posición para que esté más cerca del nombre
        left: '0',
        borderBottom: '1px solid black',
    },
    datePickerContainer: {
        marginBottom: '20px',
    },
    dateInputContainer: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
};

export default GenerarRecetaComponent;
