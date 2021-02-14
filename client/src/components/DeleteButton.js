import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Icon, Button, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "./../util/graphql";

export default function DeleteButton({ postId, callback, commentId }) {
     const [confirmOpen, setConfirmOpen] = useState(false);

     const mutation = commentId
          ? DELETE_COMMENT_MUTATION
          : DELETE_POST_MUTATION;

     const [deletePostOrMutation] = useMutation(mutation, {
          variables: { postId, commentId },
          update(proxy, result) {
               setConfirmOpen(false);

               if (!commentId) {
                    // get data
                    const data = proxy.readQuery({
                         query: FETCH_POSTS_QUERY,
                    });

                    // filter posts
                    let filter = data.getPosts.filter((p) => p.id !== postId);

                    // remove post from cache
                    proxy.writeQuery({
                         query: FETCH_POSTS_QUERY,
                         data: { getPosts: [...filter] },
                    });

                    if (callback) callback(); // redirect to home page
               }
          },
     });

     return (
          <>
               <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
               >
                    <Icon name="trash" style={{ margin: 0 }} />
               </Button>
               <Confirm
                    open={confirmOpen}
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={deletePostOrMutation}
               />
          </>
     );
}

const DELETE_COMMENT_MUTATION = gql`
     mutation deleteComment($postId: ID!, $commentId: ID!) {
          deleteComment(postId: $postId, commentId: $commentId) {
               id
               comments {
                    id
                    username
                    createdAt
                    body
               }
          }
     }
`;

const DELETE_POST_MUTATION = gql`
     mutation deletePost($postId: ID!) {
          deletePost(postId: $postId)
     }
`;
