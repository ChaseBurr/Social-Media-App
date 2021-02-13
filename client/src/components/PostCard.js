import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";

export default function PostCard({
     post: { body, createdAt, id, username, comments, likes },
}) {
     function likePost() {
          console.log("like post");
     }
     function commentOnPost() {
          console.log("commentOnPostp");
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
                    <Card.Meta as={Link} to={`/post/${id}`}>
                         {moment(createdAt).fromNow(true)}
                    </Card.Meta>
                    <Card.Description>{body}</Card.Description>
               </Card.Content>
               <Card.Content extra>
                    {/* Like Button */}
                    <Button as="div" labelPosition="right" onClick={likePost}>
                         <Button color="teal" basic>
                              <Icon name="heart" />
                         </Button>
                         <Label as="a" basic color="teal" pointing="left">
                              {likes.length}
                         </Label>
                    </Button>

                    {/* Comment Button */}
                    <Button
                         as="div"
                         labelPosition="right"
                         onClick={commentOnPost}
                    >
                         <Button color="blue" basic>
                              <Icon name="comments" />
                         </Button>
                         <Label as="a" basic color="blue" pointing="left">
                              {comments.length}
                         </Label>
                    </Button>
               </Card.Content>
          </Card>
     );
}
