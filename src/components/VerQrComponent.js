import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const VerQrComponent = () => {
  const [qrData, setQrData] = useState('');
  const [cameraActivated, setCameraActivated] = useState(false);
  const webcamRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleActivateCamera = () => {
    setCameraActivated(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const imageData = await readFileAsDataURL(file);
    const qrCode = await decodeQRCode(imageData);
    if (qrCode) {
      setQrData(qrCode.data);
    } else {
      setQrData('No se pudo decodificar el código QR.');
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const decodeQRCode = (imageData) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        resolve(code);
      };
      img.src = imageData;
    });
  };

  const handleCameraScan = async () => {
    const imageData = webcamRef.current.getScreenshot();
    const qrCode = await decodeQRCode(imageData);
    if (qrCode) {
      setQrData(qrCode.data);
    } else {
      setQrData('No se pudo decodificar el código QR.');
    }
  };

  // Función para mostrar los datos en formato de tabla
  // Función para mostrar los datos en formato de tabla
const renderTableData = () => {
  if (!qrData) return null;
  const citaData = JSON.parse(qrData);
  return (
    <table style={{ margin: 'auto', textAlign: 'left' }}>
      <tbody>
        <tr>
          <td style={{ padding: '5px' }}>ID:</td>
          <td style={{ padding: '5px' }}>{citaData.id}</td>
        </tr>
        <tr>
          <td style={{ padding: '5px' }}>Paciente:</td>
          <td style={{ padding: '5px' }}>{citaData.paciente}</td>
        </tr>
        <tr>
          <td style={{ padding: '5px' }}>Doctor:</td>
          <td style={{ padding: '5px' }}>{citaData.doctor}</td>
        </tr>
        <tr>
          <td style={{ padding: '5px' }}>Enfermedad:</td>
          <td style={{ padding: '5px' }}>{citaData.enfermedad}</td>
        </tr>
        <tr>
          <td style={{ padding: '5px' }}>Fecha:</td>
          <td style={{ padding: '5px' }}>{citaData.fecha}</td>
        </tr>
        <tr>
          <td style={{ padding: '5px' }}>Hora:</td>
          <td style={{ padding: '5px' }}>{citaData.hora}</td>
        </tr>
      </tbody>
    </table>
  );
};


  return (
    <div style={{ textAlign: 'center' }}>
      <h2 textAlign="center">Escanea el código QR de la cita que se te proporcionó anteriormente</h2>
      <label htmlFor="file-upload" className="custom-btn btn-3">
        <span> Escoger archivo </span>
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <br />
      
      {cameraActivated && (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: 'user',
            }}
            onUserMediaError={handleError}
          />
          <br />
          <button class="custom-btn btn-3" onClick={handleCameraScan}>Escanear desde la cámara</button>
        </>
      )}
      <br />
      <button class="custom-btn btn-3" onClick={handleActivateCamera}><span>Encender camara</span></button>
      <br />
      {qrData && (
        <div>
          <h3>Datos de la cita:</h3>
          {renderTableData()}
        </div>
      )}
    </div>
  );
};

export default VerQrComponent;
