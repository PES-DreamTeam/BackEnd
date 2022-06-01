const { array } = require('joi');
const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Message = require('./Message');
const validator = require('./validators/userValidators');
const User = new mongoose.Schema({
  name: {
    type: String,
    required: "The name is required",
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    /* istanbul ignore next */
    validate(value) {
      validator.validateEmail(value);
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: "The password is required",
  },
  salt: {
    //para autenticar contraseña
    type: String,
    required: "The salt is required",
  },
  profilePicture: {
    type: String,
  },
  isNew: {
    type: Boolean,
    default: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  reports: {
    type: [String],
    default: [],
  },
  profilePicture: {
    type: String,
    default: "https://i.ibb.co/s2k6mwk/default-Pic.png",
  },
  favourites: {
    type: [String],
    default: [],
  },
  achievements: [
    {
      achievement_id: Number,
      achievement_tier: Number,
      progress: {type: Number, default: 0},
      objective: Number,
    },
  ],
  currentVehicle: {
    type: Number,
    default: 0,
  },
  chat_id: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  banned: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('User', User);
