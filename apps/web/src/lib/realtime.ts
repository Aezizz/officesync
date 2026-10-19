import { SocketEvent } from '@officesync/shared';

interface EmitOptions {
  room?: string;
  event: SocketEvent | string;
  payload: any;
}

export async function emitRealtimeEvent({ room, event, payload }: EmitOptions) {
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
  const secret = process.env.SOCKET_INTERNAL_SECRET || 'supersecret_internal_key';

  try {
    const res = await fetch(`${socketUrl}/internal/emit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': secret,
      },
      body: JSON.stringify({ room, event, payload }),
    });

    if (!res.ok) {
      console.error('Failed to emit realtime event:', await res.text());
    }
  } catch (error) {
    console.error('Error emitting realtime event to socket server:', error);
  }
}
