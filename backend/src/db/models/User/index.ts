import { model, Schema, Document } from 'mongoose';
import { Bcrypt } from '../../../services/Bcrypt';

export interface User {
  email: string;
  password: string;
}

export interface UserInterface extends User, Document {}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<UserInterface>('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await Bcrypt.hashWithSalt(this.password);
    }
  } catch (error) {
    return next(error);
  }
  return next(null);
});

userSchema.methods.comparePasswords = function cb(password) {
  const user = <UserInterface>this;
  return Bcrypt.compare(password, user.password);
};

export default model<UserInterface>('User', userSchema);
