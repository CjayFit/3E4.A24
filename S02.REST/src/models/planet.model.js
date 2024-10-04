import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const planetSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    uuid: { type: String, unique: true, required: true, default: uuidv4() },
    discoveredBy: { type: String, required: true, index: true },
    discoveryDate: Date,
    temperature: { type: Number, min: 0, max: 10000 },
    satellites: [String],
    position: {
      x: { type: Number, min: -1000, max: 1000, required: true },
      y: { type: Number, min: -1000, max: 1000, required: true },
      z: { type: Number, min: -1000, max: 1000, required: true },
    },
  },
  {
    collection:'planets',
    strict: 'throw'
  }
);

export default mongoose.model('Planet', planetSchema);