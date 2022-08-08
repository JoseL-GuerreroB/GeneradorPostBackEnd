import mongoose from 'mongoose';
import { imgPostDefPID, imgPostDefUrl } from '../libs/config.js';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fav: {
    type: Boolean,
    default: false
  },
  image: {
    public_id: {
      type: String,
      default: imgPostDefPID
    },
    url: {
      type: String,
      default: imgPostDefUrl
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
},{
  versionKey: false,
});

export default mongoose.model('Post', postSchema);