import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../errors/error.js';
import { generateStrongPassword } from '../utils/auth.utils.js';

export const signup = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const salt = parseInt(process.env.SALT);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = new User({ name, email, password: hashedPassword, avatar });
  try {
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = newUser._doc;
    res
      .cookie("access token", token, { httpOnly: true })
      .status(201)
      .send({ user, success: true });
  } catch (error) {
    if (error.code === 11000) {
      next(errorHandler(400, "Email already registered"));
    } else {
      next(error);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...user } = validUser._doc;
    res
      .cookie("access token", token, { httpOnly: true })
      .status(200)
      .send({ user, success: true });
  } catch (error) {
    next(error);
  }
};

export const googleOAuth = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!user) {
      // Signup with Google OAuth
      const password = generateStrongPassword();
      const salt = parseInt(process.env.SALT);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const newUser = new User({ name, email, password: hashedPassword, avatar });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...userWithoutPassword } = newUser._doc;
      res
        .cookie("access token", token, { httpOnly: true })
        .status(201)
        .send({ user: userWithoutPassword, success: true });
    } else {
      // Signin with Google OAuth
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...userWithoutPassword } = user._doc;
      res
        .cookie("access token", token, { httpOnly: true })
        .status(200)
        .send({ user: userWithoutPassword, success: true });
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.cookie('access token', null, { expires: new Date(0) });
    res.clearCookie('access token');
    res.status(200).send({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    next(error);
  }
};
