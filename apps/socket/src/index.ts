import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { verifyHandshakeToken } from './auth';
import { setupRoomHandlers } from './rooms';
import { createInternalRouter } from './internal';

const app = express();
const server = http.createServer(app);

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

// Middleware autentikasi socket
io.use(verifyHandshakeToken);

// Handler koneksi socket
io.on('connection', (socket: Socket) => {
  setupRoomHandlers(io, socket);

  socket.on('disconnect', () => {
    // cleanup jika dibutuhkan
  });
});

// Endpoint internal untuk menerima trigger emit dari Web (Next.js Server Actions)
app.use('/internal', createInternalRouter(io));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

server.listen(PORT, () => {
  console.log(`[OfficeSync-Socket] Listening on port ${PORT}`);
});
