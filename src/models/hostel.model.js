import mongoose from 'mongoose';

const { Schema } = mongoose;

const hostelSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A hostel must have a name'],
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  address: {
    type: String,
    required: [true, 'A hostel must have an address']
  },
  city: {
    type: String,
    required: [true, 'A hostel must be in a city']
  },
  pincode: {
    type: Number,
    required: [true, 'A hostel must have a pincode']
  },
  contactNumber: {
    type: String,
    required: [true, 'A hostel must have a contact number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  website: {
    type: String,
    trim: true
  },
  roomTypes: [{
    type: String,
    enum: ['single', 'double', 'suite', 'dormitory'],
    required: true
  }],
  amenities: [{
    type: String,
    enum: ['wifi', 'laundry', 'foodService', 'AC', 'heating', 'tv', 'privateBathroom']
  }],
  description: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  images: [String], // Array of image URLs
  feedback: [{
    type: String,
    trim: true
  }], // Array of feedback
  createdAt: {
    type: Date,
    default: Date.now
  }
});
hostelSchema.index({ location: '2dsphere' }); // This is crucial

// Create a Model from the Schema
const Hostel = mongoose.model('Hostel', hostelSchema);

// Export the Model
export default Hostel;
