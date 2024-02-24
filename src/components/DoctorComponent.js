import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Doctor from './assets/doc.png';
import Doctor2 from './assets/doc2.jpg';


function DoctorComponent() {
  const location = useLocation();


  const [doctor, setDoctor] = useState({
    id: 0,
    nombre: '',
    cedula: '',
    contacto: '',
    domicilio: ''
  });

  const [loading, setLoading] = useState(false);

  const fnObtenerDatos = async () => {
    await axios.get('http://127.0.0.1:8000/api/doctor', {
      params: {
        id: location.state.id
      }
    }).then((response) => {
      console.log(response.data)
      setDoctor(response.data)
      setLoading(false)
    })
  }


  const [nssError, setNssError] = useState('');

  const [isGuardarDisabled, setIsGuardarDisabled] = useState(false);



  //GUARDAR DATOS
  //Se vueleve a utilizar la setPaciente((prevState)) para recopilar los datos de paciente
  //name represente el nombre del campo y value se utiliza para el nuevo valo ingresado
  const handleGuardar = (event) => {
    const { name, value } = event.target;
  
    // Si el nombre es "cedula" y la longitud del valor es mayor a 8, recortarlo a 8 dígitos
    if (name === 'cedula' && value.length > 8) {
      setDoctor((prevState) => ({
        ...prevState,
        [name]: value.slice(0, 8),
      }));
    } else {
      setDoctor((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  
    if (name === 'cedula') {
      if (!isValidCedula(value) || value.length < 7) {
        setNssError('Cédula inválida. Debe tener de 7 a 8 dígitos.');
        setIsGuardarDisabled(true);
      } else {
        setNssError('');
        setIsGuardarDisabled(false);
      }
    }
  };
  

  const isValidCedula = (cedula) => {
    return /^\d{7,8}$/.test(cedula);
  };



  const GuardarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/doctor/crear', doctor);
    console.log('Datos guardados correctamente');
    {
      setLoading(false);
      navigate("/homedoctor");
    }
  };
  const navigate = useNavigate();
  //ELIMINAR DATOS
  const eliminarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/doctor/borrar', doctor);
    console.log('Datos eliminados correctamente');
    setLoading(false);
    navigate("/homedoctor");
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Doctor2})`;
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
    if (location.state.id !== 0) {
      fnObtenerDatos();
    }
  }, []);

  const regresar = async () => {
    navigate('/homedoctor');
  };

  // Función para verificar si todos los campos están completos
  const camposCompletos = () => {
    return (
      doctor.nombre.trim() !== '' &&
      String(doctor.cedula).trim() !== '' &&
      doctor.contacto.trim() !== '' &&
      doctor.domicilio.trim() !== ''
    );
  };


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120vh',
        width: '450px',
        background: '#DEDFEF',
        borderRadius: '50px',
        margin: 'auto',
        marginTop: '20px',
      }}
    >
      <h1 style={{ marginBottom: '10px' }}>Doctores</h1>
      <img src={Doctor} style={{ height: '18%', width: '25%' }} />
      <ul style={{ listStyleType: 'none', textAlign: 'center', padding: 0 }}>
        <p></p>
        <li>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            name="nombre"
            value={doctor.nombre}
            onChange={handleGuardar}
          />
        </li>
        <p></p>
        <li>
          <TextField
            required
            id="outlined-required"
            label="Cedula"
            name="cedula"
            value={doctor.cedula}
            onChange={handleGuardar}
            error={!!nssError}
            helperText={nssError}
          />
        </li>

        <p></p>
        <li>
          <TextField
            required
            id="outlined-required"
            label="Contacto"
            name="contacto"
            value={doctor.contacto}
            onChange={handleGuardar}
          />
        </li>
        <p></p>
        <li>
          <TextField
            required
            id="outlined-required"
            label="Domicilio"
            name="domicilio"
            value={doctor.domicilio}
            onChange={handleGuardar}
          />
        </li>
        <p></p>
        <Button
          variant="contained"
          style={{ backgroundColor: 'green', marginRight: '10px' }}
          onClick={GuardarDatos}
          startIcon={<SaveIcon />}
          disabled={!camposCompletos() || isGuardarDisabled} >
          Guardar
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: 'red' }}
          onClick={eliminarDatos}
          startIcon={<DeleteIcon />}
          disabled={!camposCompletos()} >
          Eliminar
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
      </ul>
    </div>

  );
}
export default DoctorComponent;
