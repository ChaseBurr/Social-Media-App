const Post = require("./../../models/Post");
const checkAuth = require("./../../util/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
     Query: {
          async getPosts() {
               try {
                    const posts = await Post.find().sort({ createdAt: -1 });
                    return posts;
               } catch (error) {
                    throw new Error(error);
               }
          },
          async getPost(_, { postId }) {
               try {
                    const post = await Post.findById(postId);
                    if (post) {
                         return post;
                    } else {
                         throw new Error("Post not found");
                    }
               } catch (error) {
                    throw new Error(error);
               }
          },
     },
     Mutation: {
          async createPost(_, { body }, context) {
               const user = checkAuth(context);

               const newPost = new Post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString(),
               });

               const post = await newPost.save();

               return post;
          },
          async deletePost(_, { postId }, context) {
               const user = checkAuth(context);

               try {
                    const post = await Post.findById(postId);
                    if (user.username === post.username) {
                         await post.delete();
                         return "Posted deleted successfully";
                    } else {
                         throw new AuthenticationError("Action not allowed");
                    }
               } catch (error) {
                    throw new Error(error);
               }
          },
          async likePost(_, { postId }, context) {
               const { username } = checkAuth(context);

               const post = await Post.findById(postId);
               if (post) {
                    // checks if the post is already liked by user
                    if (post.likes.find((like) => like.username === username)) {
                         // unlike comment
                         post.likes = post.likes.filter(
                              (like) => like.username !== username
                         );
                    } else {
                         // like post
                         post.likes.push({
                              username,
                              createdAt: new Date().toISOString(),
                         });
                    }
                    await post.save();
                    return post;
               } else throw new UserInputError("Post not found");
          },
     },
};
