import React from 'react';

function HomeClienteComponent() {
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar la sesión
    console.log('Sesión cerrada');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/login';
  };

  // Evitar que el usuario retroceda usando el botón del navegador
  React.useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      window.history.pushState(null, '', window.location.pathname);
    };

    window.history.pushState(null, '', window.location.pathname); // Reemplazar la entrada actual en el historial
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <div>
      <p>¡Bienvenido!</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default HomeClienteComponent;
