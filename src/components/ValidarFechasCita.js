import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './ValidarFechasCita.css'; // Importa tu archivo CSS para estilos personalizados

const ValidarFechasCita = () => {
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);

  useEffect(() => {
    const obtenerFechasOcupadas = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/controlCita');
        if (response.ok) {
          const data = await response.json();
          setFechasOcupadas(data);
        } else {
          throw new Error('Error al obtener las fechas ocupadas');
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerFechasOcupadas();
  }, []);

  useEffect(() => {
    // Filtrar las fechas disponibles eliminando las ocupadas
    const fechasDisponiblesLocal = obtenerFechasDisponiblesLocal();
    setFechasDisponibles(fechasDisponiblesLocal);
  }, [fechasOcupadas]);

  const obtenerFechasDisponiblesLocal = () => {
    const fechasOcupadasSet = new Set(fechasOcupadas.map(fechaOcupada => fechaOcupada.fecha));
    const fechasDisponiblesLocal = [];
    let fechaActual = new Date();
    for (let i = 0; i < 7; i++) {
      fechaActual.setDate(fechaActual.getDate() + 1); // Avanzar un día
      const fechaString = fechaActual.toISOString().split('T')[0];
      if (!fechasOcupadasSet.has(fechaString)) {
        fechasDisponiblesLocal.push({ date: fechaString });
      }
    }
    return fechasDisponiblesLocal;
  };

  return (
    <div className="container">
      <h1>Citas disponibles</h1>
      <div className="cal-container">
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          events={fechasDisponibles}
          height="auto" // Ajusta la altura del calendario automáticamente
        />
        <div className="blue-box">
          <div className="blue-box-content">Días disponibles</div>
        </div>
      </div>
    </div>
  );
}

export default ValidarFechasCita;
