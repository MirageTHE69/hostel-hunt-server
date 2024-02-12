import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// Define the User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{6}$/.test(v);
      },
      message: props => `${props.value} is not a valid 6 digit pincode!`
    }
  },
  city: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  }
}, {
  timestamps: true,
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT));
  }
  next();
});

// Instance method to check password
userSchema.methods.checkPassword = function (triedPassword) {
  return bcrypt.compare(triedPassword, this.password);
};

// Create a Model from the Schema
const User = mongoose.model('User', userSchema);

// Export the Model
export default User;
