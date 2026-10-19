import mongoose, { Schema } from 'mongoose';

const DatasetModelSchema = new Schema({
  name: { type: String, required: true },
  divisionId: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
  fileUrl: { type: String, required: true },
}, { timestamps: true });

export const DatasetModel = mongoose.models.Dataset || mongoose.model('Dataset', DatasetModelSchema);
