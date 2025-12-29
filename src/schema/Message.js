import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Message body is required'],
  },
  image: {
    type: String,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: [true, 'Channel ID is required'],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Channel ID is required'],
  },
  workSpaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkSpace',
    required: [true, 'WorkSpace ID is required'],
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
