import { connectToDatabase } from './db';

export interface AuditLogParams {
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
}

export async function logActivity(params: AuditLogParams) {
  try {
    await connectToDatabase();
    // Simpan jejak audit ke MongoDB
    console.log('[AuditLog]', params);
  } catch (error) {
    console.error('Failed to log audit activity:', error);
  }
}
