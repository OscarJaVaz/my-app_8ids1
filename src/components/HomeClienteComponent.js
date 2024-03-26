// Importaciones necesarias
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
import perfill from './assets/perfill.png';
import compras from './assets/compras.png';
// Definición del componente HomeClienteComponent
const HomeClienteComponent = () => {
  // Hook para la navegación
  const navigate = useNavigate();
  
  // Estados del componente
  const [menuVisible, setMenuVisible] = useState(true);
  const [citas, setCitas] = useState([]);
  const [username, setUsername] = useState('');
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [greeting, setGreeting] = useState('');

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Efecto para cargar los datos del usuario y las citas
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

  // Función para manejar el clic en el botón de perfil
  const handleClick = () => {
    navigate("/miperfil", { state: { username } });
  };
 
  // Renderizado del componente
  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <h2 style={{ margin: 0 ,color:'black', textAlign:'center'}}> {greeting}, {usernameLoaded ? username : 'Usuario'} </h2>
        <br></br>
        
        <p></p>
        <a onClick={() => handleClick()}>
          <img src={perfill} alt="/clienteFarmacia"/>
          <span>Mi Perfil</span>
        </a>
        <p></p>
        <a onClick={() => navigate("/farmaciacliente")}>
          <img src={farmacia} alt="/clienteFarmacia"/>
          <span>Comprar en farmacia</span>
        </a>
        <a onClick={() => navigate("/registrarCita")}>
          <img src={cita} alt="Citas" />
          <span>Registrar cita</span>
        </a>
        <a onClick={() => navigate("/verProductosComprado")}>
          <img src={compras} alt="ver_productos" />
          <span>Ver mis productos comprados</span>
        </a>
        <a onClick={() => navigate("/")}>
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
