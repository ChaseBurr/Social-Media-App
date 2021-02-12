const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const {
     validateRegisterInput,
     validateLoginInput,
} = require("./../../util/validators");
require("dotenv").config({});

function generateToken(user) {
     return jwt.sign(
          {
               id: user.id,
               email: user.email,
               username: user.username,
          },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "1h" }
     );
}

module.exports = {
     Mutation: {
          async login(_, { username, password }) {
               const { errors, valid } = validateLoginInput(username, password);

               if (!valid) {
                    throw new UserInputError("Errors", { errors });
               }

               const user = await User.findOne({ username });

               if (!user) {
                    errors.general = "User not found";
                    throw new UserInputError("User not found", { errors });
               }

               const match = await bcrypt.compare(password, user.password);
               if (!match) {
                    errors.general = "Wrong credentials";
                    throw new UserInputError("Wrong credentials", { errors });
               }

               const token = generateToken(user);

               return {
                    ...user._doc,
                    id: user._id,
                    token,
               };
          },
          async register(
               _,
               { registerInput: { username, email, password, confirmPassword } }
          ) {
               // validate user data
               const { valid, errors } = validateRegisterInput(
                    username,
                    email,
                    password,
                    confirmPassword
               );

               if (!valid) {
                    throw new UserInputError("Errors", { errors });
               }

               //  make sure user doesn't already exist
               const user = await User.findOne({ username });

               if (user) {
                    throw new UserInputError("Username is taken", {
                         errors: {
                              username: "This username is taken",
                         },
                    });
               }

               // Hash password and create an auth token
               password = await bcrypt.hash(password, 12);

               //    Generate new user
               const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString(),
               });

               //   save user to DB
               const res = await newUser.save();

               //    Create token
               const token = generateToken(res);

               return {
                    ...res._doc,
                    id: res._id,
                    token,
               };
          },
     },
};
