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
import Enfermedad from './assets/enf.png';
import Enfermedad2 from './assets/enff.jpg';


function EnfermedadComponent() {
  const location = useLocation();

  const [enfermedad, setEnfermedad] = useState({
    id: 0,
    nombre: '',
    gravedad: '',
  });

  const [loading, setLoading] = useState(false);

  const fnObtenerDatos=async()=>{
    await axios.get('http://127.0.0.1:8000/api/enfermedad',{
      params:{
        id: location.state.id
      }
    }).then((response)=>{
      console.log(response.data)
      setEnfermedad(response.data)
      setLoading(false)
    })
  }

  //GUARDAR DATOS
  //Se vueleve a utilizar la setPaciente((prevState)) para recopilar los datos de paciente
  //name represente el nombre del campo y value se utiliza para el nuevo valo ingresado
  const handleGuardar = (event) => {
    const { name, value } = event.target;
    setEnfermedad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const GuardarDatos = async () => {
    setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/enfermedad/crear', enfermedad);
      console.log('Datos guardados correctamente');
    {
      setLoading(false);
      navigate("/homeenfermedad");
    }
  };
  const navigate = useNavigate();
  //ELIMINAR DATOS
  const eliminarDatos = async () => { 
    setLoading(true);
    await axios.post('http://127.0.0.1:8000/api/enfermedad/borrar',enfermedad);
    console.log('Datos eliminados correctamente');
    setLoading(false);
    navigate("/homeenfermedad");
  };

  useEffect(() => {
    console.log('Render');
    if (location.state.id !== 0) {
      fnObtenerDatos();
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Enfermedad2})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  const regresar = async () => {
    navigate('/homeenfermedad');
  };

     // Función para verificar si todos los campos están completos
     const camposCompletos = () => {
      return (
        enfermedad.nombre.trim() !== '' &&
        enfermedad.gravedad.trim() !== ''
      );
    };

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      width: '470px',
      background: '#DEDFEF',
      borderRadius: '50px',
      margin: 'auto', 


    }}
  >
    <h1 style={{ marginBottom: '10px' }}>Enfermedades</h1>
    <img src={Enfermedad} style={{ height: '25%', width: '25%' }} />
      <ul style={{ listStyleType: 'none', textAlign: 'center', padding: 0 }}>
        <p></p>           
        <li>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            name="nombre"
            value={enfermedad.nombre}
            onChange={handleGuardar}
          />
        </li>
        <p></p>
        <li>
          <TextField
            required
            id="outlined-required"
            label="Gravedad"
            name="gravedad"
            value={enfermedad.gravedad}
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

export default EnfermedadComponent;
