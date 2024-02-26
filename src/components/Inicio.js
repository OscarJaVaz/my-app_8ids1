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

import Carousel from 'react-material-ui-carousel'; 

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
//x
const Inicio = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };


  return (
    <>
      <header style={{ backgroundColor: '#1172D8', padding: '25px', color: 'white', textAlign: 'right', fontSize: '24px', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 0, zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 10, left: 20 }}>
          <img src={logo1} alt="Logo" style={{ width: '110px', marginRight: '20px' }} />
        </div>
        <nav>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            <NavigationButton label='Iniciar sesión' onClick={() => handleNavigation('/login')} icon={<PersonIcon />} fontSize="15px" />
            <NavigationButton label='Registrarse' onClick={() => handleNavigation('/registrar')} icon={<PersonIcon />} fontSize="15px" />
            <NavigationButton label='Aviso de privacidad' onClick={() => handleNavigation("/aviso")} icon={<NotificationImportantIcon />} fontSize="15  px" />
          </ul>
        </nav>
      </header>

      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Carousel animation="slide">
          <img src={fondo} alt="Fondo 1" style={{ width: '100%', height: '100%' }} />
          <img src={fondo2} alt="Fondo 2" style={{ width: '100%', height: '100%' }} />
        </Carousel>
      
        <Card style={{ width: '280px',height:'250px',backgroundColor:'#0077FC', position: 'absolute', top: '81%', left: '20%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <CardContent>
            <h2>Ritmo Cardiaco</h2>
            <p></p>
          </CardContent>
        </Card>


        <Card style={{ width: '280px',height:'250px',backgroundColor:'#5EA9FD', position: 'absolute', top: '81%', left: '41%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <CardContent>
            <h2>Ayuda en linea</h2>
            <p></p>
          </CardContent>
        </Card>

        <Card style={{ width: '280px',height:'250px',backgroundColor:'#0077FC', position: 'absolute', top: '81%', left: '62%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <CardContent>
            <h2>Consulta</h2>
            <p></p>
          </CardContent>
        </Card> 
        
        <Card style={{ width: '280px',height:'250px',backgroundColor:'#5EA9FD', position: 'absolute', top: '81%', left: '83%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <CardContent>
            <h2>Ayuda en linea</h2>
            <p></p>
          </CardContent>
        </Card> 
        
      </div>
    

    </>
  );
};

export default Inicio;
