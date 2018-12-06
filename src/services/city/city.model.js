import mongoose, { Schema } from 'mongoose'

const citySchema = new Schema({
  name: { type: String, required: true },
  postalCode: { type: Number },
  messages: [{ message: String, author: String }]
});

const model = mongoose.model('City', citySchema);

export const schema = model.schema;
export default model
