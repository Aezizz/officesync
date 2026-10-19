import { Router, Request, Response } from 'express';
import { Server } from 'socket.io';

export function createInternalRouter(io: Server): Router {
  const router = Router();

  router.post('/emit', (req: Request, res: Response) => {
    const authHeader = req.headers['x-internal-secret'];
    const expectedSecret = process.env.INTERNAL_SECRET || 'supersecret_internal_key';

    if (authHeader !== expectedSecret) {
      return res.status(401).json({ error: 'Unauthorized internal request' });
    }

    const { room, event, payload } = req.body;

    if (!event || !payload) {
      return res.status(400).json({ error: 'Missing event or payload' });
    }

    if (room) {
      io.to(room).emit(event, payload);
    } else {
      io.emit(event, payload);
    }

    return res.status(200).json({ success: true });
  });

  return router;
}
