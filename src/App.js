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


function App() {   
  const [token, setToken] = useState(null);

  useEffect(()=>{
    console.log('Render')
    setToken(secureLocalStorage.getItem('token'));
  },[]);
  
  return (

<Routes>
    <Route path="/" element={<Login_Component />}/>
    <Route path="/home" element={token == null ? <Login_Component /> :<HomeComponent />}/>
    <Route path="/paciente/nuevo" element={token == null ? <Login_Component /> :<PacienteComponent />}/>
    <Route path="/homedoctor" element={token == null ? <Login_Component /> :<HomeComponentDoctor />}/>
    <Route path="/doctor/nuevo" element={token == null ? <Login_Component /> :<DoctorComponent />}/>
    <Route path="/homeenfermedad" element={token == null ? <Login_Component /> :<HomeComponentEnfermedad />}/>
    <Route path="/enfermedad/nuevo" element={token == null ? <Login_Component /> :<EnfermedadComponent />}/>
    <Route path="/menu" element={token == null ? <Login_Component /> :<MenuComponent />}/>
    <Route path="/homecita" element={token == null ? <Login_Component /> :<HomeComponentCita />}/>
    <Route path="/cita/nuevo" element={token == null ? <Login_Component /> :<CitaComponent />}/>
    <Route path="/aviso" element={token == null ? <Login_Component /> :<AvisoComponent/>}/>

    </Routes>

);
}
export default App;
