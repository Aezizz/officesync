import mongoose, { Schema } from 'mongoose';
import { UserRole } from '@officesync/shared';

const DivisionSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.STAFF },
  divisionId: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
}, { timestamps: true });

export const DivisionModel = mongoose.models.Division || mongoose.model('Division', DivisionSchema);
export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
