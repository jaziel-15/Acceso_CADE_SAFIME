import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = () => {
  const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdr2fbu5bRwreB479QAo34H94ZRPbsVdYd54CcoJVvnEPc95Q/viewform?usp=header';

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Escanea el código QR</h2>
      <QRCodeCanvas value={url} size={200} />
    </div>
  );
};

export default QRCodeComponent;
