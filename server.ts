import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Generate QR Code for a session
app.post('/api/sessions', async (req, res) => {
  try {
    const sessionId = uuidv4();
    const qrCodeData = await QRCode.toDataURL(sessionId);
    const session = await prisma.session.create({
      data: {
        id: sessionId,
        qrCode: qrCodeData,
      },
    });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Mark attendance
app.post('/api/attendance', async (req, res) => {
  const { sessionId, userId } = req.body;
  try {
    const attendance = await prisma.attendance.create({
      data: {
        sessionId,
        userId,
      },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// Get attendance for a session
app.get('/api/attendance/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const attendances = await prisma.attendance.findMany({
      where: { sessionId },
      include: { user: true },
    });
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

