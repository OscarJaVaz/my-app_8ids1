import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import Swal from 'sweetalert2';
import perfill from './assets/perfill.png';
import cita from './assets/cita1.png';
import salir from './assets/salir.png';
import farmacia from './assets/farmacia.png';
import compras from './assets/compras.png';

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
    const storedUsername = secureLocalStorage.getItem('username');

    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
      setUsernameLoaded(true);

      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/calendariocliente', {
            params: {
              nombre_cliente: storedUsername
            }
          });

          const citasFormatted = response.data.map(cita => ({
            title: 'Cita',
            start: new Date(`${cita.fecha}T${cita.hora}`),
            citaData: cita
          }));

          setCitas(citasFormatted);
        } catch (error) {
          console.error('Error al obtener citas:', error);
        }
      };

      fetchData();

      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Buenos días');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Buenas tardes');
      } else {
        setGreeting('Buenas noches');
      }
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Seguro que quieres cerrar sesión?",
      icon: "question",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        secureLocalStorage.clear();
        setUsername('');
        navigate("/");
      }
    });
  };

  const handleClick = () => {
    navigate("/miperfil", { state: { username } });
  };

  const handleEventClick = (info) => {
    const citaData = info.event.extendedProps.citaData;
    const alertMessage = `
      <div style="text-align: left;">
        <p><strong style="color: #000080;">Paciente:</strong> ${citaData.paciente}</p>
        <p><strong style="color: #000080;">Doctor:</strong> ${citaData.doctor}</p>
        <p><strong style="color: #000080;">Síntomas:</strong> ${citaData.sintomas}</p>
        <p><strong style="color: #000080;">Fecha:</strong> ${info.event.start.toLocaleDateString()}</p>
        <p><strong style="color: #000080;">Hora:</strong> ${info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
    `;
    Swal.fire({
      title: 'Detalles de la cita',
      html: alertMessage,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <h2 style={{ margin: 0, color: 'white', textAlign: 'center', marginTop: 10, textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)' }}>{greeting}, {usernameLoaded ? username : 'Usuario'}</h2>
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
        <a onClick={handleLogout}>
          <img src={salir} alt="Salir" />
          <span>Salir</span>
        </a>
      </div>
      <div className="content">
        <IconButton onClick={toggleMenu} className="toggle-button">
          {menuVisible ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <div style={{ marginTop: '20px' }}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={citas}
            eventClick={handleEventClick}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeClienteComponent;
