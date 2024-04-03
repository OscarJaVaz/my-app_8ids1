import React, { useState, useRef, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

const VerQrComponent = () => {
  const [qrData, setQrData] = useState('');
  const [cameraActivated, setCameraActivated] = useState(false);
  const webcamRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (cameraActivated) {
      const interval = setInterval(scanFrame, 200); // Escanea cada 200ms
      return () => clearInterval(interval);
    }
  }, [cameraActivated]);

  const handleError = (err) => {
    console.error(err);
  };

  const handleActivateCamera = () => {
    setCameraActivated(true);
  };

  const handleDeactivateCamera = () => {
    setCameraActivated(false);
  };

  const scanFrame = () => {
    if (!webcamRef.current) return;
    const imageData = webcamRef.current.getScreenshot();
    if (imageData) {
      setScanning(true); // Cambiamos el estado a true cuando comenzamos a escanear
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        decodeQRCode(imageData);
      };
      img.src = imageData;
    }
  };

  const decodeQRCode = async (imageData) => {
    if (!imageData) return;
    try {
      const code = await jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setQrData(code.data);
      }
    } catch (error) {
      console.error('Error al decodificar el código QR:', error);
    } finally {
      setScanning(false); // Cambiamos el estado a false cuando terminamos de escanear
    }
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
    <div>
      <div style={styles.line}></div>
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
                <button className="deactivate-btn" onClick={handleDeactivateCamera}>Apagar cámara</button>
              </div>
            </div>
          ) : (
            <div className="file-section">
              <button className="activate-btn" onClick={handleActivateCamera}>Encender cámara y escanear QR</button>
            </div>
          )}
        </div>
        {scanning && <CircularProgress />}
        {qrData && (
          <div className="appointment-details">
            <h3>Datos de la cita:</h3>
            {renderTableData()}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  line: {
    width: '100%',
    height: '53px',
    backgroundColor: '#1172D8', 
  },
};

export default VerQrComponent;
