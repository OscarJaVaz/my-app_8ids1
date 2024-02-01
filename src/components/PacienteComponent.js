import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Paciente from './assets/paci.png';
import PacienteImg from './assets/pacii.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PacienteComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    id: 0,
    nombre: '',
    edad: '',
    nss: '',
    domicilio: '',
  });

  const [loading, setLoading] = useState(false);
  const [nssError, setNssError] = useState('');

  const fnObtenerDatos = async () => {
    await axios
      .get('http://127.0.0.1:8000/api/paciente', {
        params: {
          id: location.state.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPaciente(response.data);
        setLoading(false);
      });
  };

  const handleGuardar = (event) => {
    const { name, value } = event.target;

    // Si el nombre es "nss" y la longitud del valor es mayor a 11, recortarlo a 11 dígitos
    if (name === 'nss' && value.length > 11) {
      setPaciente((prevState) => ({
        ...prevState,
        [name]: value.slice(0, 11),
      }));
    } else {
      setPaciente((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (name === 'nss') {
      if (!isValidNss(value)) {
        setNssError('NSS inválido. Debe tener exactamente 11 dígitos.');
      } else {
        setNssError('');
      }
    }
  };

  const handleGuardarDatos = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/paciente/crear', paciente);
    console.log('Datos guardados correctamente');
    setLoading(false);
    navigate('/home');
  };

  const handleEliminar = async () => {
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/paciente/borrar', paciente);
    console.log('Datos eliminados correctamente');
    setLoading(false);
    navigate('/home');
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${PacienteImg})`;
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
  }, [location.state.id]);

  const regresar = () => {
    navigate('/home');
  };

  const camposCompletos = () => {
    return (
      paciente.nombre.trim() !== '' &&
      String(paciente.edad).trim() !== '' &&
      paciente.nss.trim() !== '' &&
      paciente.domicilio.trim() !== ''
    );
  };

  const isValidNss = (nss) => {
    return /^\d{11}$/.test(nss);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pacientes</h1>
      <img src={Paciente} style={styles.image} />

      <div style={styles.formContainer}>
        <div style={styles.formItem}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            name="nombre"
            value={paciente.nombre}
            onChange={handleGuardar}
          />
        </div>

        <div style={styles.formItem}>
          <TextField
            required
            id="outlined-required"
            label="Edad"
            name="edad"
            value={paciente.edad}
            onChange={handleGuardar}
          />
        </div>

        <div style={styles.formItem}>
          <TextField
            required
            id="outlined-required"
            label="NSS"
            name="nss"
            value={paciente.nss}
            onChange={handleGuardar}
            error={!!nssError}
            helperText={nssError}
          />
        </div>

        <div style={styles.formItem}>
          <TextField
            required
            id="outlined-required"
            label="Domicilio"
            name="domicilio"
            value={paciente.domicilio}
            onChange={handleGuardar}
          />
        </div>

        <div style={styles.buttonsContainer}>
          <Button
            variant="contained"
            style={styles.saveButton}
            onClick={handleGuardarDatos}
            startIcon={<SaveIcon />}
            disabled={!camposCompletos() || !!nssError}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            style={styles.deleteButton}
            onClick={handleEliminar}
            startIcon={<DeleteIcon />}
            disabled={!camposCompletos() || !!nssError}
          >
            Eliminar
          </Button>

          <br/><br/>
          <Button
          variant="contained"
          style={styles.backButton}
          onClick={regresar}
          startIcon={<ArrowBackIosIcon />}
        >
          Regresar
        </Button>

        <br/><br/>
        {loading && (
          <Box sx={styles.progressContainer}>
            <LinearProgress />
          </Box>
        )}
        </div>

        
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120vh',
    width: '450px',
    background: '#DEDFEF',
    borderRadius: '50px',
  },

  title: {
    marginBottom: '10px',
  },
  image: {
    height: '18%',
    width: '30%',
  },
  formContainer: {
    listStyleType: 'none',
    textAlign: 'center',
    padding: 0,
  },
  formItem: {
    marginBottom: '20px',
  },
  buttonsContainer: {
    marginBottom: '20px',
  },
  saveButton: {
    backgroundColor: 'green',
    marginRight: '10px',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  backButton: {
    backgroundColor: '#F66E10',
  },
  progressContainer: {
    width: '100%',
  },
};

export default PacienteComponent;
