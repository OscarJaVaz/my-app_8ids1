import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import paciente from './assets/paciente.png';
import doctor from './assets/doctor.png';
import enfermedad from './assets/enfermedad.png';
import cita from './assets/cita1.png';
import salir from './assets/salir.png';

function MenuComponent() {
  const navigate = useNavigate();

  const home = () => {
    navigate("/home");
  }

  const homedoctor = () => {
    navigate("/homedoctor");
  }

  const homeenfermedad = () => {
    navigate("/homeenfermedad");
  }

  const homeecitas = () => {
    navigate("/homecita");
  }

  const login = () => {
    navigate("/");
  }

  const handleClick = (path) => {
    navigate(path);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '130vh' }}>
      <ul style={{ listStyleType: 'none', textAlign: 'center', padding: 0 }}>

      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <a className="ag-courses-item_link" onClick={() => handleClick("/home")}>
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Gestionar:</div>
              <img src={paciente} style={{ height: '35%', width: '35%' }} />
              <div className="ag-courses-item_date-box">
                <Button variant="contained" style={{ backgroundColor: '#FF8C00', marginRight: '10px' }}>Pacientes</Button>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a className="ag-courses-item_link" onClick={() => handleClick("/homedoctor")}>
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Gestionar:</div>
              <img src={doctor} style={{ height: '35%', width: '35%' }} />
              <div className="ag-courses-item_date-box">
                <Button variant="contained" style={{ backgroundColor: 'green', marginRight: '10px' }}>Doctores</Button>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a className="ag-courses-item_link" onClick={() => handleClick("/homeenfermedad")}>
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Gestionar:</div>
              <img src={enfermedad} style={{ height: '35%', width: '35%' }} />
              <div className="ag-courses-item_date-box">
                <Button variant="contained" style={{ backgroundColor: '#FF4500', marginRight: '10px' }}>Enfermedades</Button>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a className="ag-courses-item_link" onClick={() => handleClick("/homecita")}>
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Gestionar:</div>
              <img src={cita} style={{ height: '35%', width: '35%' }} />
              <div className="ag-courses-item_date-box">
                <Button variant="contained" style={{ backgroundColor: 'purple', marginRight: '10px' }}>Citas</Button>
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a className="ag-courses-item_link" onClick={() => handleClick("/")}>
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Salir del sistema:</div>
              <img src={salir} style={{ height: '35%', width: '35%' }} />
              <div className="ag-courses-item_date-box">
                <Button variant="contained" style={{ backgroundColor: 'red' }}>Salir</Button>
              </div>
            </a>
          </div>

        </div>
      </div>
      </ul>
    </div>
  );
}

export default MenuComponent;
