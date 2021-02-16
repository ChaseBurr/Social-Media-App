import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "./../context/auth";
import { useMutation, useQuery } from "@apollo/client";

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

     return (
          <>
               {userData ? (
                    <>
                         <div style={{ paddingTop: "1rem" }} />
                         <Card fluid>
                              <Card.Content
                                   style={{
                                        display: "flex",
                                   }}
                              >
                                   <Image
                                        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                                        size="small"
                                        float="right"
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
                                             {userData.description
                                                  ? userData.Description
                                                  : "No description added"}
                                        </p>
                                   </div>
                                   <Card.Description>{}</Card.Description>
                              </Card.Content>
                         </Card>
                    </>
               ) : (
                    <div>Loading..</div>
               )}
          </>
     );
}
