import QRCode from 'react-qr-code'

interface QRCodeProps {
  url: string;           // ลิงก์ QR ที่คุณจะส่งมาให้
  isLoading: boolean;    // สถานะว่ากำลังโหลดไหม
  onManualRefresh: () => void; // ปุ่มกดรีเฟรชเอง
}

export const QRCodeView = ({ url, isLoading, onManualRefresh }: QRCodeProps) => {

  return (
    <div style={{ 
      border: '2px dashed #007bff', 
      borderRadius: '15px', 
      padding: '40px', 
      textAlign: 'center', 
      background: '#f8faff',
      minHeight: '350px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h3 style={{ color: '#007bff', marginBottom: '20px' }}>🔐 Scan to Verify</h3>

      {isLoading ? (
        <div style={{ color: '#999' }}>⏳ กำลังสร้าง QR Code...</div>
      ) : url ? (
        <div className="qr-box" style={{ background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <QRCode value={url} size={180} />
        </div>
      ) : (
        <button onClick={onManualRefresh} style={{ padding: '10px 20px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          เริ่มระบบ
        </button>
      )}

      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        สแกนผ่าน Reclaim Protocol
      </p>
    </div>
  )
}