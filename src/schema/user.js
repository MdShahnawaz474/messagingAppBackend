import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already exists'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    username: {
      type: String,
      unique: [true, 'Username already exists '],
      match: [
        /^[a-zA-Z0-9_]{3,20}$/,
        'Username must be 3–20 characters and contain only letters, numbers, and _'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
