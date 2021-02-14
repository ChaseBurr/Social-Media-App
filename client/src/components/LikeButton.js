import React, { useState, useEffect } from "react";
import { Icon, Label, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

// Mutations
import { LIKE_POST_MUTATION } from "./../util/graphql";

export default function LikeButton({ user, post: { id, likes } }) {
     const [likePost] = useMutation(LIKE_POST_MUTATION, {
          variables: { postId: id },
     });

     const [liked, setLiked] = useState(false);
     useEffect(() => {
          if (user && likes.find((like) => like.username === user.username)) {
               setLiked(true);
          } else setLiked(false);
     }, [user, likes]);

     // Generate like button depending on user
     const likeButton = user ? (
          liked ? (
               <Button color="teal">
                    <Icon name="heart" />
               </Button>
          ) : (
               <Button color="teal" basic>
                    <Icon name="heart" />
               </Button>
          )
     ) : (
          <Button as={Link} to="/login" color="teal" basic>
               <Icon name="heart" />
          </Button>
     );

     return (
          <Button as="div" labelPosition="right" onClick={likePost}>
               {likeButton}
               <Label basic color="teal" pointing="left">
                    {likes.length}
               </Label>
          </Button>
     );
}
