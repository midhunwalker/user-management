import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const toggleVerify = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isVerified = !user.isVerified;
  await user.save();
  res.json(user);
};

