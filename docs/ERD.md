# Entity Relationship Diagram (ERD) - OfficeSync

## Entitas Utama

1. **User**
   - `_id`: ObjectId
   - `name`: String
   - `email`: String (unique)
   - `password`: String (hashed)
   - `role`: 'ADMIN' | 'MANAGER' | 'STAFF'
   - `divisionId`: Ref -> Division
   - `createdAt`, `updatedAt`

2. **Division**
   - `_id`: ObjectId
   - `name`: String
   - `code`: String (e.g. 'IT', 'MKT', 'OPS')
   - `description`: String

3. **Ticket**
   - `_id`: ObjectId
   - `title`: String
   - `description`: String
   - `status`: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'
   - `priority`: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
   - `divisionId`: Ref -> Division
   - `creatorId`: Ref -> User
   - `assigneeId`: Ref -> User
   - `createdAt`, `updatedAt`

4. **ActivityLog**
   - `_id`: ObjectId
   - `userId`: Ref -> User
   - `action`: String
   - `resource`: String
   - `resourceId`: String
   - `metadata`: Record<string, any>
   - `createdAt`
