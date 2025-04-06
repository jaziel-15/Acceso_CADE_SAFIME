import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = () => {
  const url = 'https://forms.office.com/Pages/ResponsePage.aspx?id=EZDKymp73kSGHwlaLKiDt9sSnwjMEFlDjP7QeY0WOiNUOFpUWlVNWTlIWFc5VlZSRTFOQ0JCSklGOC4u';

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Escanea el código QR</h2>
      <QRCodeCanvas value={url} size={200} />
    </div>
  );
};

export default QRCodeComponent;
