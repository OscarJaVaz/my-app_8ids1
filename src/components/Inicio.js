import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import fondo from '../components/assets/fondo2.jpg';
import fondo2 from '../components/assets/fondo5.png';
import logo1 from '../components/assets/logo1.png';

import Slider from 'react-slick'; // Importa el componente Slider de react-slick
import 'slick-carousel/slick/slick.css'; // Importa los estilos de react-slick
import 'slick-carousel/slick/slick-theme.css'; // Importa los estilos del tema de react-slick

import './cards.css';

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

const Inicio = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };


  const [expandedCard, setExpandedCard] = useState(null);


  return (
    <>
      <header style={{ backgroundColor: '#1172D8', padding: '25px', color: 'white', textAlign: 'right', fontSize: '24px', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 10, left: 0, right: 0 }}>
          <img src={logo1} alt="Logo" style={{ width: '110px', marginRight: '20px' }} />
        </div>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            <NavigationButton label='Iniciar sesión' onClick={() => handleNavigation('/login')} icon={<PersonIcon />} fontSize="15px" />
            <NavigationButton label='Aviso de privacidad' onClick={() => handleNavigation("/aviso")} icon={<NotificationImportantIcon />} fontSize="15px" />
          </ul>
        </nav>
      </header>

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
        </div>
      </div>
    </>
  );
};

export default Inicio;
