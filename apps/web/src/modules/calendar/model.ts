import mongoose, { Schema } from 'mongoose';

const CalendarEventModelSchema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  divisionId: { type: Schema.Types.ObjectId, ref: 'Division' },
}, { timestamps: true });

export const CalendarEventModel = mongoose.models.CalendarEvent || mongoose.model('CalendarEvent', CalendarEventModelSchema);
