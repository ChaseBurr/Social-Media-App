import React, { useContext } from "react";
import { Card, Image, Form, Button } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "./../context/auth";
import { useMutation, useQuery } from "@apollo/client";

import { useForm } from "./../util/hooks";

import { USER_INFORMATION_QUERY } from "./../util/graphql";

export default function UserProfile(props) {
     // grab username from url
     const username = props.match.params.username;

     //  Grab user
     const { user } = useContext(AuthContext);

     // grab user profile data
     const { data: { getUserInfo: userData } = {} } = useQuery(
          USER_INFORMATION_QUERY,
          {
               variables: { username },
          }
     );

     const { values, onChange, onSubmit } = useForm(callback, {
          description: "",
     });

     function callback() {}

     return (
          <>
               {userData ? (
                    <>
                         <div style={{ paddingTop: "1rem" }} />
                         <Card fluid className="user-profile">
                              <Card.Content
                                   style={{
                                        display: "flex",
                                   }}
                              >
                                   <Image
                                        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                        size="small"
                                        float="left"
                                        style={{ borderRadius: "50%" }}
                                   />
                                   <div className="user-info-page">
                                        <h3 className="username">
                                             {userData.username}
                                        </h3>
                                        <p className="created">
                                             User signed up{" "}
                                             {moment(
                                                  userData.createdAt
                                             ).fromNow()}
                                        </p>
                                        <p className="description">
                                             {!userData.description ? (
                                                  user?.username ===
                                                  username ? (
                                                       <Form
                                                            onSubmit={onSubmit}
                                                       >
                                                            <h3>
                                                                 Add a
                                                                 description
                                                            </h3>
                                                            <Form.Field>
                                                                 <Form.Input
                                                                      placeholder="Add a description"
                                                                      name="body"
                                                                      onChange={
                                                                           onChange
                                                                      }
                                                                      value={
                                                                           values.body
                                                                      }
                                                                      // error={
                                                                      //      error
                                                                      //           ? true
                                                                      //           : false
                                                                      // }
                                                                 />
                                                                 <Button
                                                                      type="submit"
                                                                      color="teal"
                                                                 >
                                                                      SUBMIT
                                                                 </Button>
                                                            </Form.Field>
                                                       </Form>
                                                  ) : (
                                                       <p>
                                                            {username} doesn't
                                                            have a description.
                                                       </p>
                                                  )
                                             ) : (
                                                  "No description added"
                                             )}
                                        </p>
                                   </div>
                              </Card.Content>
                         </Card>
                    </>
               ) : (
                    <div>Loading..</div>
               )}
          </>
     );
}
