import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "./../context/auth";
import { LikeButton, DeleteButton } from "./exports";

export default function PostCard({
     post: {
          body,
          createdAt,
          id,
          username,
          comments,
          commentCount,
          likes,
          likeCount,
     },
}) {
     const { user } = useContext(AuthContext);

     function commentOnPost() {
          console.log("commentOnPost");
     }

     return (
          <Card fluid>
               <Card.Content>
                    <Image
                         floated="right"
                         size="mini"
                         src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                    />
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta as={Link} to={`/posts/${id}`}>
                         {moment(createdAt).fromNow(true)}
                    </Card.Meta>
                    <Card.Description>{body}</Card.Description>
               </Card.Content>
               <Card.Content extra>
                    <LikeButton user={user} post={{ id, likes, likeCount }} />

                    {/* Comment Button */}
                    <Button
                         labelPosition="right"
                         onClick={commentOnPost}
                         as={Link}
                         to={`/posts/${id}`}
                    >
                         <Button color="blue" basic>
                              <Icon name="comments" />
                         </Button>
                         <Label basic color="blue" pointing="left">
                              {comments.length}
                         </Label>
                    </Button>

                    {user && user.username === username && (
                         <DeleteButton postId={id} />
                    )}
               </Card.Content>
          </Card>
     );
}
