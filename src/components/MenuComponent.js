import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import pacientes from './assets/pacientes.png';
import doctor from './assets/doctor.png';
import enfermedad from './assets/enfermedad.png';
import cita from './assets/cita1.png';
import qr from './assets/qr.png';
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
import Swal from 'sweetalert2'

// Función para normalizar los síntomas
const normalizarSintoma = (sintoma) => {
  const sinonimosDolorDeCabeza = ["dolor de cabeza", "cefalea", "migraña", "jaqueca", "dolor en la cabeza", "dolor craneal", "dolor frontal", "dolor de sien", "dolor de cabeza persistente", "dolor agudo en la cabeza", "cefalea tensional", "molestia en la cabeza", "malestar en la cabeza", "dolor en la frente", "dolor punzante en la cabeza", "dolor de cabeza palpitante", "dolor de cabeza recurrente", "dolor de cabeza intenso", "cefalea vascular", "cefalea mixta"]; // Sinónimos para dolor de cabeza
  const sinonimosFiebre = ["fiebre", "calentura", "temperatura alta", "febrícula", "aumento de temperatura corporal", "fiebre alta", "fiebre persistente", "fiebre intermitente", "fiebre continua", "fiebre recurrente", "aumento de la temperatura", "fiebre febril", "fiebre elevada", "fiebre súbita", "fiebre prolongada", "fiebre constante", "fiebre periódica", "fiebre crónica", "fiebre subfebril", "fiebre moderada"]; // Sinónimos para fiebre
  const sinonimosDolorDeEstomago = ["dolor de estómago", "malestar estomacal", "nauseas", "vómitos", "malestar abdominal", "dolor en el vientre", "dolor en el estómago", "molestias gástricas", "dolor agudo en el estómago", "dolor abdominal persistente", "malestar en el abdomen", "sensación de náuseas", "dolor punzante en el estómago", "náuseas matutinas", "dolor de estómago recurrente", "sensación de ardor en el estómago", "sensación de plenitud estomacal", "náuseas nocturnas", "dolor de estómago constante", "dolor de barriga"]; // Sinónimos para dolor de estómago
  const sinonimosTos = ["tos", "tos seca", "tos persistente", "tos crónica", "tos aguda", "tos irritativa", "tos fuerte", "tos constante", "tos nocturna", "tos continua", "tos productiva", "tos con flema", "tos con moco", "tos con flemas", "tos ronca", "tos con secreción", "tos con expectoración", "tos persistente seca", "tos con esputo", "tos nocturna persistente", "tos nocturna crónica"]; // Sinónimos para tos
  const sinonimosDolorDeGarganta = ["dolor de garganta", "irritación de garganta", "garganta irritada", "dolor al tragar", "dolor al hablar", "dolor al tragar saliva", "dolor en la garganta al comer", "dolor en la garganta al tragar", "dolor en la garganta al hablar", "dolor punzante en la garganta", "dolor de garganta constante", "dolor de garganta recurrente", "dolor de garganta agudo", "dolor de garganta crónico", "dolor de garganta intenso", "dolor de garganta punzante", "dolor en la faringe", "dolor faríngeo", "molestia en la garganta", "sensación de cuerpo extraño en la garganta"]; // Sinónimos para dolor de garganta
  const sinonimosFatiga = ["fatiga", "cansancio", "agotamiento", "sensación de cansancio", "sensación de agotamiento", "sensación de fatiga", "agotamiento físico", "cansancio extremo", "fatiga persistente", "fatiga crónica", "fatiga constante", "fatiga diaria", "fatiga recurrente", "cansancio continuo", "cansancio generalizado", "cansancio profundo", "cansancio físico", "agotamiento mental", "fatiga matutina", "fatiga nocturna", "fatiga severa"]; // Sinónimos para fatiga
  const sinonimosCongestionNasal = ["congestión nasal", "nariz congestionada", "nariz tapada", "obstrucción nasal", "resfriado nasal", "nariz obstruida", "nariz taponada", "nariz rellena", "nariz llena", "nariz cerrada", "nariz bloqueada", "nariz atascada", "nariz llena de moco", "nariz llena de secreción", "nariz llena de flujo", "nariz llena de mucosidad", "nariz llena de catarrro", "nariz llena de fluido", "nariz llena de sustancia", "nariz llena de mucus", "nariz llena de descarga"]; // Sinónimos para congestión nasal
  const sinonimosDiarrea = ["diarrea", "deshidratación", "malestar intestinal", "heces líquidas", "heces acuosas", "heces sueltas", "heces blandas", "heces liquidas", "heces acuosas", "heces sueltas", "heces blandas", "heces aguadas", "heces pastosas", "heces aguadas", "heces pastosas", "heces con moco", "heces con sangre", "heces con pus", "heces frecuentes", "diarrea persistente", "diarrea aguda"]; // Sinónimos para diarrea
  const sinonimosDolorDeEspalda = ["dolor de espalda", "lumbalgia", "molestia lumbar", "dolor en la espalda", "dolor lumbar", "dolor dorsal", "dolor en la columna", "dolor en la parte baja de la espalda", "dolor en la región lumbar", "molestia en la espalda", "molestia dorsal", "molestia en la columna", "molestia en la región lumbar", "dolor punzante en la espalda", "dolor agudo en la espalda", "dolor en la espalda baja", "dolor de espalda crónico", "dolor de espalda persistente", "dolor de espalda agudo", "dolor de espalda punzante"]; // Sinónimos para dolor de espalda
  const sinonimosMareos = ["mareos", "vértigo", "sensación de giro", "sensación de inestabilidad", "sensación de desequilibrio", "sensación de mareo", "sensación de dar vueltas", "sensación de movimiento", "sensación de desmayo", "sensación de tambaleo", "sensación de vértigo", "sensación de aturdimiento", "sensación de desorientación", "sensación de balanceo", "sensación de inestabilidad", "sensación de flotación", "sensación de mareo ligero", "sensación de mareo intenso", "sensación de mareo persistente", "sensación de mareo ocasional"]; // Sinónimos para mareos



  for (let sinonimos of [sinonimosDolorDeCabeza, sinonimosFiebre, sinonimosDolorDeEstomago,
    sinonimosTos, sinonimosDolorDeGarganta, sinonimosFatiga, sinonimosCongestionNasal,
    sinonimosDiarrea, sinonimosDolorDeEspalda, sinonimosMareos]) { // Agregar más listas aquí
    const sinonimoEncontrado = sinonimos.find(sinonimo =>
      sintoma.toLowerCase().includes(sinonimo)
    );
    if (sinonimoEncontrado) {

      return sinonimoEncontrado;
    }
  }


  return sintoma;
};




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
  const [sintomas, setSintomas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
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
      setGreeting('Buenos días Doctor');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Buenas tardes Doctor');
    } else {
      setGreeting('Buenas noches Doctor');
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
      Swal.fire({
        title: "Contacte al administrador para acceder:",
        input: "password",
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value) {
            return "¡Debes ingresar una contraseña!";
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value === correctPassword) {
            setAuthenticated(true);
            navigate('/homedoctor');
          } else {
            Swal.fire({
              icon: "error",
              title: "Contraseña incorrecta",
              text: "Por favor, inténtalo de nuevo."
            });
          }
        }
      });
    } else {
      navigate(path);
    }
  };
  

  const handleLogout = () => {
    Swal.fire({
      title: "¿Seguro que quieres cerrar sesión?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        secureLocalStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
      }
    });
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

      const sintomasNormalizados = citasData.map(cita => normalizarSintoma(cita.sintomas ? cita.sintomas : 'Síntomas Desconocidos'));
      setSintomas(sintomasNormalizados);

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

  const showCitaDetails = (info) => {
    const cita = info.event.extendedProps.cita; // Obtener los detalles de la cita del evento del calendario
    Swal.fire({
      title: "Detalles de la cita",
      html: `
        <div>
          <p><strong>Paciente:</strong> ${cita.paciente}</p>
          <p><strong>Fecha:</strong> ${cita.fecha}</p>
          <p><strong>Hora:</strong> ${cita.hora}</p>
          <p><strong>Síntomas:</strong> ${cita.sintomas}</p>
        </div>
      `,
      
    });
  };
  


  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar" style={{ overflowY: 'auto' }}>
        <h2 style={{ margin: 0, color: 'white', textAlign: 'center', marginTop: 10 }}>{greeting}, {usernameLoaded ? username : 'Usuario'}</h2>
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
        
        <a onClick={() => handleClick("/homeproducto")}>
          <img src={agregar} alt="Productos" />
          <span>Productos</span>
        </a>
        <a onClick={() => handleClick("/farmacia")}>
          <img src={farmacia} alt="Farmacia" />
          <span>Farmacia</span>
        </a>
        <a onClick={() => handleClick("/Verclientes")}>
          <img src={pacientes} alt="ClientesRegistrados" />
          <span>Citas/Pacientes</span>
        </a>
        <a onClick={() => handleClick("/verqr")}>
          <img src={qr} alt="ClientesRegistrados" />
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
        <div className="calendar-graph-container">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
              events={citas.map(cita => ({
                title: `${cita.paciente} - ${cita.hora}`,
                date: cita.fecha,
                cita: cita // Pasar los detalles de la cita como propiedad extendida del evento
              }))}
              eventClick={showCitaDetails} // Manejador de eventos para mostrar los detalles de la cita al hacer clic en un evento
            />
          </div>
          <div className="chart-container" style={{ overflowY: 'hidden' }}>
            <div style={{ textAlign: 'center', marginBottom: '1px' }}>
              
              <span style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#333', // Color del texto
                textTransform: 'uppercase', // Convertir texto a mayúsculas
                borderBottom: '2px solid #007bff', // Línea inferior azul
                paddingBottom: '2px', // Espacio entre el texto y la línea
              }}>Síntomas más recurrentes</span>

            </div>

            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              width={400}
              height={300} 
            >
              <VictoryAxis
                tickValues={sintomas} 
                style={{
                  tickLabels: { angle: -45, textAnchor: 'end' },
                }}
              />
              <VictoryAxis dependentAxis />
              <VictoryBar
                data={citas.map(cita => {
                  const sintomasCita = normalizarSintoma(cita.sintomas ? cita.sintomas : 'Síntomas Desconocidos');
                  return { x: sintomasCita, y: 1 };
                }).reduce((acc, item) => {
                  const existingSintoma = acc.find(i => i.x === item.x);
                  if (existingSintoma) {
                    existingSintoma.y += 1;
                  } else {
                    acc.push(item);
                  }
                  return acc;
                }, [])}
              />
            </VictoryChart>

            
          </div>

        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
