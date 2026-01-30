import { useState } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import QRCode from 'react-qr-code'
import './App.css'

function App() {

  const [requestUrl, setRequestUrl] = useState('')


  const getVerificationReq = async () => {

    const APP_ID = import.meta.env.VITE_RECLAIM_APP_ID
    const APP_SECRET = import.meta.env.VITE_RECLAIM_APP_SECRET
    const PROVIDER_ID = import.meta.env.VITE_RECLAIM_PROVIDER_ID
    // ----------------------------------------

    console.log("กำลังเชื่อมต่อ Reclaim...")

    try {
      // A. เริ่มต้นการทำงาน (Initialize)
      const reclaimClient = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID)

      // B. ขอ URL สำหรับ Verification
      const url = await reclaimClient.getRequestUrl()
      console.log("ได้ URL มาแล้ว:", url)

      // C. เซ็ตค่าลง State เพื่อให้ QR Code โชว์
      setRequestUrl(url)

      // D. เริ่มดักฟังผลลัพธ์ (Start Session)
      await reclaimClient.startSession({
        onSuccess: (proofs) => {
          console.log('สำเร็จ! ได้หลักฐานมาแล้ว:', proofs)
          alert('Verification Success! (ดูข้อมูลใน Console)')
        },
        onError: (error) => {
          console.error('เกิดข้อผิดพลาด:', error)
        },
      })

    } catch (error) {
      console.error("Error init:", error)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>GitHub Owner Verifier</h1>
      
      {/* ปุ่มกด */}
      <button onClick={getVerificationReq}>
        Verify My GitHub
      </button>

      {/* ถ้ามี URL แล้ว ให้แสดง QR Code */}
      {requestUrl && (
        <div style={{ marginTop: 20 }}>
          <QRCode value={requestUrl} />
          <p>สแกนด้วยกล้องมือถือได้เลยครับ</p>
        </div>
      )}
    </div>
  )
}

export default App