import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cita from './assets/cita1.png';
import salir from './assets/salir.png';
import farmacia from './assets/farmacia.png';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const HomeClienteComponent = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);
  const [citas, setCitas] = useState([]);
  const [username, setUsername] = useState('');
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [greeting, setGreeting] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    setUsername(secureLocalStorage.getItem('username')); 
    setUsernameLoaded(true); 

    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/citas');
        setCitas(response.data);
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    }

    fetchData();

    const storedUsername = secureLocalStorage.getItem('username');
    
    if (storedUsername) {
      setUsername(storedUsername);
      setUsernameLoaded(true);
    }

    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.pathname);
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    // Determinar el saludo según la hora del día
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Buenos días');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Buenas tardes');
    } else {
      setGreeting('Buenas noches');
    }

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
        <h2 style={{ margin: 0 ,color:'white', textAlign:'center'}}> {greeting}, {usernameLoaded ? username : 'Usuario'} </h2>
        <br></br>
        
        <p></p>
        <a onClick={() => handleClick("/farmaciacliente")}>
          <img src={farmacia} alt="/clienteFarmacia"/>
          <span>Comprar en farmacia</span>
        </a>
        <a onClick={() => handleClick("/registrarCita")}>
          <img src={cita} alt="Citas" />
          <span>Registrar cita</span>
        </a>
        <a onClick={() => handleClick("/")}>
          <img src={cita} alt="ver_productos" />
          <span>Ver mis productos comprados</span>
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
      </div>
    </div>
  );
}

export default HomeClienteComponent;
