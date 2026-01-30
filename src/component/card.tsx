// กำหนดหน้าตาข้อมูล
export interface UserData {
  username: string;
  repo: string;
  time: string;
  status: string;
}

interface HistoryListProps {
  history: UserData[]; // รายการข้อมูลที่จะส่งเข้ามา
  onClear: () => void; // ปุ่มล้างข้อมูล
}

export const HistoryListView = ({ history, onClear }: HistoryListProps) => {

  // --- 🛠️ Mock Data สำหรับเพื่อน ---
  const isTestMode = false
  if (isTestMode) {
    history = [
      { username: "ElonMusk", repo: "twitter-algorithm", time: "10:00 AM", status: "Success" },
      { username: "LinusTorvalds", repo: "linux-kernel", time: "10:05 AM", status: "Success" }
    ]
  }
  // ------------------------------------

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '15px', 
      padding: '20px', 
      background: '#ffffff',
      height: '500px',
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>📋 Live Feed ({history.length})</h3>
        <button onClick={onClear} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>Clear</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {history.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#ccc', marginTop: '40px' }}>ยังไม่มีใครสแกน...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {history.map((user, index) => (
              <li key={index} style={{ 
                padding: '15px', 
                marginBottom: '10px', 
                background: index === 0 ? '#e6fffa' : '#f9f9f9', // คนล่าสุดสีเขียวอ่อน
                borderRadius: '8px',
                borderLeft: '4px solid #38b2ac',
                animation: 'fadeIn 0.5s ease'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>👤 {user.username}</div>
                <div style={{ fontSize: '14px', color: '#555' }}>📂 Repo: {user.repo}</div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>🕒 {user.time}</span>
                  <span style={{ color: 'green' }}>✔ {user.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}