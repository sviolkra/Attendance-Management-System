'use client'

import { useState } from 'react'
import QRCodeGenerator from './components/QRCodeGenerator'
import QRCodeScanner from './components/QRCodeScanner'
import AttendanceList from './components/AttendanceList'

export default function Home() {
  const [currentSession, setCurrentSession] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">QR Code Attendance System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Generate QR Code</h2>
          <QRCodeGenerator onSessionCreated={setCurrentSession} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Scan QR Code</h2>
          <QRCodeScanner />
        </div>
      </div>
      {currentSession && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Attendance List</h2>
          <AttendanceList sessionId={currentSession} />
        </div>
      )}
    </div>
  )
}

