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
import ProductoComponent from './components/ProductoComponent';
import HomeComponentProducto from './components/HomeComponentProducto';
import HomeClienteComponent from './components/HomeClienteComponent';
import VerClientesComponent from './components/VerClientesComponent';
import RegistraCitaCliente from './components/RegistrarCitaCliente';
import { ViewQuiltRounded } from '@mui/icons-material';
import VerQrComponent from './components/VerQrComponent';
import ClienteFarmacia from './components/ClienteFarmacia';
import VistaCompra from './components/VistaCompra';



function App() {   
  const [token, setToken] = useState(null);

  useEffect(()=>{
    console.log('Render')
    setToken(secureLocalStorage.getItem('token'));
  },[]);
  
  return (

<Routes>
    <Route path="/home" element={token == null ? <Inicio /> :<HomeComponent />}/>
    <Route path="/paciente/nuevo" element={token == null ? <Inicio /> :<PacienteComponent />}/>
    <Route path="/homedoctor" element={token == null ? <Inicio /> :<HomeComponentDoctor />}/>
    <Route path="/doctor/nuevo" element={token == null ? <Inicio /> :<DoctorComponent />}/>
    <Route path="/homeenfermedad" element={token == null ? <Inicio /> :<HomeComponentEnfermedad />}/>
    <Route path="/enfermedad/nuevo" element={token == null ? <Inicio /> :<EnfermedadComponent />}/>
    <Route path="/cita/nuevo" element={token == null ? <Inicio /> :<CitaComponent />}/>
    <Route path="/inicio" element={token == null ? <Inicio /> :<Inicio/>}/>
    <Route path="/" element={<Inicio />}/>
    <Route path="/homecita" element={<HomeComponentCita />} />
    <Route path="/registrar" element={<Registrar />} />
    <Route path="/login" element={<Login_Component />} />
    <Route path="/aviso" element={<AvisoComponent />} />
    <Route path="/menu" element={<MenuComponent />} />
    <Route path="/menu" element={<MenuComponent />} />
    <Route path="/farmacia" element={<Farmacia />} />
    <Route path="/homeproducto" element={<HomeComponentProducto />} />
    <Route path="/producto/nuevo" element={<ProductoComponent />} />
    <Route path="/Verclientes" element={<VerClientesComponent />} />
    <Route path="/registrarCita" element={<RegistraCitaCliente />} />
    <Route path="/verqr" element={<VerQrComponent/>}/>
    <Route path="/farmaciacliente" element={<ClienteFarmacia/>}/>
    <Route path="/cliente" element={<HomeClienteComponent/>}/>
    <Route path="/vistaCompra" element={<VistaCompra/>}/>
    
    </Routes>

);//
}
export default App;
