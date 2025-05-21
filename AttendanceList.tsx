'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Attendance {
  id: string
  user: {
    name: string
    email: string
  }
  createdAt: string
}

interface AttendanceListProps {
  sessionId: string
}

export default function AttendanceList({ sessionId }: AttendanceListProps) {
  const [attendances, setAttendances] = useState<Attendance[]>([])

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/attendance/${sessionId}`)
        const data = await response.json()
        setAttendances(data)
      } catch (error) {
        console.error('Failed to fetch attendance:', error)
      }
    }

    fetchAttendance()
    const interval = setInterval(fetchAttendance, 5000) // Refresh every 5 seconds

    return () => clearInterval(interval)
  }, [sessionId])

  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendances.map((attendance) => (
              <TableRow key={attendance.id}>
                <TableCell>{attendance.user.name}</TableCell>
                <TableCell>{attendance.user.email}</TableCell>
                <TableCell>{new Date(attendance.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

