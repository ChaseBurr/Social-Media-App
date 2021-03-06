const gql = require("graphql-tag");

export const FETCH_POSTS_QUERY = gql`
     {
          getPosts {
               id
               body
               createdAt
               username
               likes {
                    username
               }
               comments {
                    id
                    username
                    createdAt
                    body
               }
          }
     }
`;

export const SUBMIT_COMMENT_MUTATION = gql`
     mutation($postId: ID!, $body: String!) {
          createComment(postId: $postId, body: $body) {
               id
               comments {
                    id
                    username
                    body
                    createdAt
               }
          }
     }
`;

export const FETCH_POST_QUERY = gql`
     query($postId: ID!) {
          getPost(postId: $postId) {
               id
               body
               createdAt
               username
               likes {
                    username
               }
               comments {
                    id
                    username
                    createdAt
                    body
               }
          }
     }
`;

export const LIKE_POST_MUTATION = gql`
     mutation likePost($postId: ID!) {
          likePost(postId: $postId) {
               id
               likes {
                    id
                    username
               }
          }
     }
`;

export const USER_INFORMATION_QUERY = gql`
     query($username: String!) {
          getUserInfo(username: $username) {
               createdAt
               username
               description
          }
     }
`;

export const USER_DESCRIPTION_MUTATION = gql`
     query($username: String!, $body: String!) {
          userDescription(username: $username, body: $body) {
               id
               createAt
               username
               description
          }
     }
`;
