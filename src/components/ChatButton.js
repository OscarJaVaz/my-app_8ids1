import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBot from 'react-simple-chatbot';
import CloseIcon from '@mui/icons-material/Close';

const ChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const steps = [
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
      message: ({ previousValue }) => `Mucho gusto, ${previousValue}, seleccione alguna opción:`,
      trigger: 'opciones',
    },
    {
      id: 'opciones',
      options: [
        { value: 'inicio_sesion', label: '¿Cómo iniciar sesión?', trigger: 'inicio_sesion' },
        { value: 'agendar_cita', label: '¿Cómo agendar una cita?', trigger: 'agendar_cita' },
        { value: 'horarios', label: 'Horarios del consultorio', trigger: 'horarios' },
      ],
    },
    {
      id: 'inicio_sesion',
      message: 'Para iniciar sesión, debes dirigirte a nuestra página web e ingresar tus credenciales.',
      trigger: 'necesitas_algo_mas',
    },
    {
      id: 'agendar_cita',
      message: 'Puedes agendar una cita llamando a nuestro número de teléfono o visitando nuestras instalaciones.',
      trigger: 'necesitas_algo_mas',
    },
    {
      id: 'horarios',
      message: 'Nuestros horarios de atención son de lunes a viernes de 8:00 AM a 6:00 PM.',
      trigger: 'necesitas_algo_mas',
    },
    {
      id: 'necesitas_algo_mas',
      message: '¿Necesitas algo más?',
      trigger: 'necesitas_mas_options',
    },
    {
      id: 'necesitas_mas_options',
      options: [
        { value: 'si', label: 'Sí', trigger: 'opciones' },
        { value: 'no', label: 'No', trigger: 'end_chat' },
      ],
    },
    {
      id: 'end_chat',
      message: '¡Gracias por usar nuestro servicio de chat!',
      end: true,
    },
  ];

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
          <ChatBot
            steps={steps}
            botDelay={1000}
            contentStyle={{ width: '100%', maxWidth: 'none' }} // Make sure the content takes full width
            userDelay={1000}
            optionStyle={{ display: 'inline-block', margin: '0 10px' }} // Display options inline
          />
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
