import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email is already exists'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    username: {
      type: String,
      unique: [true, 'Username already exists '],
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must be at most 20 characters long'],
      match: [
        /^[a-zA-Z0-9_]{3,20}$/,
        'Username must be 3–20 characters and contain only letters, numbers, and _',
      ],
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

// userSchema.pre('save', function saveUser(next) {
//   const user = this;
//   const SALT = bcrypt.genSaltSync(9);
//   const hashedPassword = bcrypt.hashSync(user.password, SALT);
//   user.password = hashedPassword;
//   user.avatar = `https://robohash.org/${user.username}`;
//   next();
// });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);
  this.avatar = `https://robohash.org/${this.username}`;
});

const User = mongoose.model('User', userSchema);

export default User;
