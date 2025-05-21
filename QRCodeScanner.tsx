'use client'

import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function QRCodeScanner() {
  const [scanning, setScanning] = useState(false)
  const [userId, setUserId] = useState('')

  const handleScan = async (result: string | null) => {
    if (result) {
      try {
        const response = await fetch('http://localhost:3001/api/attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: result,
            userId,
          }),
        })
        if (response.ok) {
          toast({
            title: "Success",
            description: "Attendance marked successfully!",
          })
          setScanning(false)
        } else {
          throw new Error('Failed to mark attendance')
        }
      } catch (error) {
        console.error('Error marking attendance:', error)
        toast({
          title: "Error",
          description: "Failed to mark attendance. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleError = (error: Error) => {
    console.error(error)
    toast({
      title: "Error",
      description: "QR code scanning failed. Please try again.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Input
          type="text"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mb-4"
        />
        {scanning ? (
          <div className="w-full max-w-sm mx-auto">
            <QrReader
              onResult={handleScan}
              onError={handleError}
              constraints={{ facingMode: 'environment' }}
              containerStyle={{ width: '100%' }}
            />
            <Button onClick={() => setScanning(false)} className="mt-4 w-full">
              Stop Scanning
            </Button>
          </div>
        ) : (
          <Button onClick={() => setScanning(true)} disabled={!userId} className="w-full">
            Start Scanning
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

