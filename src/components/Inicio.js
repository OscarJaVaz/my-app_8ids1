import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import fondo from '../components/assets/fondo2.jpg';
import fondo2 from '../components/assets/fondo5.png';
import logo1 from '../components/assets/logo1.png';
import Modal from '@mui/material/Modal';
import Slider from 'react-slick'; // Importa el componente Slider de react-slick
import 'slick-carousel/slick/slick.css'; // Importa los estilos de react-slick
import 'slick-carousel/slick/slick-theme.css'; // Importa los estilos del tema de react-slick
import './ChatButton';
import './cards.css';
import './footer.css';
import './gridcards.css';
import { ContactPage } from '@mui/icons-material';
import ChatButton from './ChatButton';
import { CardGroup, CardBody, CardTitle, CardText, CardImg, CardSubtitle } from 'reactstrap';





const NavigationButton = ({ label, onClick, icon, fontSize }) => (
  <Button
    variant="outline"
    style={{
      marginRight: '60px',
      fontWeight: 'bold',
      fontSize: fontSize || '30px'
    }}
    onClick={onClick}
    startIcon={React.cloneElement(icon, { style: { fontSize: fontSize || '30px' } })}
  >
    {label}
  </Button>
);

// Define la función CambioImagenes fuera del componente Inicio
const imagenes = [
  "https://st3.depositphotos.com/13812178/18384/i/450/depositphotos_183843248-stock-photo-friendly-female-doctor.jpg",
  "https://img.freepik.com/fotos-premium/doctor-ayudando-su-paciente_232070-2062.jpg",
  "https://cdn.aarp.net/content/dam/aarp/health/conditions_treatments/2018/08/1140-human-touch-esp.jpg"
];

  
const Inicio = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [imagenIndex, setImagenIndex] = useState(0);
  

  useEffect(() => {
    // Verificar si el usuario ya ha aceptado el aviso de privacidad
    const hasAcceptedPrivacy = localStorage.getItem('acceptedPrivacy');
    if (!hasAcceptedPrivacy) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImagenIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    // Registrar que el usuario ha aceptado el aviso de privacidad
    localStorage.setItem('acceptedPrivacy', 'true');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const CambioImagenes = () => {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <img
          src={imagenes[imagenIndex]}
          alt={`Imagen ${imagenIndex + 1}`}
          style={{
            width: '100%',
            marginBottom: '10px'
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%)',
            pointerEvents: 'none' 
          }}
        />
      </div>
    );
  };

  return (
    <>

<header style={{ backgroundColor: '#1172D8', padding: '20px', color: 'white', textAlign: 'center', fontSize: '24px', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 0, zIndex: 1000 }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo1} alt="Logo" style={{ width: '80px', marginRight: '20px', borderRadius: '50%' }} />
      <h1 className='animate-charcter' style={{ margin: 0, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Consultech</h1>
    </div>
    <nav>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center' }}>
        <NavigationButton label='Iniciar sesión' onClick={() => handleNavigation('/login')} icon={<PersonIcon />} fontSize="15px" />
        <NavigationButton label='Contacto' onClick={() => handleNavigation('/contacto')} icon={<ContactPage />} fontSize="15px" />
      </ul>
    </nav>
  </div>
</header>



      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="aviso-privacidad-title"
        aria-describedby="aviso-privacidad-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ backgroundColor: 'black', padding: '20px', width: '80%', borderRadius: '10px', textAlign: 'center', position: 'relative', zIndex: 9999, color: 'white' }}>
          <h1>Aviso de Privacidad</h1>
          <p>En nuestro Consultorio, nos tomamos muy en serio la confidencialidad y seguridad de su información personal. Nos comprometemos a proteger y resguardar cualquier dato que nos proporcione.</p>
  <p>Nuestro compromiso se basa en la transparencia y el respeto hacia usted. Por ello, le informamos que recopilamos información personal únicamente cuando usted decide proporcionárnosla de manera voluntaria, como su nombre, dirección de correo electrónico y número de teléfono.</p>
  <p>La información que recopilamos tiene como finalidad principal proporcionarle nuestros servicios de manera eficiente, mejorar su experiencia con nuestra empresa y mantener una comunicación efectiva con usted, relacionada con su interacción en nuestro consultorio.</p>
  <p>Es importante destacar que utilizamos cookies con el fin de mejorar su experiencia de usuario en nuestro sitio web, asegurando así un servicio personalizado y adaptado a sus necesidades.</p>
  <p>Agradecemos su confianza y estamos disponibles para cualquier consulta adicional que pueda surgirle.</p>
  <p>Atentamente,</p>
  <p>Equipo del Consultorio</p>
          <p>Fecha de última actualización: [27/03/2024]</p>
          <Button variant="contained" onClick={handleCloseModal}>Aceptar</Button>
        </div>
      </Modal>

      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', paddingTop: '80px', backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Slider
          dots={true}
          infinite={true}
          speed={1000}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          style={{ width: '100%', height: 'calc(100% - 80px)' }}
        >
          <div>
            <img src={fondo} alt="Fondo 1" style={{ width: '100%', height: '100%' }} />
          </div>
          <div>
            <img src={fondo2} alt="Fondo 2" style={{ width: '100%', height: '100%' }} />
          </div>
        </Slider>

        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: '5%', width: '100%' }}>
          <article class="card">
            <img
              class="card__background"
              src="https://www.dvd-dental.com/blogodontomecum/wp-content/uploads/2022/05/iStock-1241455947.jpg"
              alt="Atencion personalizada"
              width="1920"
              height="2193"
            />
            <div class="card__content | flow">
              <div class="card__content--container | flow">
                <h2 class="card__title">Atención Personalizada</h2>
              </div>
            </div>
          </article>

          <article class="card">
            <img
              class="card__background"
              src="https://btlcenter.com/es/wp-content/uploads/2017/09/7-consejos-para-atraer-mas-pacientes-clinica-dental.jpg"
              alt="Atencion personalizada"
              width="1920"
              height="2193"
            />
            <div class="card__content | flow">
              <div class="card__content--container | flow">
                <h2 class="card__title">Enfocados a ti</h2>
              </div>
            </div>
          </article>

          <article class="card">
            <img
              class="card__background"
              src="https://www.dvd-dental.com/blogodontomecum/wp-content/uploads/2022/05/iStock-1164023823-1024x684.jpg"
              alt="Atencion personalizada"
              width="1920"
              height="2193"
            />
            <div class="card__content | flow">
              <div class="card__content--container | flow">
                <h2 class="card__title">Tu salud, nuestro enfoque</h2>
              </div>
            </div>
          </article>

          <article class="card">
            <img
              class="card__background"
              src="https://empresasecooperativas.com.br/wp-content/uploads/2019/04/clinica-m%C3%A9dica-1024x535.jpg"
              alt="Atencion personalizada"
              width="1920"
              height="2193"
            />
            <div class="card__content | flow">
              <div class="card__content--container | flow">
                <h2 class="card__title">Experiencia en cuidado de la salud</h2>
              </div>
            </div>
          </article>
        </div>
      </div>
      <br></br>
      <br></br>

      {/* Primer div */}
<article style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
  <Card style={{ width: '18rem' }}>
    <CardImg top width="50%" src="https://t4.ftcdn.net/jpg/02/29/53/11/360_F_229531197_jmFcViuzXaYOQdoOK1qyg7uIGdnuKhpt.jpg" alt="Card image cap" style={{ textAlign: 'center' }} />
    <CardBody>
      <CardText style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#1172D8', textAlign: 'center' }}>
        Médicos altamente especializados
      </CardText>
    </CardBody>
  </Card>
  <Card style={{ width: '18rem' }}>
    <CardImg top width="50%" src="https://img.freepik.com/vector-gratis/simbolo-familiar-diseno-plano_23-2149282971.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708300800&semt=ais" alt="Card image cap" style={{ textAlign: 'center' }} />
    <CardBody>
      <CardText style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#1172D8', textAlign: 'center' }}>
        Miles de familias beneficiadas
      </CardText>
    </CardBody>
  </Card>
  <Card style={{ width: '18rem' }}>
    <CardImg top width="53%" src="https://www.enriquedans.com/wp-content/uploads/2021/01/Vaccine-icon.jpg" alt="Card image cap" style={{ textAlign: 'center' }} />
    <CardBody>
      <CardText style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: 'bold', color: '#1172D8', textAlign: 'center' }}>
        Campañas de vacunación
      </CardText>
    </CardBody>
  </Card>
