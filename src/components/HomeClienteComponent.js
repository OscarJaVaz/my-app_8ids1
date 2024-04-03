import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import perfill from './assets/perfill.png';
import cita from './assets/cita1.png';
import salir from './assets/salir.png';
import farmacia from './assets/farmacia.png';
import compras from './assets/compras.png';
import Encuesta from './Encuesta'; // Importa el componente de Encuesta
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

const HomeClienteComponent = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [encuestaOpen, setEncuestaOpen] = useState(false); // Estado para controlar la apertura del componente de encuesta
  const [experiencia, setExperiencia] = useState(''); // Estado para almacenar la calificación de experiencia
  const [citas, setCitas] = useState([]);

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


  

  // Función para cerrar el componente de encuesta y mostrar un mensaje de agradecimiento
  const handleCloseEncuesta = () => {
    setEncuestaOpen(false);
    if (experiencia) {
      alert('Gracias por tus calificaciones. ¡Hasta luego!');
    } else {
      alert('Por favor, califica tu experiencia antes de enviar.');
    }
  };

  // Función para manejar el cambio en el campo de calificación de experiencia
  const handleExperienciaChange = (event) => {
    setExperiencia(event.target.value);
  };

  // Datos ficticios relacionados con la salud
  const datosSalud = [
    {
      titulo: 'Sabías que...',
      contenido: 'El ejercicio regular puede reducir el riesgo de enfermedades cardíacas, diabetes tipo 2 y algunos tipos de cáncer.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'La falta de sueño puede afectar negativamente a tu salud mental y física, aumentando el riesgo de depresión, obesidad y enfermedades del corazón.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'Una dieta equilibrada rica en frutas, verduras, granos enteros y proteínas magras puede ayudar a prevenir enfermedades crónicas como la diabetes y la hipertensión.'
    }
  ];

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
          {/* Encuesta */}
          {encuestaOpen && (
            <div>
              <h3>Califica tu experiencia:</h3>
              <input type="text" value={experiencia} onChange={handleExperienciaChange} />
              <button disabled={!experiencia} onClick={handleCloseEncuesta}>Enviar</button>
            </div>
          )}
          {/* Datos sobre salud */}
          <div>
            <h3>Datos sobre Salud</h3>
            {datosSalud.map((dato, index) => (
              <Card key={index} style={{ margin: '10px', minWidth: '200px' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {dato.titulo}
                  </Typography>
                  <Typography variant="body2">
                    {dato.contenido}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeClienteComponent;
