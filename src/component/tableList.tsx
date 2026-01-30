import { useState, useRef } from 'react'
import QRCode from 'react-qr-code'
import { initializeReclaimSession } from '../service/reclaimService'

interface Props {
  onProofReceived: (proof: any) => void;
}

const QRCodeCard = ({ onProofReceived }: Props) => {
  const [requestUrl, setRequestUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isGeneratingRef = useRef(false)

  const generateNewSession = async () => {
    if (isGeneratingRef.current) return
    isGeneratingRef.current = true
    setIsLoading(true)
    setRequestUrl('') // เคลียร์ QR เก่า

    try {
      const url = await initializeReclaimSession(
        (proofs) => {
          // 1. สแกนสำเร็จ -> ส่งข้อมูลกลับไปที่ App.tsx
          if (proofs) {
            const data = Array.isArray(proofs) ? proofs[0] : proofs
            onProofReceived(data)
          }

          // 2. หน่วงเวลา 1.5 วิ แล้วสร้าง QR ใหม่ทันที (Loop)
          setTimeout(() => {
            isGeneratingRef.current = false // ปลดล็อคให้สร้างใหม่ได้
            generateNewSession()
          }, 1500)
        },
        (error) => {
          console.error('Verification Failed:', error)
          isGeneratingRef.current = false
          setIsLoading(false)
        }
      )

      setRequestUrl(url)
    } catch (error) {
      console.error("Error calling service:", error)
      isGeneratingRef.current = false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
        flex: 1, 
        minWidth: '300px',
        border: '2px dashed #ccc', 
        borderRadius: '16px', 
        padding: '40px', 
        background: '#fafafa',
        minHeight: '400px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center'
    }}>
        {!requestUrl && !isLoading && (
            <button 
                onClick={generateNewSession} 
                style={{ padding: '15px 30px', fontSize: '18px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
                🚀 Start Kiosk Mode
            </button>
        )}

        {isLoading && !requestUrl && <p>กำลังสร้าง QR Code ใหม่...</p>}

        {requestUrl && (
            <div className="fade-in">
                <h3 style={{ marginBottom: '20px', color: '#333' }}>สแกนเพื่อยืนยันตัวตน</h3>
                <div style={{ background: 'white', padding: '16px', display: 'inline-block', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <QRCode value={requestUrl} size={200} />
                </div>
                <p style={{ marginTop: '20px', color: '#666' }}>ระบบจะรีเฟรชอัตโนมัติเมื่อสแกนเสร็จ</p>
            </div>
        )}
    </div>
  )
}

export default QRCodeCard