</article>

<br></br>
<br></br>

<Card style={{ maxWidth: '800px', margin: 'auto' }}>
  <CardBody style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
    <article style={{ width: '60%' }}>
    <CardText style={{ fontFamily: 'Lato, sans-serif', fontSize: '16px', color: '#1172d8', borderBottom: '1px solid #1172d8', fontWeight: 'bold' }}>
  Por qué el Consultorio Medico
</CardText>

      <CardText style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333', textAlign: 'justify' }}>
        Somos un consultorio médico comprometido con el bienestar y la seguridad de nuestros pacientes a través de estándares médicos de excelencia. Nos destacamos por nuestra solidaridad e inclusión, dedicando recursos a iniciativas que mejoran la salud en México.
      </CardText>
    </article>
    <div style={{ width: '40%', marginLeft: '20px' }}>
        {CambioImagenes()}
      </div>
  </CardBody>
</Card>
<br></br>

  <h1 style={{textAlign: 'center', color: '#1172d8'}}>Testimoniales</h1>
  <br></br>
<section className="nombre-de-clase-personalizado-section">
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Raul</h2>
        <p>Excelente consultorio, muy accesible.</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://masmorbomenosriesgo.es/wp-content/uploads/2019/07/Testimonio-Eric-740x427.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Angelica</h2>
        <p>Atencion de gran calidad, recomendable.</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://blog.hubspot.es/hubfs/pa%CC%81ginas-testimoniales.png"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Veronica</h2>
        <p>Quedé encantaDA del consultorio</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://www.wowcx.com/wp-content/uploads/2021/12/Poder_testimonios_blog_wow.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Federico</h2>
        <p>Muy facil para agendar una cita</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN13zrYQZVASAmgWheDMacZNLPqXcAg0f0LIskDg5C5VavwTP7oL7lWqhvYA7kTvXS2Ws&usqp=CAU"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Victoria</h2>
        <p>Hay doctores de gran calidad.</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://www.contrareplica.mx/uploads/galerias/normal/93dabd5b458063670d4be2082049d426.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Diego</h2>
        <p>Este consultorio es el mejor de todos</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://www.contrareplica.mx/uploads/galerias/normal/d51adde6198cd2e5a32ddda82d2ee9b6.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Oscar</h2>
        <p>Los horarios flexibles e incluso si hay una emergencia despues del horario laboral te atienden sin problemas</p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://tecnofanatico.com/wp-content/uploads/2019/02/thispersondoesnotexist.com_.jpeg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Vivian</h2>
        <p>El registro al consultorio es muy facil de hacer. </p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://mochileros.org/nelson/wp-content/uploads/2020/04/esta-persona-no-existe-8.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Fernanda</h2>
        <p>Con el chatbot me resolvió mis dudas. </p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://www.llermania.com/mac/wp-content/uploads/2022/05/no-existe.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Rúben</h2>
        <p>Puedo agendar mi cita sin necesidad de recurrir al consultorio presencialmente. </p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://f.rpp-noticias.io/2019/02/15/753300descarga-11jpg.jpg"
      />
    </article>
    <article className="nombre-de-clase-personalizado-article">
      <figure className="nombre-de-clase-personalizado-figure">
        <h2>Kevin</h2>
        <p>Pude comprar mis medicamentos en linea desde este consultorio. </p>
      </figure>
      <img
        className="nombre-de-clase-personalizado-img"
        alt=""
        src="https://i.pinimg.com/originals/3f/56/3f/3f563f80bef17bcc5db82ca43ec42969.jpg"
      />
    </article>
    
    {/* Resto de los artículos */}
  </section>


      <div class="pg-footer">
        <footer class="footer">
          <svg class="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path class="footer-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"></path>
          </svg>
          <div class="footer-content">
            <div class="footer-content-column">
              <div class="footer-logo">

              </div>
              <div class="footer-menu">
                <h2 class="footer-menu-name">Contacto</h2>
                <ul id="menu-get-started" class="footer-menu-list">
                  <h4>5619019251</h4>
                  <br></br>
                  <h4>consultech@gmail.com</h4>
                  <br></br>
                  <h4>Todos los medicamentos fracción IV requieren Receta Médica,
                    para antibióticos esta podrá ser retenida.</h4>
                </ul>

              </div>
            </div>
            <div class="footer-content-column">
              <div class="footer-menu">
                <h2 class="footer-menu-name">Horarios laborales</h2>
                <ul id="menu-company" class="footer-menu-list">
                  <h4>Lunes a Viernes de 8:00am a 6:00pm</h4>
                </ul>
              </div>
              <div class="footer-menu">

                <ul id="menu-legal" class="footer-menu-list">

                </ul>
              </div>
            </div>
            <div class="footer-content-column">
              <div class="footer-menu">
                <h2 class="footer-menu-name"> Quick Links</h2>
                <ul id="menu-quick-links" class="footer-menu-list">

                </ul>
              </div>
            </div>
            <div class="footer-content-column">
              <div class="footer-call-to-action">
                <h2 class="footer-call-to-action-title"> Charlemos</h2>
                <p class="footer-call-to-action-description"> Tienes una pregunta?</p>
                <a class="footer-call-to-action-button button" target="_self"> Usa nuestro chatbot dando clic en el icono ubicado en la parte 
                esquina inferior derecha de abajo  </a>
              </div>
              <div class="footer-call-to-action">
                <h2 class="footer-call-to-action-title">Llamanos</h2>
                <p class="footer-call-to-action-link-wrapper"> <a class="footer-call-to-action-link" href="tel:0124-64XXXX" target="_self"> 01800-888-5656 </a></p>
              </div>
            </div>
            <div class="footer-social-links"> <svg class="footer-social-amoeba-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 54">
              <path class="footer-social-amoeba-path" d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"></path>
            </svg>
              <a class="footer-social-link linkedin" href="#" target="_blank">
                <span class="hidden-link-text">Linkedin</span>
                <svg class="footer-social-icon-svg" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30">
                  <path class="footer-social-icon-path" d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z"></path>
                </svg>
              </a>
              <a class="footer-social-link twitter" href="#" target="_blank">
                <span class="hidden-link-text">Twitter</span>
                <svg class="footer-social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                  <path class="footer-social-icon-path" d="M 25.855469 5.574219 C 24.914063 5.992188 23.902344 6.273438 22.839844 6.402344 C 23.921875 5.75 24.757813 4.722656 25.148438 3.496094 C 24.132813 4.097656 23.007813 4.535156 21.8125 4.769531 C 20.855469 3.75 19.492188 3.113281 17.980469 3.113281 C 15.082031 3.113281 12.730469 5.464844 12.730469 8.363281 C 12.730469 8.773438 12.777344 9.175781 12.867188 9.558594 C 8.503906 9.339844 4.636719 7.246094 2.046875 4.070313 C 1.59375 4.847656 1.335938 5.75 1.335938 6.714844 C 1.335938 8.535156 2.261719 10.140625 3.671875 11.082031 C 2.808594 11.054688 2 10.820313 1.292969 10.425781 C 1.292969 10.449219 1.292969 10.46875 1.292969 10.492188 C 1.292969 13.035156 3.101563 15.15625 5.503906 15.640625 C 5.0625 15.761719 4.601563 15.824219 4.121094 15.824219 C 3.78125 15.824219 3.453125 15.792969 3.132813 15.730469 C 3.800781 17.8125 5.738281 19.335938 8.035156 19.375 C 6.242188 20.785156 3.976563 21.621094 1.515625 21.621094 C 1.089844 21.621094 0.675781 21.597656 0.265625 21.550781 C 2.585938 23.039063 5.347656 23.90625 8.3125 23.90625 C 17.96875 23.90625 23.25 15.90625 23.25 8.972656 C 23.25 8.742188 23.246094 8.515625 23.234375 8.289063 C 24.261719 7.554688 25.152344 6.628906 25.855469 5.574219 "></path>
                </svg>
              </a>
              <a class="footer-social-link youtube" href="#" target="_blank">
                <span class="hidden-link-text">Youtube</span>
                <svg class="footer-social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <path class="footer-social-icon-path" d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                </svg>
              </a>
              <a class="footer-social-link github" href="#" target="_blank">
                <span class="hidden-link-text">Github</span>
                <svg class="footer-social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path class="footer-social-icon-path" d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z "></path>
                </svg>
              </a>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="footer-copyright-wrapper">
              <p class="footer-copyright-text">
                <a class="footer-copyright-link" href="#" target="_self"> ©2024. | Todos los derechos reservados. </a>
              </p>
            </div>
          </div>
        </footer>


      </div>

      <ChatButton />
    </>
  );
};

export default Inicio;
