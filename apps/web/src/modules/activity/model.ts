import mongoose, { Schema } from 'mongoose';

const ActivityModelSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const ActivityModel = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityModelSchema);
