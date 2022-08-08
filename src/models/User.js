import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    public_id: String,
    url: String
  },
  created: {
    type: Date,
    default: Date.now
  }
},{ 
  versionKey: false, 
});

export default mongoose.model('User', userSchema);