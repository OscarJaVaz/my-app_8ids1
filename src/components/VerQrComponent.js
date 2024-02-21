import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const VerQrComponent = () => {
  const [qrData, setQrData] = useState('');
  const [cameraActivated, setCameraActivated] = useState(false);
  const [scanning, setScanning] = useState(false);
  const webcamRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleActivateCamera = () => {
    setCameraActivated(true);
  };

  const handleDeactivateCamera = () => {
    setCameraActivated(false);
  };

  const handleScanQRCode = async () => {
    setScanning(true);
    const imageData = webcamRef.current.getScreenshot();
    const qrCode = await decodeQRCode(imageData);
    if (qrCode) {
      setQrData(qrCode.data);
      setScanning(false);
    } else {
      setQrData('No se pudo decodificar el código QR.');
    }
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

  const renderTableData = () => {
    if (!qrData) return null;
    try {
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
    } catch (error) {
      console.error('No se pudo decodificar el código QR:', error);
      return <div>No es un código QR válido</div>;
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Escanea el código QR de la cita que se te proporcionó anteriormente</h2>

      <br />

      {cameraActivated ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            style={{ maxWidth: '400px' }}
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: 'user',
            }}
            onUserMediaError={handleError}
          />
          <br />
          
          <button className="custom-btn btn-3" onClick={handleScanQRCode}>Escanear código QR</button>
          <br />
          <button className="custom-btn btn-3" onClick={handleDeactivateCamera}>Apagar cámara</button>
        </div>
      ) : (
        <div>
          <label htmlFor="file-upload" className="custom-btn btn-3">
            <span>Escoger archivo</span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button className="custom-btn btn-3" onClick={handleActivateCamera}><span>Encender cámara</span></button>
        </div>
      )}
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
