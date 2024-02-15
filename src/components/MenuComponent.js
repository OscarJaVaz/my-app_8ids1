import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import paciente from './assets/paciente.png';
import doctor from './assets/doctor.png';
import enfermedad from './assets/enfermedad.png';
import cita from './assets/cita1.png';
import salir from './assets/salir.png';
import agregar from './assets/agregar.png';
import farmacia from './assets/farmacia.png';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const MenuComponent = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);
  const [citas, setCitas] = useState([]);
  const [username, setUsername] = useState('');
  const [usernameLoaded, setUsernameLoaded] = useState(false); // Nuevo estado para verificar si el nombre de usuario se ha cargado correctamente

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/citas');
        setCitas(response.data);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }

    fetchData();

    // Obtener el nombre de usuario
    const storedUsername = secureLocalStorage.getItem('username');
    
    if (storedUsername) {
      setUsername(storedUsername);
      setUsernameLoaded(true);
    }

    // Evitar que el usuario retroceda usando el botón del navegador
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.pathname);
    };

    window.history.pushState(null, '', window.location.pathname); // Reemplazar la entrada actual en el historial
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar" style={{ overflowY: 'auto' }}>
  <h2 style={{ margin: 0 ,color:'white', textAlign:'center'}}>BIENVENIDO</h2>
  <br></br>
  <AccountCircleIcon style={{ marginRight: '5px', color:'white'}} />
  {usernameLoaded ? ( // Verificar si el nombre de usuario se ha cargado correctamente
            <span style={{ color: 'white' }}>{username}</span>
          ) : (
            <span>Loading...</span> // Mostrar un mensaje de carga mientras se carga el nombre de usuario
          )}
        <p></p>
        <a onClick={() => handleClick("/home")}>
          <img src={paciente} alt="Pacientes" />
          <span>Pacientes</span>
        </a>
        <a onClick={() => handleClick("/homedoctor")}>
          <img src={doctor} alt="Doctores" />
          <span>Doctores</span>
        </a>
        <a onClick={() => handleClick("/homeenfermedad")}>
          <img src={enfermedad} alt="Enfermedades" />
          <span>Enfermedades</span>
        </a>
        <a onClick={() => handleClick("/homecita")}>
          <img src={cita} alt="Citas" />
          <span>Citas</span>
        </a>
        <a onClick={() => handleClick("/homeproducto")}>
          <img src={agregar} alt="Productos" />
          <span>Productos</span>
        </a>
        <a onClick={() => handleClick("/farmacia")}>
          <img src={farmacia} alt="Farmacia" />
          <span>Farmacia</span>
        </a>
        <a onClick={() => handleClick("/")}>
          <img src={salir} alt="Salir" />
          <span>Salir</span>
        </a>
      </div>
      <div className="content">
        <IconButton onClick={toggleMenu} className="toggle-button">
          {menuVisible ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            events={citas.map(cita => ({
              title: `${cita.paciente} - ${cita.hora}`,
              date: cita.fecha 
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
