import { errorHandler } from "../errors/error.js";
import User from "../models/user.model.js";
import { generateToken, hashPassword, validatePassword } from "../utils/auth.utils.js";

export const signup = async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const hashedPassword = hashPassword(password);
  const newUser = new User({ name, email, password: hashedPassword, avatar });
  try {
    await newUser.save();
    const token = generateToken(newUser._id);
    const { password: pass, ...user } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
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
    const validPassword = validatePassword(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = generateToken(validUser._id);
    const { password: pass, ...user } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .send(user);
  } catch (error) {
    next(error);
  }
};

export const googleOAuth = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!user) {
      const password = Math.random().toString(36).slice(-8); // Generate a random password
      const hashedPassword = hashPassword(password);
      const newUser = new User({ name, email, password: hashedPassword, avatar });
      await newUser.save();
      const token = generateToken(newUser._id);
      const { password: pass, ...userWithoutPassword } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .send(userWithoutPassword);
    } else {
      const token = generateToken(user._id);
      const { password: pass, ...userWithoutPassword } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .send(userWithoutPassword);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).send({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    next(error);
  }
};
