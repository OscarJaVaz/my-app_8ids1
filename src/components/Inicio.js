import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Sala from './assets/sala.jpg';
import PersonIcon from '@mui/icons-material/Person';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'; 
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import miImagen from '../components/assets/consulta.png';
import presion from '../components/assets/presion.png';
import consulta from '../components/assets/consultas.png';
import consultorio from '../components/assets/consultorio.png';

const Inicio = () => {
    const navigate = useNavigate();

    const estiloEncabezado = {
        backgroundColor: 'blue',
        padding: '20px', 
        color: 'white',
        textAlign: 'right', 
        fontSize: '24px', 
        width: '100%',
        boxSizing: 'border-box', 
        margin: 0, 
        position: 'fixed', // Agrega esta línea para fijar el encabezado
        top: 0, // Ajusta la posición superior a 0 para que esté en la parte superior
        zIndex: 1000, 
    };

    const estiloOpcion = {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    };

    const inicio = () => {
        navigate('/login');
    };

    const registrar = () => {
        navigate('/registrar');
    };

    const farmacia = () => {
        navigate('/farmacia');
    };

    const aviso = () => {
        navigate("/aviso");
    }

    const button = {
        marginRight: '50px', 
    };
        
    return (
      <>
        <header style={estiloEncabezado}>
            <nav>
                <ul style={estiloOpcion}>
                    <Button variant="contained" style={button} onClick={inicio} startIcon={<PersonIcon />} >
                        Iniciar sesión
                    </Button> 
                    <Button variant="contained" style={button} onClick={registrar} startIcon={<PersonIcon />} >
                        Registrarse
                    </Button>
                    <Button variant="contained" style={button} onClick={farmacia} startIcon={<LocalPharmacyIcon />} >
                        Farmacia
                    </Button>
                    <Button variant="contained" style={button} onClick={aviso} startIcon={<NotificationImportantIcon />} >
                        Aviso de privacidad
                    </Button>
                </ul>
            </nav>
        </header>
        <div style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', height: '2110px'}}>
        <img src={consultorio} alt="Avatar Doctor" style={{ width: '450px',
                height: '300px',  
                position: 'absolute',
                top: '300px',   
                left: '900px', }} />
             <h2 style={{ color: 'blue' }}>Bienvenida al Consultorio</h2>
             <img src={miImagen} alt="Avatar Doctor" style={{ width: '450px',
                height: '300px', 
                position: 'absolute', 
                top: '830px', 
                left: '900px', }} />
              <p style={{ fontSize: '20px'}}>Bienvenido al Consultorio Médico, donde nos dedicamos a brindar atención médica 
                de calidad con un enfoque centrado en el paciente.</p>
              <p></p>  
             <h2 style={{ color: 'blue' }}>Descripción del Consultorio</h2>
              <p style={{ fontSize: '20px'}} >En el Consultorio Médico XYZ, nos comprometemos a proporcionar cuidado médico 
                integral y personalizado. Nuestra misión es mejorar la salud y el bienestar de 
                nuestros pacientes a través de un enfoque dedicado y compasivo.</p> 
              <p></p>
             <h2 style={{ color: 'blue' }}>Servicios Ofrecidos</h2>
              <p style={{ fontSize: '20px'}}>Descubra una amplia gama de servicios médicos, que incluyen consultas generales, 
                pediatría,<p></p> ginecología y más. 
                Estamos aquí para abordar todas sus necesidades de salud.</p>
              <p></p>
             <h2 style={{ color: 'blue' }}>Equipo Médico</h2>
              <p style={{ fontSize: '20px'}}>Conozca a nuestro equipo de profesionales de la salud, formado por médicos 
                experimentados y<p></p> enfermeras dedicadas. 
                Estamos comprometidos con su salud y bienestar.</p>
              <p></p>
             <h2 style={{ color: 'blue' }}>Instalaciones y Tecnología</h2>
              <p style={{ fontSize: '20px'}}>Contamos con instalaciones modernas equipadas con la última tecnología médica. 
                Nuestras consultas están diseñadas para brindar comodidad y seguridad a nuestros 
                pacientes.</p>     
              <p></p>
             <h2 style={{ color: 'blue' }}>Citas y Contacto</h2> 
              <p style={{ fontSize: '20px'}}>Agende su cita fácilmente a través de nuestra plataforma
               en línea o llámenos directamente.Para consultas y asistencia, no dude en ponerse en 
               contacto con nuestro 
              equipo.</p>
              <p></p>
             <h2 style={{ color: 'blue' }}>Horarios de Atención</h2>
              <p style={{ fontSize: '20px'}}>Horario: lunes a domingo, de 07:00 a.m. a 10:00 p.m.<p></p>
                 Telefono: 591 7689 521<p></p>
                 Aceptamos: Tarjeta de crédito, débito y efectivo<p></p>
                 Estamos aquí para atender sus necesidades de salud.</p>
              <p></p>  
              <img src={presion} alt="Avatar Doctor" style={{ width: '650px',
                height: '300px', 
                position: 'absolute', 
                top: '118 0px', 
                left: '100px', }} />
             <h2 style={{ color: 'blue',textAlign: 'right', marginTop: '100px' }}>Servicio adicional a Consulta Médica</h2> 
             <div style={{ marginTop: '5px', padding: '5px', borderRadius: '8px',width: '500px', float: 'right'}}>
             <ul style={{ fontSize: '20px', texAlign: 'right',listStyleType: 'none'}}>
                <li>- Toma de presión arterial: $10.00 MXN</li>
                <li>- Medición de glucosa en sangre: $15.00 MXN</li>
                <li>- Certificado médico: $70.00 MXN</li>
                <li>- Aplicación inyección intramuscular: $30.00 MXN</li>
             </ul>
             </div>
              <p></p>
             <h2 style={{color:'blue',marginTop: '240px'}}>Noticias o Actualizaciones</h2>
              <p style={{ fontSize: '20px'}}>Manténgase actualizado con las últimas noticias y actualizaciones de nuestro 
                consultorio. Estamos comprometidos con la mejora continua.</p>
              <p></p>
             <h2 style={{ color: 'blue' }}>¿Qué hace diferente a nuestro consultorio médico?</h2>
              <p style={{ fontSize: '20px'}}>Contamos con un equipo de trabajo altamente capacitado, el cual se compone de 
                personal Médico y de Enfermería. Ambos cuentan con Cédula Profesional, es por eso 
                que nosotros estamos facultados para ofrecer Consulta Médica Profesional y no sólo una 
                orientación médica.</p>
              <p></p>
             <h2 style={{ color: 'blue' }}>¿Cómo es la revisión previa antes de consulta?</h2>
              <p style={{ fontSize: '20px'}}>Antes de la revisión con tu Doctor, nuestro personal de enfermería registrará tus datos
                 personales y tomará tus signos vitales (presión arterial y temperatura), además de
                 registrar tu peso y estatura, esto para mantener un historial médico y servir de apoyo
                 a tu Doctor al momento de precisar tu diagnóstico.</p>
                 <img src={consulta} alt="Avatar Doctor" style={{ width: '850px',
                height: '380px',  
                position: 'absolute', 
                top: '1800px', 
                left: '350px', }} />
           </div>
      </>
    
    );
};

export default Inicio;
