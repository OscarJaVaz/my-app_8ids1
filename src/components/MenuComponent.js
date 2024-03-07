import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const MenuComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(true);
  const [citas, setCitas] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [enfermedadesData, setEnfermedadesData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const correctPassword = 'admin1'; // Cambia esto por tu contraseña

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
        if (showPasswordPrompt) {
          setShowPasswordPrompt(false); // Ocultar el formulario de contraseña si está visible
        } else {
          navigate('/login');
        }
      }
    };

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
  }, [isLoggedIn, location.pathname, showPasswordPrompt]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClick = (path) => {
    if (path === '/homedoctor') {
      // Mostrar alerta para ingresar contraseña
      const enteredPassword = prompt('Ingrese la contraseña para acceder:');
      if (enteredPassword === correctPassword) {
        setAuthenticated(true);
        navigate('/homedoctor');
      } else {
        alert('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres salir?");
    if (confirmLogout) {
      secureLocalStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  const obtenerEnfermedades = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/enfermedades');
      const enfermedades = response.data;
      const enfermedadesLabels = enfermedades.map(enfermedad => enfermedad.nombre ? enfermedad.nombre : 'Nombre Desconocido');
      const enfermedadesCounts = enfermedades.map(enfermedad => enfermedad.citas ? enfermedad.citas.length : 0);
      
      setEnfermedadesData({
        labels: enfermedadesLabels,
        datasets: [{
          label: 'Enfermedades',
          data: enfermedadesCounts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo de las barras
          borderColor: 'rgba(255, 99, 132, 1)', // Color del borde de las barras
          borderWidth: 1
        }]
      });
    } catch (error) {
      console.error('Error al obtener las enfermedades:', error);
    }
  };

  const obtenerCitas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/citas');
      const citasData = response.data;
      setCitas(citasData);
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  useEffect(() => {
    obtenerEnfermedades();
    obtenerCitas();
  }, []);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      setShowPasswordPrompt(false);
      navigate('/homedoctor');
    } else {
      alert('Contraseña incorrecta. Inténtalo de nuevo.');
      setPassword('');
    }
  };

  if (!authenticated && showPasswordPrompt) {
    return (
      <div>
        <h2>Ingrese la contraseña para acceder</h2>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handlePasswordSubmit}>Enviar</button>
      </div>
    );
  }

  if (!isLoggedIn && location.pathname !== '/login') {
    return <Login_Component />;
  }

  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <h2 style={{ margin: 0 ,color:'white', textAlign:'center', marginTop: 10}}>{greeting}, {usernameLoaded ? username : 'Usuario'}</h2>
        <br></br>
        <p></p>
        
        <a onClick={() => handleClick("/homedoctor")}>
          <img src={doctor} alt="Doctores" />
          <span>Doctores</span>
        </a>
        <a onClick={() => handleClick("/homeenfermedad")}>
          <img src={enfermedad} alt="Enfermedades" />
          <span>Sintomas</span>
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
          <span>Generar receta</span>
        </a>
        <a onClick={() => handleClick("/verqr")}>
          <img src={farmacia} alt="ClientesRegistrados" />
          <span>Escanear QR Cita</span>
        </a>
        <a onClick={handleLogout}>
          <img src={salir} alt="Salir" />
          <span>Cerrar sesi&oacute;n</span>
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
        <div className="chart-container">
          {citas.length > 0 && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <IconButton onClick={() => setShowGraph(!showGraph)} aria-label="Ver gráfica">
                  <KeyboardArrowDownIcon style={{ transform: showGraph ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </IconButton>
                <span>Ver gráfica</span>
              </div>
              {showGraph && (
                <VictoryChart
                  domainPadding={20}
                  theme={VictoryTheme.material}
                  width={400}
                  height={200} // Adjusted height to make it smaller
                >
                  <VictoryAxis
                    tickValues={enfermedadesData.labels}
                    style={{
                      tickLabels: { angle: -45, textAnchor: 'end' },
                    }}
                  />
                  <VictoryAxis dependentAxis />
                  <VictoryBar
                    data={enfermedadesData.datasets[0].data.map((count, index) => ({
                      x: enfermedadesData.labels[index],
                      y: count,
                    }))}
                  />
                </VictoryChart>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
