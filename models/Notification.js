import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'like', 'comment', 'follow'
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // User to be notified
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who triggered the notification
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: false,
  }, // Related post, if any
  isRead: { type: Boolean, default: false }, // Whether the notification has been read
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
