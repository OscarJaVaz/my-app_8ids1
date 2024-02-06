import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Nuevo icono de usuario
import paciente from './assets/paciente.png';
import doctor from './assets/doctor.png';
import enfermedad from './assets/enfermedad.png';
import cita from './assets/cita1.png';
import salir from './assets/salir.png';
import agregar from './assets/agregar.png';

function MenuComponent() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(true);

  const handleClick = (path) => {
    navigate(path);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  

  return (
    <div className={`menu-container ${menuVisible ? 'menu-visible' : 'menu-hidden'}`}>
      <div className="sidebar">
        <div className="user-info">
          <h2 style={{ color: 'white' }}>BIENVENIDO</h2>
          <AccountCircleIcon style={{ color: 'white' }} />
        </div> 
        <p></p>
        <a onClick={() => handleClick("/home")}>
          <img src={paciente} alt="Pacientes" />
          <span>Pacientes</span>
        </a>
        <a onClick={() => handleClick("/homedoctor")}>
          <img src={doctor} alt="Doctores" />
          <span>Doctores</span>
        </a>
        <a onClick={() => handleClick("/homeenfermedad")}>
          <img src={enfermedad} alt="Enfermedades" />
          <span>Enfermedades</span>
        </a>
        <a onClick={() => handleClick("/homecita")}>
          <img src={cita} alt="Citas" />
          <span>Citas</span>
        </a>
        <a onClick={() => handleClick("/homeproducto")}>
          <img src={agregar} alt="Productos" />
          <span>Productos</span>
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
        {/* Contenido principal va aquí */}
      </div>
    </div>
  );
}

export default MenuComponent;