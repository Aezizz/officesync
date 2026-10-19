import { Socket } from 'socket.io';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
  divisionId: string;
}

export function verifyHandshakeToken(socket: Socket, next: (err?: Error) => void) {
  const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;
  if (!token) {
    // Toleran untuk guest/demo atau tolak jika wajib autentikasi
    return next();
  }

  try {
    // Verifikasi token (JWT/Secret)
    // const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as AuthenticatedUser;
    // socket.data.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
}
