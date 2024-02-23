import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import Login_Component from './Login_Component';

const MenuComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(true);
  const [citas, setCitas] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameLoaded, setUsernameLoaded] = useState(false);

  useEffect(() => {
    setUsername(secureLocalStorage.getItem('username')); 
    setUsernameLoaded(true);

    // Verificar si el usuario está logueado
    const storedUsername = secureLocalStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }

    // Evitar que el usuario retroceda usando el botón del navegador si no está logueado
    const handleBackButton = (event) => {
      if (!isLoggedIn && location.pathname !== '/login') {
        event.preventDefault();
        navigate('/login');
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [isLoggedIn, location.pathname]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres salir?");
    if (confirmLogout) {
      secureLocalStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  if (!isLoggedIn && location.pathname !== '/login') {
    return <Login_Component />;
  }

  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <h2 style={{ margin: 0 ,color:'white', textAlign:'center'}}>BIENVENIDO</h2>
        <br></br>
        <AccountCircleIcon style={{ marginRight: '5px', color:'white'}} />
        {usernameLoaded ? (
          <span style={{ color: 'white' }}>{username}</span>
        ) : (
          <span>Loading...</span>
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
        <a onClick={() => handleClick("/Verclientes")}>
          <img src={farmacia} alt="ClientesRegistrados" />
          <span>Ver usuarios registrados</span>
        </a>
        <a onClick={() => handleClick("/verqr")}>
          <img src={farmacia} alt="ClientesRegistrados" />
          <span>Ver Qr</span>
        </a>
        <a onClick={handleLogout}>
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
