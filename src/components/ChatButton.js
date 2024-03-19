import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBot from 'react-simple-chatbot';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#1672B5',
  headerFontColor: '#fff',
  headerFontSize: '20px',
  botBubbleColor: '#1672B5',
  botFontColor: '#fff',
  userBubbleColor: '#0cb3c9',
  userFontColor: '#fff',
};

const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleUserInput = (value) => {
    const lowerCaseValue = value.toLowerCase();
    let response = '';
    if (lowerCaseValue.includes('iniciar sesión')) {
      response = 'Para iniciar sesión, debes dirigirte a la sección de la parte de arriba que dice Iniciar sesión dando clic al botón :). ¿Necesitas algo más?';
    } else if (lowerCaseValue.includes('agendar cita')) {
      response = 'Puedes agendar una cita, tienes que registrarte y crear una cuenta o visitando nuestras instalaciones. ¿Necesitas algo más?';
    } else if (lowerCaseValue.includes('horarios')) {
      response = 'Nuestros horarios de atención son de lunes a viernes de 8:00 AM a 6:00 PM. ¿Necesitas algo más?';
    } else {
      response = 'Lo siento, no entendí tu pregunta. ¿Puedes intentar preguntar de otra manera?';
    }
    return response;
  };

  return (
    <div className='chatbot' style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}>
      {showChat && (
        <div style={{ position: 'relative' }}>
          <Fab
            color="primary"
            aria-label="close-chat"
            onClick={handleChatToggle}
            style={{ position: 'absolute', top: '-15px', right: '-15px' }}
          >
            <CloseIcon />
          </Fab>
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={[
                {
                  id: '1',
                  message: 'Hola! ¿Cómo te llamas?',
                  trigger: 'nombre',
                },
                {
                  id: 'nombre',
                  user: true,
                  trigger: 'mucho_gusto',
                },
                {
                  id: 'mucho_gusto',
                  message: ({ previousValue }) => `Mucho gusto, ${previousValue}, ¿En qué puedo ayudarte hoy?`,
                  trigger: 'user_input',
                },
                {
                  id: 'user_input',
                  user: true,
                  trigger: 'response',
                },
                {
                  id: 'response',
                  message: ({ previousValue }) => handleUserInput(previousValue),
                  trigger: 'necesitas_mas_options',
                },
                {
                  id: 'necesitas_mas_options',
                  options: [
                    { value: 'si', label: 'Sí', trigger: 'mucho_gusto' },
                    { value: 'no', label: 'No', trigger: 'end_chat' },
                  ],
                },
                {
                  id: 'end_chat',
                  message: '¡Gracias por usar nuestro servicio de chat!',
                  end: true,
                },
              ]}
              botDelay={1000}
              contentStyle={{ width: '100%', maxWidth: 'none' }} // Make sure the content takes full width
              userDelay={1000}
              optionStyle={{ display: 'inline-block', margin: '0 10px' }} // Display options inline
            />
          </ThemeProvider>
        </div>
      )}
      {!showChat && (
        <Fab color="primary" aria-label="chat" onClick={handleChatToggle}>
          <ChatIcon />
        </Fab>
      )}
    </div>
  );
};

export default ChatButton;
