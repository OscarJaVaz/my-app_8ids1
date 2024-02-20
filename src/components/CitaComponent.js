import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Cita from './assets/cita2.png';
import Cita2 from './assets/citaa.jpg';


function CitaComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cita, setCita] = useState({
    id: 0,
    paciente: '',
    doctor: '',
    enfermedad: '',
    fecha: '',
    hora: ''
  });

  const [loading, setLoading] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);

   // Obtener la fecha de hoy en formato ISO (AAAA-MM-DD)
  const fechaHoy = new Date().toISOString().split('T')[0];
  const fnObtenerDatos = async () => {
    await axios.get('http://127.0.0.1:8000/api/cita', {
      params: {
        id: location.state.id
      }
    }).then((response) => {
      console.log(response.data);
      setCita(response.data);
      setLoading(false);
    });
  };

  const fnObtenerPacientes = async () => {
    await axios.get('http://127.0.0.1:8000/api/pacientes')
      .then((response) => {
        setPacientes(response.data);
      });
  };

  const fnObtenerDoctores = async () => {
    await axios.get('http://127.0.0.1:8000/api/doctores')
      .then((response) => {
        setDoctores(response.data);
      });
  };

  const fnObtenerEnfermedades = async () => {
    await axios.get('http://127.0.0.1:8000/api/enfermedades')
      .then((response) => {
        setEnfermedades(response.data);
      });
  };

  const handleGuardar = (event, value) => {
    const { name, value: fieldValue } = event.target;
    const newValue = value || fieldValue;
    setCita((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const GuardarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/cita/crear', cita);
    console.log('Datos guardados correctamente'); 
    setLoading(false);
    navigate('/homecita');
  };

  const eliminarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/cita/borrar', cita);
    console.log('Datos eliminados correctamente');
    setLoading(false);
    navigate('/homecita');
  };

  const regresar = async () => {
    navigate('/homecita');
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Cita2})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  useEffect(() => {
    console.log('Render');
    fnObtenerPacientes();
    fnObtenerDoctores();
    fnObtenerEnfermedades();
    
    if (location.state.id !== 0) {
      fnObtenerDatos();
    }
  }, []);

  const camposCompletos = () => {
    return (
      cita.paciente.trim() !== '' &&
      cita.doctor.trim() !== '' &&
      cita.enfermedad.trim() !== '' &&
      cita.fecha.trim() !== '' &&
      cita.hora.trim() !== ''
    );
  };

  return (
    <div
    style={{
      margin: 'auto', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '130vh',
      width: '440px',
      background: '#DEDFEF',
      borderRadius: '50px',

    }}
  >
    <h1 style={{ marginBottom: '10px' }}>Citas</h1>
    <img src={Cita} style={{ height: '18%', width: '25%' }} />
      <ul style={{ listStyleType: 'none', textAlign: 'center', padding: 0 }}>
        <p></p>
        <li>
          <Autocomplete
            id="combo-box-demo" 
            options={pacientes}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Paciente"
                name="paciente"
                value={cita.paciente}
                onChange={(event, value) => handleGuardar(event, value?.nombre)}
              />
            )}
            value={pacientes.find((p) => p.nombre === cita.paciente) || null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </li>
        <p></p>
        <li>
          <Autocomplete
            options={doctores}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                id="combo-box-demo"
                label="Doctor"
                name="doctor"
                value={cita.doctor}
                onChange={(event, value) => handleGuardar(event, value?.nombre)}
              />
            )}
            value={doctores.find((d) => d.nombre === cita.doctor) || null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </li>
        <p></p>
        <li>
          <Autocomplete  
            options={enfermedades}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                id="combo-box-demo"
                label="Enfermedad"
                name="enfermedad"
                value={cita.enfermedad}
                onChange={(event, value) => handleGuardar(event, value?.nombre)}
              />
            )}
            value={enfermedades.find((e) => e.nombre === cita.enfermedad) || null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        </li>
        <p></p>
        <li>
      <TextField
        required
        id="outlined-required"
        label="Fecha"
        name="fecha"
        type="date"
        value={cita.fecha}
        onChange={handleGuardar}
        // Establecer el atributo min con la fecha de hoy
        inputProps={{ min: fechaHoy }}
      />
    </li>
        <p></p>
        <li>
          <TextField
            required
            id="outlined-required"
            label="Hora"
            name="hora"
            type="time"
            value={cita.hora}
            onChange={handleGuardar}
          />
        </li>
        <p></p>
        <Button 
        variant="contained" 
        style={{ backgroundColor: 'green', marginRight: '10px' }} 
        onClick={GuardarDatos} 
        startIcon={<SaveIcon />}
        disabled={!camposCompletos()}>
          Guardar
        </Button>

        <Button 
        variant="contained" 
        style={{ backgroundColor: 'red' }} 
        onClick={eliminarDatos} 
        startIcon={<DeleteIcon />}
        disabled={!camposCompletos()}>
          Eliminar
        </Button>

        <br/><br/>
        <Button
          variant="contained"
          style={{ backgroundColor: '#F66E10' }}
          onClick={regresar}
          startIcon={<ArrowBackIosIcon />}
        >
          Regresar
        </Button>

        <br/><br/>
        {loading ? <Box sx={{ width: '100%' }}>
         <LinearProgress />
        </Box> :''}
      </ul>
    </div>
  );
}

export default CitaComponent;
