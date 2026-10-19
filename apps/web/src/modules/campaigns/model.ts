import mongoose, { Schema } from 'mongoose';

const CampaignModelSchema = new Schema({
  title: { type: String, required: true },
  budget: { type: Number, default: 0 },
  divisionId: { type: Schema.Types.ObjectId, ref: 'Division', required: true },
}, { timestamps: true });

export const CampaignModel = mongoose.models.Campaign || mongoose.model('Campaign', CampaignModelSchema);
