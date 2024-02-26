import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import footerImagen from '../components/assets/simbolo_doc.png';

const mainContainerStyle = {
    background: 'linear-gradient(to bottom, #A3D1FF, #FFFFFF)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    marginBottom: '100px',
};

const contentContainerStyle = {
    background: '#FFFFFF', 
    padding: '20px',
    marginBottom: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    margin: '0 auto',
    borderRadius: '20px',
};

const contentStyle = {
    marginBottom: '90px',
    textAlign: 'center',
};

const paragraphStyle = {
    marginBottom: '20px',
};

const buttonStyle = {
    backgroundColor: 'orange',
    color: 'white',
    marginTop: '20px',
};

const AvisoComponent = () => {
    const navigate = useNavigate();

    const fnVolver = () => {
        navigate('/');
    };

    return (
        <div style={mainContainerStyle}>
            <div style={contentContainerStyle}>
                {/* Contenido del aviso de privacidad */}
                <h1>Aviso de Privacidad</h1>
                <p style={paragraphStyle}>
                    En el Hospital, nos comprometemos a proteger su privacidad y la confidencialidad de su información personal. Este aviso de privacidad explica cómo recopilamos, usamos y protegemos su información cuando utiliza nuestra página web. Al acceder y utilizar nuestro sitio web, acepta los términos y condiciones establecidos en este aviso de privacidad.
                </p>

                <h2>Recopilación de información</h2>
                <p>
                    Durante su visita a nuestro sitio web, podemos recopilar información personal identificable, como su nombre, dirección de correo electrónico y número de teléfono, solo si decide proporcionarla voluntariamente. También podemos recopilar información no personal identificable, como su dirección IP y el tipo de navegador que está utilizando.
                </p>

                <h2>Uso de la información</h2>
                <p>
                    La información personal que recopilamos se utiliza únicamente para los fines específicos para los que se proporcionó, como responder a sus consultas o brindarle información solicitada. No compartiremos su información personal con terceros sin su consentimiento, excepto cuando sea necesario para cumplir con la ley o proteger nuestros derechos legales.
                </p>

                <h2>Cookies</h2>
                <p>
                    Utilizamos cookies en nuestro sitio web para mejorar su experiencia de usuario y recopilar información sobre cómo se utiliza el sitio. Puede configurar su navegador para que rechace todas las cookies o para que le avise cuando se envía una cookie. Sin embargo, algunas funciones del sitio pueden no funcionar correctamente si las cookies están deshabilitadas.
                </p>

                <h2>Seguridad</h2>
                <p>
                    Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados, uso indebido o divulgación. Sin embargo, tenga en cuenta que ninguna transmisión de datos a través de Internet o almacenamiento electrónico es completamente segura, por lo que no podemos garantizar la seguridad absoluta de su información.
                </p>

                <h2>Enlaces a sitios externos</h2>
                <p>
                    Nuestro sitio web puede contener enlaces a sitios externos. No nos hacemos responsables de las prácticas de privacidad o el contenido de esos sitios. Le recomendamos que revise las políticas de privacidad de los sitios externos antes de proporcionarles su información personal.
                </p>

                <h2>Actualizaciones al aviso de privacidad</h2>
                <p>
                    Nos reservamos el derecho de actualizar o modificar este aviso de privacidad en cualquier momento y sin previo aviso. Le recomendamos que revise regularmente este aviso de privacidad para mantenerse informado sobre cómo protegemos su información.
                </p>

                <h2>Contacto</h2>
                <p>
                    Si tiene alguna pregunta o inquietud sobre nuestro aviso de privacidad, puede ponerse en contacto con nosotros a través de los datos de contacto proporcionados en nuestro sitio web.
                </p>

                {/* Botón de Regresar */}
                <Button
                    variant="contained"
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = 'red')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = 'orange')}
                    onClick={fnVolver}
                >
                    <ArrowBackIcon style={{ marginRight: '5px' }} />
                    Regresar
                </Button>
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: '#1172D8', color: 'white', textAlign: 'center', padding: '10px', position: 'fixed', bottom: 0, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ marginLeft: '50px' }}>© 2024, Consultorio Médico, Todos los derechos reservados</div>
                <div>
                    <img src={footerImagen} alt="Avatar Doctor" style={{ height: '5vh', marginRight: '50px' }} />
                </div>
            </footer>
        </div>
    );
};

export default AvisoComponent;