import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Registrar = () => {
  const [mostrarMensaje, setMostrarMensaje] = useState(true);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mensajeValidacion, setMensajeValidacion] = useState('');

  const cerrarMensaje = () => {
    setMostrarMensaje(false);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      setMensajeValidacion('Las contraseñas no coinciden');
      return;
    }
    // Aquí podrías agregar más validaciones si lo necesitas
    setMensajeValidacion('');
    // Aquí podrías enviar los datos del cliente a tu backend o realizar alguna acción con ellos
    console.log('Nombre:', nombre);
    console.log('Apellido:', apellido);
    console.log('Email:', email);
    console.log('Teléfono:', telefono);
    console.log('Contraseña:', contrasena);
    // También podrías restablecer los campos del formulario después del envío si lo deseas
    setNombre('');
    setApellido('');
    setEmail('');
    setTelefono('');
    setContrasena('');
    setConfirmarContrasena('');
  };

  const handleContrasenaChange = (e) => {
    const valor = e.target.value;
    setContrasena(valor);
    validarContrasena(valor);
  };

  const regresar = () => {
    navigate('/');
  };

  const validarContrasena = (valor) => {
    let mensaje = '';
    if (!/[A-Z]/.test(valor)) {
      mensaje += 'Debe contener al menos una mayúscula. ';
    }
    if (!/[a-z]/.test(valor)) {
      mensaje += 'Debe contener al menos una minúscula. ';
    }
    if (!/[0-9]/.test(valor)) {
      mensaje += 'Debe contener al menos un número. ';
    }
    setMensajeValidacion(mensaje);
  };

  return (
    <div style={styles.container}>
      <div style={styles.mensajeContainer}>
        {mostrarMensaje && (
          <div style={styles.mensaje}>
            <p style="text-align: center;">¡Bienvenido al Registro del Consultorio Médico!</p>

           
          </div>
        )}
      </div>
      <div style={styles.formularioContainer}>
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={styles.input}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            style={styles.input}
            placeholder="Apellido"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Email"
          />
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={styles.input}
            placeholder="Teléfono"
          />
          <input
            type="password"
            value={contrasena}
            onChange={handleContrasenaChange}
            style={styles.input}
            placeholder="Contraseña"
          />
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            style={styles.input}
            placeholder="Confirmar Contraseña"
          />
          {mensajeValidacion && (
            <p style={styles.mensajeValidacion}>{mensajeValidacion}</p>
          )}
          <button style={styles.botonSubmit} type="submit">Registrar cliente</button>
          <br></br>
          <button style={styles.cerrarMensajeButton} onClick={regresar}>Regresar</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  mensajeContainer: {
    marginBottom: '20px',
  },
  mensaje: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '2px solid #33cccc',
    borderRadius: '5px',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mensajeTexto: {
    color: '#33cccc',
    fontWeight: 'bold',
    margin: 0,
  },
  cerrarMensajeButton: {
    backgroundColor: '#33cccc',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formularioContainer: {
    width: '400px',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginBottom: '10px',
  },
  mensajeValidacion: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  botonSubmit: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '12px 20px',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default Registrar;
