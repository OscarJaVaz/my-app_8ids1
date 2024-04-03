import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'; // Importa FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Importa el plugin dayGrid

const HomeClienteComponent = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [usernameLoaded, setUsernameLoaded] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [encuestaOpen, setEncuestaOpen] = useState(false); // Estado para controlar la apertura del componente de encuesta
  const [experiencia, setExperiencia] = useState(''); // Estado para almacenar la calificación de experiencia
  const [citas, setCitas] = useState([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0); // Estado para almacenar el índice del dato actual a mostrar

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

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar al siguiente dato cuando se alcance el último índice, volver al primero
      setCurrentDataIndex((prevIndex) => (prevIndex === datosSalud.length - 1 ? 0 : prevIndex + 1));
    }, 10000); // Intervalo de 10 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte o vuelva a renderizarse
  }, [currentDataIndex]);

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

  const handleOpenEncuesta = () => {
    setEncuestaOpen(true);
  };

  const handleCancelEncuesta = () => {
    setEncuestaOpen(false);
  };

  const handleCloseEncuesta = () => {
    setEncuestaOpen(false);
    if (experiencia) {
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por tus opiniones!',
        text: '¡Hasta luego!',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Danos tu opinion!',
        text: 'Por favor, escribe tus opiniones antes de enviar.',
      });
    }
  };

  const handleExperienciaChange = (event) => {
    setExperiencia(event.target.value);
  };

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
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'Beber suficiente agua durante el día puede ayudar a mantener tu cuerpo hidratado, regular la temperatura corporal y eliminar toxinas.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'El estrés crónico puede tener efectos negativos en tu sistema inmunológico, aumentando la susceptibilidad a enfermedades e infecciones.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'Tomarse un tiempo para relajarse y practicar técnicas de respiración profunda puede reducir el estrés y mejorar la salud mental.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'La exposición excesiva al sol sin protección puede aumentar el riesgo de cáncer de piel y causar envejecimiento prematuro de la piel.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'Mantener una postura adecuada puede ayudar a prevenir dolores de espalda y cuello, así como mejorar la salud de la columna vertebral.'
    },
    {
      titulo: '¿Sabías que...',
      contenido: 'Practicar hábitos de higiene adecuados, como lavarse las manos regularmente, puede ayudar a prevenir la propagación de enfermedades infecciosas.'
    }
  ];

  const [showFAQ, setShowFAQ] = useState(false); // Estado para controlar la visibilidad de las preguntas frecuentes

const handleToggleFAQ = () => {
  setShowFAQ(!showFAQ); // Cambiar el estado para mostrar u ocultar las preguntas frecuentes
};

// Preguntas frecuentes
const preguntasFrecuentes = [
  {
    pregunta: '¿Cómo puedo registrar una cita?',
    respuesta: 'Puedes registrar una cita haciendo clic en la opción "Registrar cita" en el menú lateral.'
  },
  {
    pregunta: '¿Dónde puedo ver los productos que he comprado?',
    respuesta: 'Puedes ver los productos que has comprado haciendo clic en la opción "Ver mis productos comprados" en el menú lateral.'
  },
  {
    pregunta: '¿Dónde puedo ver mis datos de mi perfil?',
    respuesta: 'Puedes ver los datos de tu perfil haciendo clic en la opción "Mi Perfil" en el menú lateral.'
  },
  // Agrega más preguntas y respuestas si es necesario
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
        <button onClick={handleOpenEncuesta}>Abrir Encuesta</button>
      </div>
      <div className="content">
        <IconButton onClick={toggleMenu} className="toggle-button">
          {menuVisible ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {encuestaOpen && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Danos tu opinion:</h3>
              <input
                type="text"
                value={experiencia}
                onChange={handleExperienciaChange}
                style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px' }}
              />
              <button
                disabled={!experiencia}
                onClick={handleCloseEncuesta}
                style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#1172D8', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                Enviar
              </button>
              <button onClick={handleCancelEncuesta}>Cancelar</button>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Card key={currentDataIndex} style={{ maxWidth: 300, margin: '10px', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h5" component="h2" style={{ marginBottom: '10px', color: '#1172D8' }}>
                  {datosSalud[currentDataIndex].titulo}
                </Typography>
                <Typography variant="body2" component="p" style={{ fontSize: '20px', lineHeight: '1.5' }}>
                  {datosSalud[currentDataIndex].contenido}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
      {/* Botón para mostrar u ocultar las preguntas frecuentes */}
      <button onClick={handleToggleFAQ} style={{ padding: '8px 16px', borderRadius: '5px', backgroundColor: '#1172D8', color: '#fff', border: 'none', cursor: 'pointer' }}>
        {showFAQ ? 'Ocultar Preguntas Frecuentes' : 'Mostrar Preguntas Frecuentes'}
      </button>
      {/* Contenedor de las preguntas frecuentes */}
      {showFAQ && (
        <div style={{ marginTop: '20px', textAlign: 'left', justifyContent: 'center' }}>
          <h2>Preguntas Frecuentes</h2>
          {/* Mapeo de las preguntas frecuentes */}
          {preguntasFrecuentes.map((pregunta, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <h3>{pregunta.pregunta}</h3>
              <p>{pregunta.respuesta}</p>
            </div>
          ))}
        </div>
      )}
    </div>
      </div>
    </div>
  );
}

export default HomeClienteComponent;
