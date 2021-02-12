const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (context) => {
     const authHeader = context.req.headers.authorization;
     if (authHeader) {
          // get token
          const token = authHeader.split("Bearer ")[1];
          // verify token
          if (token) {
               try {
                    const user = jwt.verify(
                         token,
                         process.env.TOKEN_SECRET_KEY
                    );
                    return user;
               } catch (error) {
                    throw new AuthenticationError("Invalid/Expired token");
               }
          }
          throw new Error("Authentication token must be 'Bearer [token]");
     }
     throw new Error("Authorization header must be provided");
};
