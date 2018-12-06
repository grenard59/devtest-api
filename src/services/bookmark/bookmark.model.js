import mongoose, { Schema } from 'mongoose'

const bookmarkSchema = new Schema({
  city: { type: mongoose.Schema.ObjectId, ref: 'City' },
  messages: [{ message: {type: String} }],
  created_at: { type: Date, default: Date.now },
});

const model = mongoose.model('Bookmark', bookmarkSchema);

export const schema = model.schema;
export default model
