import React, { useContext, useState, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

// Semantic UI Components
import {
     Button,
     Card,
     Form,
     Grid,
     Icon,
     Image,
     Label,
} from "semantic-ui-react";

// Import Mutations
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from "./../util/graphql";

// time format
import moment from "moment";

// components
import { LikeButton, DeleteButton } from "../components/exports";
import { AuthContext } from "../context/auth";

export default function SinglePost(props) {
     function deletePostCallback() {
          props.history.push("/");
     }

     // Grab post id from URL
     const postId = props.match.params.postId;
     const { user } = useContext(AuthContext);
     const [comment, setComment] = useState("");
     const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
          variables: {
               postId,
          },
     });

     // used to un-focus input
     const commentInputRef = useRef(null);

     // handles comment submission
     const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
          update() {
               setComment("");
               commentInputRef.current.blur();
          },
          variables: { postId, body: comment },
     });

     // Generate html
     let postMarkup;
     if (!getPost) {
          postMarkup = <p>Loading post...</p>;
     } else {
          const { id, body, createdAt, username, comments, likes } = getPost;

          postMarkup = (
               <Grid>
                    <Grid.Row>
                         <Grid.Column width={2}>
                              <Image
                                   src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                   size="small"
                                   float="right"
                              />
                         </Grid.Column>

                         <Grid.Column width={10}>
                              <Card fluid>
                                   <Card.Content>
                                        <Card.Header>{username}</Card.Header>
                                        <Card.Meta>
                                             {moment(createdAt).fromNow(true)}
                                        </Card.Meta>
                                        <Card.Description>
                                             {body}
                                        </Card.Description>
                                   </Card.Content>
                                   <hr />
                                   <Card.Content>
                                        <LikeButton
                                             user={user}
                                             post={{ id, likes }}
                                        />
                                        <Button
                                             as="div"
                                             labelPosition="right"
                                             onClick={() =>
                                                  console.log("comment on post")
                                             }
                                        >
                                             <Button basic color="blue">
                                                  <Icon name="comments" />
                                             </Button>
                                             <Label
                                                  basic
                                                  color="blue"
                                                  pointing="left"
                                             >
                                                  {comments.length}
                                             </Label>
                                        </Button>
                                        {user && user.username === username && (
                                             <DeleteButton
                                                  postId={id}
                                                  callback={deletePostCallback}
                                             />
                                        )}
                                   </Card.Content>
                              </Card>
                              {likes && likes.length > 0 && (
                                   <Card fluid>
                                        <Card.Content>
                                             <p>Liked by</p>
                                             {likes.map((like) => (
                                                  <Label
                                                       key={like.username}
                                                       image
                                                  >
                                                       <img
                                                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                                            alt={like.username}
                                                       />
                                                       {like.username}
                                                  </Label>
                                             ))}
                                        </Card.Content>
                                   </Card>
                              )}
                              {user && (
                                   <Card fluid>
                                        <Card.Content>
                                             <p>Post a comment</p>
                                             <Form>
                                                  <div className="ui action input fluid">
                                                       <input
                                                            type="text"
                                                            placeholder="Comment.."
                                                            name="comment"
                                                            value={comment}
                                                            onChange={(event) =>
                                                                 setComment(
                                                                      event
                                                                           .target
                                                                           .value
                                                                 )
                                                            }
                                                            ref={
                                                                 commentInputRef
                                                            }
                                                       />
                                                       <button
                                                            type="submit"
                                                            className="ui button teal"
                                                            disabled={
                                                                 comment.trim() ===
                                                                 ""
                                                            }
                                                            onClick={
                                                                 submitComment
                                                            }
                                                       >
                                                            Submit
                                                       </button>
                                                  </div>
                                             </Form>
                                        </Card.Content>
                                   </Card>
                              )}
                              {comments.map((comment) => (
                                   <Card fluid key={comment.id}>
                                        <Card.Content>
                                             {user &&
                                                  user.username ===
                                                       comment.username && (
                                                       <DeleteButton
                                                            postId={id}
                                                            commentId={
                                                                 comment.id
                                                            }
                                                       />
                                                  )}
                                             <Card.Header>
                                                  {comment.username}
                                             </Card.Header>
                                             <Card.Meta>
                                                  {moment(
                                                       comment.createdAt
                                                  ).fromNow(true)}
                                             </Card.Meta>
                                             <Card.Description>
                                                  {comment.body}
                                             </Card.Description>
                                        </Card.Content>
                                   </Card>
                              ))}
                         </Grid.Column>
                    </Grid.Row>
               </Grid>
          );
     }

     return postMarkup;
}
