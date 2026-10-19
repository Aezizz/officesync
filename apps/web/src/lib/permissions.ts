import { UserRole } from '@officesync/shared';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type Resource = 'ticket' | 'dataset' | 'campaign' | 'user' | 'division' | 'activity';

interface UserContext {
  id: string;
  role: UserRole;
  divisionId: string;
}

export function can(user: UserContext, action: Action, resource: Resource, targetDivisionId?: string): boolean {
  if (user.role === UserRole.ADMIN) {
    return true;
  }

  if (resource === 'user' || resource === 'division') {
    return false; // hanya admin
  }

  if (targetDivisionId && user.divisionId !== targetDivisionId) {
    return false; // staff & manager hanya di divisi sendiri
  }

  return true;
}
