import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Image } from "semantic-ui-react";
import PostCard from "./../components/PostCard";

const gql = require("graphql-tag");

// TODO put all queries into file
const FETCH_POSTS_QUERY = gql`
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

export default function Home() {
     const { loading, data: { getPosts: posts } = {} } = useQuery(
          FETCH_POSTS_QUERY
     );

     if (posts) {
          console.log(posts);
     }

     return (
          <Grid columns={3} divided>
               <Grid.Row className="page-title">
                    <h1>Recent Posts</h1>
               </Grid.Row>
               <Grid.Row>
                    {loading ? (
                         <h1>Loading posts..</h1>
                    ) : (
                         posts &&
                         posts.map((post) => (
                              <Grid.Column
                                   key={post.id}
                                   style={{ marginBottom: "30px" }}
                              >
                                   <PostCard post={post} />
                              </Grid.Column>
                         ))
                    )}
               </Grid.Row>
          </Grid>
     );
}
