'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

interface QRCodeGeneratorProps {
  onSessionCreated: (sessionId: string) => void
}

export default function QRCodeGenerator({ onSessionCreated }: QRCodeGeneratorProps) {
  const [qrCode, setQRCode] = useState<string | null>(null)

  const generateQRCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sessions', {
        method: 'POST',
      })
      const data = await response.json()
      setQRCode(data.qrCode)
      onSessionCreated(data.id)
    } catch (error) {
      console.error('Failed to generate QR code:', error)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        {qrCode ? (
          <div className="flex flex-col items-center">
            <Image src={qrCode} alt="QR Code" width={200} height={200} />
            <Button onClick={generateQRCode} className="mt-4">Generate New QR Code</Button>
          </div>
        ) : (
          <Button onClick={generateQRCode}>Generate QR Code</Button>
        )}
      </CardContent>
    </Card>
  )
}

