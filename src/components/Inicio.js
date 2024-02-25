import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import consultorio from '../components/assets/consultorio.png';
import miImagen from '../components/assets/consulta.png';
import presion from '../components/assets/presion.png';
import consulta from '../components/assets/consultas.png';
import footerImagen from '../components/assets/simbolo_doc.png';

const SectionImage = ({ src, alt, style }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '80px' }}>
    <img src={src} alt={alt} style={style} />
  </div>
);

const SectionHeading = ({ color, text, textAlign, marginBottom, marginLeft }) => (
  <h2 style={{ color: '#1172D8', textAlign, marginBottom, marginLeft }}>{text}</h2>
);

const SectionParagraph = ({ fontSize, text, marginLeft, marginRight, marginBottom }) => (
  <p style={{ fontSize, textAlign: 'left', marginLeft, marginRight, marginBottom }}>{text}</p>
);

const NavigationButton = ({ label, onClick, icon }) => (
  <Button variant="outline" style={{ marginRight: '60px', fontWeight: 'bold' }} onClick={onClick} startIcon={icon}>
    {label}
  </Button>
);

const Inicio = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <header style={{ backgroundColor: '#1172D8', padding: '20px', color: 'white', textAlign: 'right', fontSize: '24px', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 0, zIndex: 1000 }}>
        <div style={{ fontSize: '40px', fontWeight: 'bold', display: 'flex', alignItems: 'center', width: '100%', boxSizing: 'border-box', margin: 0, position: 'fixed', top: 10, marginLeft: '50px' }}>
          <div>Santoyo - Consultorio Médico</div>
        </div>
        <nav>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            <NavigationButton label='Iniciar sesión' onClick={() => handleNavigation('/login')} icon={<PersonIcon />} />
            <NavigationButton label='Registrarse' onClick={() => handleNavigation('/registrar')} icon={<PersonIcon />} />
            <NavigationButton label='Aviso de privacidad' onClick={() => handleNavigation("/aviso")} icon={<NotificationImportantIcon />} />
          </ul>
        </nav>
      </header>

      <div style={{ marginTop: '100px', marginBottom: '55px', padding: '20px', borderRadius: '8px', height: 'auto', background: 'linear-gradient(to bottom, #FFFFFF, #BAD7F3)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <SectionHeading color="blue" text="Bienvenido al Consultorio" marginBottom="20px" marginLeft="80px" />
        <SectionParagraph fontSize="20px" text="Bienvenido al Consultorio Médico Santoyo, nos dedicamos a brindar atención médica de calidad con un enfoque centrado en el paciente." marginLeft="80px" marginRight="20px" marginBottom="10px" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ flex: '0 1 60%', marginLeft: '50px' }}>

            <SectionHeading color="blue" text="Descripción: " />
            <SectionParagraph fontSize="20px" text="En el Consultorio Médico Santoyo, nos comprometemos a proporcionar cuidado médico integral y personalizado. Nuestra misión es mejorar la salud y el bienestar de nuestros pacientes a través de un enfoque dedicado y compasivo." />
            <SectionHeading color="blue" text="Servicios Ofrecidos " />
            <SectionParagraph fontSize="20px" text="Descubra una amplia gama de servicios médicos, que incluyen consultas generales,
            pediatría, ginecología y más.
            Estamos aquí para abordar todas sus necesidades de salud."/>
            <SectionHeading color="blue" text="Equipo Médico " />
            <SectionParagraph fontSize="20px" text="Conozca a nuestro equipo de profesionales de la salud, formado por médicos
            experimentados y enfermeras dedicadas.
            Estamos comprometidos con su salud y bienestar."/>
            <SectionHeading color="blue" text="Instalaciones y Tecnología " />
            <SectionParagraph fontSize="20px" text="Contamos con instalaciones modernas equipadas con la última tecnología médica.
            Nuestras consultas están diseñadas para brindar comodidad y seguridad a nuestros
            pacientes."/>
            <SectionHeading color="blue" text="Citas y Contacto " />
            <SectionParagraph fontSize="20px" text="Agende su cita fácilmente a través de nuestra plataforma
            en línea o llámenos directamente. Para consultas y asistencia, no dude en ponerse en
            contacto con nuestro
            equipo."/>

            <SectionHeading color="blue" textAlign="left" text="Servicio adicional a Consulta Médica" />
            <div >
              <ul style={{ fontSize: '20px' }}>
                <li> Toma de presión arterial: $10.00 MXN</li>
                <li> Medición de glucosa en sangre: $15.00 MXN</li>
                <li> Certificado médico: $70.00 MXN</li>
                <li> Aplicación inyección intramuscular: $30.00 MXN</li>
              </ul>
            </div>

          </div>

          <div style={{ flex: '0 1 30%', width: '700px', height: '670px', borderRadius: '12px', marginBottom: '20px' }}>
            <SectionImage src={consultorio} alt="Avatar Doctor" style={{ width: '90%', height: '100%', borderRadius: '12px' }} />
            <SectionImage src={miImagen} alt="Avatar Doctor" style={{ width: '90%', height: '100%', borderRadius: '12px', marginTop: '20px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '40px' }}>

          <div style={{ flex: '0 0 30%', width: '700px', height: '500px', borderRadius: '12px', marginBottom: '10px' }}>
            <SectionImage src={presion} alt="Avatar Doctor" style={{ width: '90%', height: '100%', borderRadius: '12px' }} />
            <SectionImage src={consulta} alt="Avatar Doctor" style={{ width: '90%', height: '100%', borderRadius: '12px', marginTop: '20px' }} />
          </div>

          <div style={{ flex: '0 1 60%', marginLeft: '10px' }}>

            <SectionHeading color="blue" text="Noticias o Actualizaciones " marginLeft="10px" />
            <SectionParagraph fontSize="20px" text="Manténgase actualizado con las últimas noticias y actualizaciones de nuestro consultorio. Estamos comprometidos con la mejora continua." marginLeft="10px" marginRight="20px" marginBottom="20px" />

            <SectionHeading color="blue" text="¿Qué hace diferente a nuestro consultorio médico? " marginLeft="10px" />
            <SectionParagraph fontSize="20px" text="Contamos con un equipo de trabajo altamente capacitado, el cual se compone de personal Médico y de Enfermería. Ambos cuentan con Cédula Profesional, es por eso que nosotros estamos facultados para ofrecer Consulta Médica Profesional y no sólo una orientación médica." marginLeft="10px" marginRight="20px" marginBottom="20px" />

            <SectionHeading color="blue" text="¿Cómo es la revisión previa antes de consulta? " marginLeft="10px" />
            <SectionParagraph fontSize="20px" text="Antes de la revisión con tu Doctor, nuestro personal de enfermería registrará tus datos personales y tomará tus signos vitales (presión arterial y temperatura), además de registrar tu peso y estatura, esto para mantener un historial médico y servir de apoyo a tu Doctor al momento de precisar tu diagnóstico." marginLeft="10px" marginRight="20px" marginBottom="20px" />

          </div>

        </div>
        <SectionHeading color="blue" text="Horarios de Atención " />
        <SectionParagraph fontSize="20px" text="Horario: lunes a domingo, de 07:00 a.m. a 10:00 p.m.
            Telefono: 591 7689 521
            Aceptamos: Tarjeta de crédito, débito y efectivo
            Estamos aquí para atender sus necesidades de salud."/>
      </div>

      <footer style={{ backgroundColor: '#1172D8', color: 'white', textAlign: 'center', padding: '10px', position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ marginLeft: '50px' }}>© 2024, Consultorio Médico, Todos los derechos reservados.</div>
        <div>
          <img src={footerImagen} alt="Avatar Doctor" style={{ height: '5vh', marginRight: '50px' }} />
        </div>
      </footer>
    </>
  );
};

export default Inicio;