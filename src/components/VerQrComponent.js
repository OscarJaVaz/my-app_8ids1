import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam'; // Importa react-webcam
import jsQR from 'jsqr';
//hola
const VerQrComponent = () => {
  const [qrData, setQrData] = useState('');
  const [cameraActivated, setCameraActivated] = useState(false);
  const webcamRef = useRef(null); // Referencia al componente Webcam

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

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Escanea el código QR de la cita</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <br />
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
          <button onClick={handleCameraScan}>Escanear desde la cámara</button>
        </>
      )}
      <br />
      <button onClick={handleActivateCamera}>Encender cámara</button>
      <br />
      {qrData && (
        <div>
          <h3>Datos de la cita:</h3>
          <p>{qrData}</p>
        </div>
      )}
    </div>
  );
};

export default VerQrComponent;
