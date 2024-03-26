import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import escanearqrImage from './assets/escanearqr.png'; // Importa la imagen

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
        <Paper variant="outlined" style={{ borderRadius: '15px', margin: '20px auto', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', width: 'fit-content' }}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>ID:</TableCell>
                  <TableCell>{citaData.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paciente:</TableCell>
                  <TableCell>{citaData.paciente}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Doctor:</TableCell>
                  <TableCell>{citaData.doctor}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Síntomas:</TableCell>
                  <TableCell>{citaData.sintomas}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fecha:</TableCell>
                  <TableCell>{citaData.fecha}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hora:</TableCell>
                  <TableCell>{citaData.hora}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      );
    } catch (error) {
      console.error('No se pudo decodificar el código QR:', error);
      return <div>No es un código QR válido</div>;
    }
  };
  

  return (
    <div className="qr-component">
      <h2>Escanea el código QR del paciente para verificar sus datos de la cita</h2>
      <img src={escanearqrImage} alt="Escanear QR" style={{ width: '80%', maxWidth: '200px', display: 'block', margin: '0 auto 20px' }} />
      <div className="qr-actions">
        {cameraActivated ? (
          <div className="camera-section">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="webcam"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: 'user',
              }}
              onUserMediaError={handleError}
            />
            
            <div className="button-group">
              <button className="scan-btn" onClick={handleScanQRCode} disabled={scanning}>
                {scanning ? 'Escaneando...' : 'Escanear código QR'}
              </button>
              <button className="deactivate-btn" onClick={handleDeactivateCamera}>Apagar cámara</button>
            </div>
          </div>
        ) : (
          
          <div className="file-section">
            
            <label htmlFor="file-upload" className="file-upload-btn">
              Escoger archivo
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button className="activate-btn" onClick={handleActivateCamera}>Encender cámara</button>
          </div>
        )}
      </div>
      {qrData && (
        <div className="appointment-details">
          <h3>Datos de la cita:</h3>
          {renderTableData()}
        </div>
      )}
    </div>
  );
};

export default VerQrComponent;
