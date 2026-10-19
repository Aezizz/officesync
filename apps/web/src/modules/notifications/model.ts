import mongoose, { Schema } from 'mongoose';

const NotificationModelSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationModelSchema);
