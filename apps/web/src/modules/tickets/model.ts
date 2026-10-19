import mongoose, { Schema, Document, Model } from 'mongoose';
import { TicketStatus, TicketPriority } from '@officesync/shared';

export interface ITicketDocument extends Document {
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  divisionId: mongoose.Types.ObjectId;
  creatorId: mongoose.Types.ObjectId;
  assigneeId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicketDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, enum: Object.values(TicketStatus), default: TicketStatus.TODO },
    priority: { type: String, enum: Object.values(TicketPriority), default: TicketPriority.MEDIUM },
    divisionId: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assigneeId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const TicketModel: Model<ITicketDocument> =
  mongoose.models.Ticket || mongoose.model<ITicketDocument>('Ticket', TicketSchema);
