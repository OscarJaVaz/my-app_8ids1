import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login_Component from './components//Login_Component';
import HomeComponent from './components//HomeComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import PacienteComponent from './components/PacienteComponent';
import HomeComponentDoctor from './components//HomeComponentDoctor';
import DoctorComponent from './components//DoctorComponent';
import HomeComponentEnfermedad from './components/HomeComponentEnfermedad';
import EnfermedadComponent from './components//EnfermedadComponent';
import MenuComponent from './components//MenuComponent';
import HomeComponentCita from './components/HomeComponentCita';
import CitaComponent from './components//CitaComponent';
import AvisoComponent from './components/AvisoComponent';
import Inicio from './components/Inicio';
import Registrar from './components/Registrar';
import Farmacia from './components/Farmacia';


function App() {   
  const [token, setToken] = useState(null);

  useEffect(()=>{
    console.log('Render')
    setToken(secureLocalStorage.getItem('token'));
  },[]);
  
  return (

<Routes>
    <Route path="/login" element={token == null ? <Inicio /> :<Login_Component />}/>
    <Route path="/home" element={token == null ? <Inicio /> :<HomeComponent />}/>
    <Route path="/paciente/nuevo" element={token == null ? <Inicio /> :<PacienteComponent />}/>
    <Route path="/homedoctor" element={token == null ? <Inicio /> :<HomeComponentDoctor />}/>
    <Route path="/doctor/nuevo" element={token == null ? <Inicio /> :<DoctorComponent />}/>
    <Route path="/homeenfermedad" element={token == null ? <Inicio /> :<HomeComponentEnfermedad />}/>
    <Route path="/enfermedad/nuevo" element={token == null ? <Inicio /> :<EnfermedadComponent />}/>
    <Route path="/menu" element={token == null ? <Inicio /> :<MenuComponent />}/>
    <Route path="/homecita" element={token == null ? <Inicio /> :<HomeComponentCita />}/>
    <Route path="/cita/nuevo" element={token == null ? <Inicio /> :<CitaComponent />}/>
    <Route path="/aviso" element={token == null ? <Inicio /> :<AvisoComponent/>}/>
    <Route path="/inicio" element={token == null ? <Inicio /> :<Inicio/>}/>
    <Route path="/" element={<Inicio />}/>
    <Route path="/registrar" element={token == null ? <Inicio /> :<Registrar/>}/>
    <Route path="/farmacia" element={token == null ? <Inicio /> :<Farmacia/>}/>

    </Routes>

);//
}
export default App;
