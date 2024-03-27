import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QRCode from 'react-qr-code';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Cita from './assets/cita2.png';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import html2canvas from 'html2canvas';
import Alert from '@mui/material/Alert';
import withReactContent from 'sweetalert2-react-content';
import ValidarFechasCita from './ValidarFechasCita'; // Importa el componente ValidarFechasCita
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

function RegistrarCitaCliente() {

  
  const navigate = useNavigate();
  const location = useLocation();

  const [cita, setCita] = useState({
    id: 0,
    paciente: '',
    doctor: '',
    sintomas: '',
    fecha: '',
    hora: ''
  });

  const [loading, setLoading] = useState(false);
  const [doctores, setDoctores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [qrData, setQRData] = useState('');
  const [confirmacionVisible, setConfirmacionVisible] = useState(false);
  const [fechaValida, setFechaValida] = useState(true);
  const [descargaHabilitada, setDescargaHabilitada] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false); // Estado para controlar la visibilidad del calendario
  const toggleCalendarVisibility = () => {
    setCalendarVisible(!calendarVisible); // Cambia el estado de calendarVisible al valor opuesto
  };
  const fetchDoctores = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/doctores');
      setDoctores(response.data);
    } catch (error) {
      console.error('Error fetching doctores:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
    }
  };

  const handleGuardar = (event) => {
    const { name, value } = event.target;

    setCita((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  

    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setFechaValida(false);
    } else {
      setFechaValida(true);
    }
  };

  const generarQR = () => {
    const qrCodeData = JSON.stringify(cita);
    setQRData(qrCodeData);
    setOpenModal(true);
  };

  const GuardarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/cita/crear', {
      ...cita,
      codigo_qr: qrData
    });
    console.log('Datos guardados correctamente');
    setLoading(false);
    setConfirmacionVisible(true);
    setTimeout(() => {
      navigate('/cliente');
    }, 2000);
  };

  const regresar = () => {
    navigate('/cliente');
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDownloadQR = () => {
    html2canvas(document.querySelector("#qrCodeContainer")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'codigo_qr.png';
      link.href = imgData;
      link.click();
    });
    setDescargaHabilitada(true);
  };

  useEffect(() => {
    fetchDoctores();
    fetchClientes();
  }, []);

  useEffect(() => {
    if (calendarVisible) {
      MySwal.fire({
        
        html: <ValidarFechasCita />,
        showCloseButton: true,
        showConfirmButton: false,
        focusConfirm: false,
      });
    }
  }, [calendarVisible]);
  const camposCompletos = () => {
    return (
      cita.paciente.trim() !== '' &&
      cita.doctor.trim() !== '' &&
      cita.sintomas.trim() !== '' &&
      cita.fecha.trim() !== '' &&
      cita.hora.trim() !== ''
    );
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const generateHalfHourOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(formattedHour);
      }
    }
    return options;
  };

  return (
    <div>
    <div style={styles.line}></div>
    <div style={styles.container}>
    <br></br>
    <br></br>
    <br></br>
      <h1 style={{ marginBottom: '10px' }}>Citas</h1>
      <p style={{ color: '#878686', marginTop: '3px', fontSize: '20px' }}>Gestione su cita.</p>
      <ul style={{ listStyleType: 'none', textAlign: 'center'}}>
        
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <TextField
            required
            id="paciente"
            label="Ingrese su nombre completo"
            name="paciente"
            value={cita.paciente}
            onChange={handleGuardar}
            InputProps={{
              autoComplete: 'off' // Desactivar autocompletado
            }}
            fullWidth
          />
        </div>
        
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <TextField
            required
            id="doctor"
            label="Doctor"
            name="doctor"
            value={cita.doctor}
            onClick={fetchDoctores} // Fetch doctores al hacer clic en el campo
            select
            SelectProps={{
              native: true,
            }}
            onChange={handleGuardar}
            fullWidth
          >
            <option></option>
            {doctores.map((doctor) => (
              <option key={doctor.id} value={doctor.nombre}>
                {doctor.nombre}
              </option>
            ))}
          </TextField>
        </div>
        
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <TextField
            label="Sintomas que presenta"
            name="sintomas"
            value={cita.sintomas}
            onChange={handleGuardar}
            fullWidth
          />
        </div>
        
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <TextField
            required
            id="outlined-required"
            
            name="fecha"
            type="date"
            value={cita.fecha}
            onChange={handleGuardar}
            inputProps={{ min: getCurrentDate() }} 
            fullWidth
          />
        </div>
        
        <div style={{ marginBottom: '20px', width: '100%' }}>
      <TextField
        required
        id="outlined-required"
        label="Hora"
        name="hora"
        type="time"
        value={cita.hora}
        onChange={handleGuardar}
        inputProps={{
          step: 1800, // 1800 segundos = 30 minutos
          list: 'half-hour-options' // Utiliza la lista de opciones personalizada
        }}
        fullWidth
      />
      <datalist id="half-hour-options">
        {generateHalfHourOptions().map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </div>
        
        <Button
          variant="contained"
          style={{ backgroundColor: 'green', marginRight: '10px' }}
          onClick={generarQR}
          startIcon={<SaveIcon />}
          disabled={!camposCompletos() || !fechaValida}
        >
          Generar QR
        </Button>
        <br /><br />
        <Button
          variant="contained"
          style={{ backgroundColor: '#F66E10' }}
          onClick={regresar}
          startIcon={<ArrowBackIosIcon />}
        >
          Regresar
        </Button>
        <br /><br />
        
        {loading ? <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box> : ''}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '30vw', margin: 'auto', textAlign: 'center' }}>
              <div id="qrCodeContainer">
                <QRCode value={qrData} size={256} />
              </div>
              <div style={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={GuardarDatos} style={{ marginRight: '10px', padding: '5px' }} disabled={!descargaHabilitada}>Registrar cita</Button>
                <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginRight: '10px', padding: '5px' }}>Cerrar</Button>
                <Button variant="contained" color="primary" onClick={handleDownloadQR} style={{ padding: '5px' }}>Descargar QR</Button>
              </div>
            </div>
          </Fade>
        </Modal>
        <Modal
          open={confirmacionVisible}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={confirmacionVisible}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '80vw', margin: 'auto' }}>
              <h2 id="transition-modal-title">¡Cita registrada!</h2>
              <p id="transition-modal-description">¡Tu cita se ha registrada exitosamente!</p>
            </div>
          </Fade>
        </Modal>
        <div style={{ marginBottom: '60px', width: '100%', textAlign: 'center' }}>
    <button onClick={toggleCalendarVisibility}>Consultar dias disponibles</button>
  
</div>
      </ul>
      

    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    
    height: '100vh',
     // Cambiando el fondo a un tono más suave
    
    padding: '20px',
    boxSizing: 'border-box', // Asegurar que el padding no incremente el tamaño total
    overflow: 'hidden', // Para evitar que el contenido se desborde en pantallas pequeñas
  },
  title: {
    marginBottom: '20px', // Espacio adicional debajo del título
  },
  line: {
    width: '100%',
    height: '53px',
    backgroundColor: '#1172D8', 
    
  },
  buttonContainer: {
    marginTop: '20px', // Ajustar el margen superior del botón
    marginBottom: '20px', // Ajustar el margen inferior del botón
  },
  button: {
    backgroundColor: 'red',
  },
};

export default RegistrarCitaCliente;
